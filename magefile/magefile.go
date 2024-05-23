//go:build mage
// +build mage

package main

import (
	"archive/zip"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"reflect"
	"regexp"
	"strings"
	"unsafe"
)

const ORIGINAL_VALD_VERSION = "https://raw.githubusercontent.com/vdaas/vald/main/versions/VALD_VERSION"
const ORIGINAL_GO_VERSION = "https://raw.githubusercontent.com/vdaas/vald/main/versions/GO_VERSION"
const LATEST_VERSION_FILE = "../VERSIONS/VALD_LATEST_VERSION"
const GO_VERSION_FILE = "../VERSIONS/GO_VERSION"
const HUGO_HEADER = "../themes/vald/layouts/partials/header.html"
const METADATA_PATH = "../description.json"
const VERSION_EMBEDDING_STRING = "@VERSION@"

type metadata struct {
	weight      int
	description string
}

// SyncVersion compares original VALD_VERSION and own VALD_LATEST_VERSION.
// If VALD_LATEST_VERSION is NOT same as VALD_VERSION, it will replace to the original VALD_VERSION.
// The target file is `LATEST_VERSION_FILE` and `HUGO_HEADER`.
func SyncVersion() error {
	latest, err := getValdLatestVersion()
	if err != nil || latest == "" {
		return err
	}
	b, err := os.ReadFile(LATEST_VERSION_FILE)
	if err != nil {
		return err
	}
	goVersion, err := getGoVersion()
	if err != nil || goVersion == "" {
		return err
	}
	gb, err := os.ReadFile(GO_VERSION_FILE)
	if latest == string(b) && goVersion == string(gb) {
		fmt.Println("\x1b[31mNothing to update...\x1b[0m")
		return nil
	}
	return errors.Join(
		// update latest version file
		os.WriteFile(LATEST_VERSION_FILE, []byte(latest), os.ModePerm),
		// update header template of hugo theme
		updateHugoHeaderVersion(string(b), latest),
		// update go version file
		os.WriteFile(GO_VERSION_FILE, []byte(goVersion), os.ModePerm),
	)
}

// updateHugoHeaderVersion replaces old latest version to the new latest version.
func updateHugoHeaderVersion(old, latest string) error {
	b, err := os.ReadFile(HUGO_HEADER)
	if err != nil {
		return err
	}
	old = strings.Trim(old, "\n")
	latest = strings.Trim(latest, "\n")
	str := strings.Replace(string(b), old, latest, 1)
	return os.WriteFile(HUGO_HEADER, []byte(str), os.ModePerm)
}

// getValdLatestVersion gets the latest VALD_VERSION from https://github.com/vdaas/vald/blob/main/versions/VALD_VERSION.
func getValdLatestVersion() (string, error) {
	resp, err := http.Get(ORIGINAL_VALD_VERSION)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return strings.TrimPrefix(*(*string)(unsafe.Pointer(&b)), "v"), nil
}

// getGoVersion gets the GO_VERSION from https://github.com/vdaas/vald/blob/main/versions/GO_VERSION.
func getGoVersion() (string, error) {
	resp, err := http.Get(ORIGINAL_GO_VERSION)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return strings.TrimPrefix(*(*string)(unsafe.Pointer(&b)), "v"), nil
}

// SyncRepo gets the original document files from vald repo with specified tag.
func SyncRepo(tag, outDir string) error {
	// set download url
	url := "https://github.com/vdaas/vald/archive/"
	switch tag {
	case "main":
		url = url + "/refs/heads/main"
	case "":
		return errors.New("tag should be defined.")
	default:
		url = url + "v" + tag
	}
	url = url + ".zip"
	// get archive
	resp, err := http.Get(url)
	if err != nil {
		return nil
	}
	defer resp.Body.Close()
	// create output file is exists
	zipPath := "../" + outDir + ".zip"
	dst, err := os.Create(zipPath)
	if err != nil {
		return err
	}
	defer dst.Close()
	// copy response to output file
	_, err = io.Copy(dst, resp.Body)
	if err != nil {
		return err
	}
	// unzip
	_ = unzipFile(zipPath, "../tmp/"+outDir)
	// remove zip
	return os.RemoveAll(zipPath)
}

// unzipFile unzips zip file for sync document
func unzipFile(src, dest string) error {
	r, err := zip.OpenReader(src)
	if err != nil {
		return err
	}
	defer r.Close()
	err = os.Mkdir(dest, os.ModePerm)
	for _, f := range r.File {
		rc, err := f.Open()
		if err != nil {
			return err
		}
		defer rc.Close()
		s := strings.Join(strings.Split(f.Name, "/")[1:], "/")
		// change readme.md to _index.md for set root document
		if strings.Contains(s, "README.md") {
			s = strings.Replace(s, "README.md", "_index.md", -1)
		}
		path := filepath.Join(dest, s)
		if f.FileInfo().IsDir() {
			err = os.MkdirAll(path, os.ModePerm)
			if err != nil {
				return err
			}
		} else {
			dst, err := os.Create(path)
			if err != nil {
				return err
			}
			defer dst.Close()
			_, err = io.Copy(dst, rc)
			if err != nil {
				return err
			}
		}
	}
	return nil
}

// ConvertLinks replaces the link for vald web instead of markdown format link.
func ConvertLinks(path, tag string) error {
	path = "../" + path
	b, err := os.ReadFile(path)
	if err != nil {
		fmt.Println("failed to read file: %s", err.Error())
		return err
	}
	str := string(b)
	additionalPath := ""
	if tag != "main" && tag != "" {
		additionalPath = fmt.Sprintf("v%s/", tag)
	}
	// Fix document link paths
	// remove ".md" from link
	str = strings.ReplaceAll(str, ".md", "")
	// convert "./docs" to "/docs" from link
	re := regexp.MustCompile(`\][\(]\.\/docs\/`)
	str = re.ReplaceAllString(str, "](/docs/"+additionalPath)
	// convert "../../" to "/docs" from link
	re = regexp.MustCompile(`\][\(](\.\.\/)+`)
	str = re.ReplaceAllString(str, "](/docs/"+additionalPath)

	// covert image link path
	re = regexp.MustCompile(`\.\.\/\.\.\/design\/`)
	str = re.ReplaceAllString(str, "/images/"+additionalPath)
	re = regexp.MustCompile(`(\.\.\/)*\.\.\/assets\/docs\/`)
	str = re.ReplaceAllString(str, "/images/"+additionalPath)

	return os.WriteFile(path, []byte(str), os.ModePerm)
}

// UpdateMetadata rewrites metadata defined by `./description.json`.
func UpdateMetadata(path string) error {
	path = "../" + path
	b, err := os.ReadFile(path)
	if err != nil {
		fmt.Println("failed to read file: %s", err.Error())
		return err
	}
	str := string(b)
	// read json
	d, err := os.ReadFile(METADATA_PATH)
	if err != nil {
		fmt.Println("failed to read file: %s", err.Error())
		return err
	}
	var meta map[string]interface{}
	json.Unmarshal(d, &meta)
	m, ok := getMeta(path, meta)
	if !ok {
		return nil
	}
	// update weight
	weight := fmt.Sprintf("weight: %d", m.weight)
	re := regexp.MustCompile(`weight: [\d\.]*`)
	str = re.ReplaceAllString(str, weight)
	// update description
	desc := fmt.Sprintf("description: %s", m.description)
	re = regexp.MustCompile(`description: "[\w\s]*"`)
	str = re.ReplaceAllString(str, desc)
	return os.WriteFile(path, []byte(str), os.ModePerm)
}

// getMeta gets the metadata corresponding to given path.
func getMeta(path string, meta map[string]interface{}) (metadata, bool) {
	re := regexp.MustCompile(`v[0-9]+\.[0-9]+\/`)
	path = re.ReplaceAllString(path, "")
	ps := strings.Split(strings.Split(path, "content/docs/")[1], "/")
	if len(ps) == 0 {
		return metadata{}, false
	}
	m := meta
	for idx, p := range ps {
		p = strings.ReplaceAll(p, ".md", "")
		v := m[p]
		if v == nil {
			return metadata{}, false
		}
		if reflect.TypeOf(v).Kind() == reflect.Map {
			var nm map[string]interface{}
			b, _ := json.Marshal(v)
			json.Unmarshal(b, &nm)
			if idx+1 == len(ps) {
				var me metadata
				for key, val := range nm {
					if key == "weight" {
						me.weight = int(val.(float64))
					}
					if key == "description" {
						me.description = val.(string)
					}
				}
				return me, true
			}
			m = nm
		}
	}
	return metadata{}, false
}

// Publish sets the draft flag to `false` for publish as document.
func Publish(path string) error {
	path = "../" + path
	b, err := os.ReadFile(path)
	if err != nil {
		fmt.Println("failed to read file: %s", err.Error())
		return err
	}
	str := string(b)
	str = strings.Replace(str, "draft: true", "draft: false", 1)
	return os.WriteFile(path, []byte(str), os.ModePerm)
}

// UnPublish sets the draft flag to `true` for un publish.
func UnPublish(path string) error {
	path = "../" + path
	b, err := os.ReadFile(path)
	if err != nil {
		fmt.Println("failed to read file: %s", err.Error())
		return err
	}
	str := string(b)
	str = strings.Replace(str, "draft: false", "draft: true", 1)
	return os.WriteFile(path, []byte(str), os.ModePerm)
}

// EmbedVersion replaces the target string to version
func EmbedVersion(path, tag, version string) error {
	path = "../" + path
	b, err := os.ReadFile(path)
	if err != nil {
		fmt.Println("failed to read file: %s", err.Error())
		return err
	}
	str := string(b)
	if tag != "main" && tag != "" {
		version = "@v" + version
	} else {
		version = ""
	}
	// replace VERSION_EMBEDDING_STRING to version
	str = strings.ReplaceAll(str, VERSION_EMBEDDING_STRING, version)

	return os.WriteFile(path, []byte(str), os.ModePerm)
}

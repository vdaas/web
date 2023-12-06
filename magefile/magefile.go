//go:build mage
// +build mage

package main

import (
	"archive/zip"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"unsafe"
)

const ORIGINAL_VERSION = "https://raw.githubusercontent.com/vdaas/vald/main/versions/VALD_VERSION"
const LATEST_VERSION_FILE = "../VERSIONS/VALD_LATEST_VERSION"
const HUGO_HEADER = "../themes/vald/layouts/partials/header.html"

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
	if latest == string(b) {
		return nil
	}
	return errors.Join(
		// update latest version file
		os.WriteFile(LATEST_VERSION_FILE, []byte(latest), os.ModePerm),
		// update header template of hugo theme
		updateHugoHeaderVersion(string(b), latest),
	)
}

// updateHugoHeaderVersion replaces old latest version to the new latest version.
func updateHugoHeaderVersion(old, latest string) error {
	b, err := os.ReadFile(HUGO_HEADER)
	if err != nil {
		return err
	}
	c := string(b)
	re := regexp.MustCompile(strings.ReplaceAll(old, "\n", ""))
	c = re.ReplaceAllString(c, strings.ReplaceAll(latest, "\n", ""))
	return os.WriteFile(HUGO_HEADER, []byte(c), os.ModePerm)
}

// getValdLatestVersion gets the latest VALD_VERSION from https://github.com/vdaas/vald/blob/main/versions/VALD_VERSION.
func getValdLatestVersion() (string, error) {
	resp, err := http.Get(ORIGINAL_VERSION)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	re := regexp.MustCompile(`^v`)
	return re.ReplaceAllString(*(*string)(unsafe.Pointer(&b)), ""), nil
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

func ConvertLinks(path string) error {
	path = "../" + path
	b, err := os.ReadFile(path)
	if err != nil {
		fmt.Println("error")
		return err
	}
	str := string(b)
	// remove ".md" from link
	re := regexp.MustCompile(`.md\)`)
	str = re.ReplaceAllString(str, ")")
	// remove "./docs" from link
	re = regexp.MustCompile(`\][\(]\.\/docs\/`)
	str = re.ReplaceAllString(str, "](/docs/")
	// remove "../../" from link
	return os.WriteFile(path, []byte(str), os.ModePerm)
}

func Hoge() error {
	err := os.Mkdir("./tmp", os.ModeDir)
	if err != nil {
		fmt.Println(err)
	}
	return nil
}

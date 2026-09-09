//go:build mage
// +build mage

package main

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestNormalizePageBundles(t *testing.T) {
	t.Parallel()

	t.Run("converts a page with children to a branch bundle", func(t *testing.T) {
		t.Parallel()
		root := t.TempDir()
		page := filepath.Join(root, "user-guides", "vald-operator.md")
		bundleDir := filepath.Join(root, "user-guides", "vald-operator")
		if err := os.MkdirAll(bundleDir, 0o755); err != nil {
			t.Fatal(err)
		}
		content := "# Vald Operator\n\n[Design](vald-operator/design.md)\n"
		if err := os.WriteFile(page, []byte(content), 0o644); err != nil {
			t.Fatal(err)
		}
		child := filepath.Join(bundleDir, "design.md")
		if err := os.WriteFile(child, []byte("# Design\n"), 0o644); err != nil {
			t.Fatal(err)
		}

		if err := normalizePageBundles(root); err != nil {
			t.Fatal(err)
		}
		if _, err := os.Stat(page); !os.IsNotExist(err) {
			t.Fatalf("source page still exists: %v", err)
		}
		got, err := os.ReadFile(filepath.Join(bundleDir, "_index.md"))
		if err != nil {
			t.Fatal(err)
		}
		want := "# Vald Operator\n\n[Design](design.md)\n"
		if string(got) != want {
			t.Fatalf("unexpected bundle content:\nwant: %q\n got: %q", want, got)
		}
		if _, err := os.Stat(child); err != nil {
			t.Fatalf("child page was removed: %v", err)
		}
	})

	t.Run("leaves a standalone page unchanged", func(t *testing.T) {
		t.Parallel()
		root := t.TempDir()
		page := filepath.Join(root, "standalone.md")
		if err := os.WriteFile(page, []byte("# Standalone\n"), 0o644); err != nil {
			t.Fatal(err)
		}

		if err := normalizePageBundles(root); err != nil {
			t.Fatal(err)
		}
		if _, err := os.Stat(page); err != nil {
			t.Fatalf("standalone page was removed: %v", err)
		}
	})

	t.Run("does not overwrite an existing bundle index", func(t *testing.T) {
		t.Parallel()
		root := t.TempDir()
		page := filepath.Join(root, "guide.md")
		bundleDir := filepath.Join(root, "guide")
		if err := os.MkdirAll(bundleDir, 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(page, []byte("# Guide\n"), 0o644); err != nil {
			t.Fatal(err)
		}
		index := filepath.Join(bundleDir, "_index.md")
		if err := os.WriteFile(index, []byte("# Existing\n"), 0o644); err != nil {
			t.Fatal(err)
		}

		err := normalizePageBundles(root)
		if err == nil || !strings.Contains(err.Error(), "already exists") {
			t.Fatalf("expected an existing index error, got %v", err)
		}
		if _, err := os.Stat(page); err != nil {
			t.Fatalf("source page was removed: %v", err)
		}
	})
}

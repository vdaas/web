---
title: "{{ replace (print ($path := strings.TrimPrefix "docs/" (strings.TrimSuffix "/" .File.Dir))) "-" " " | title }}"
date: {{ .Date }}
draft: false
---


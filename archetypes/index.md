---
title: "{{ replace (print .Name "_" ($path := strings.TrimPrefix "docs/" (strings.TrimSuffix "/" .File.Dir))) "-" " " | title }}"
date: {{ .Date }}
draft: false
weight: 0
---


---
title: "{{ replace (print .Name "_" ($path := strings.TrimPrefix "docs/" (strings.TrimSuffix "/" .File.Dir))) "-" " " | title }}"
date: {{ .Date }}
draft: true
weight: 0
description: ""
menu:
  {{ replace ($menu := path.Base $path) "-" "" }}:
    parent: {{ replace $menu "-" " " | title }}
---


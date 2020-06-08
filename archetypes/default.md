---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
weight: 0
{{ $path := path.Base (strings.TrimSuffix "/" .File.Dir) }}
menu:
  {{ replace $path "-" "" }}:
    parent: {{ replace $path "-" " " | title }}
---


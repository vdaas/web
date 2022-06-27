---
title: "Client Side_v1.5/Troubleshooting"
date: 2022-06-27T14:26:56+09:00
draft: false
weight: 200
menu:
  troubleshooting:
    parent: Troubleshooting
---

# Client Side Troubleshooting

This page introduces the popular troubleshooting for client side.

The [flow chart](/docs/v1.5/troubleshooting/chart) helps you find the root reason for your problem.

Additionally, if you encounter some errors when using API, the [API status code](/docs/v1.5/api/status) helps you, too.

## Insert Operation

### Vald Agent NGT crashed at the insert process.

Please check your container limit of memory at first.
Vald Agent requires memory for keeping indexing on memory.

```bash
kubectl describe statefulset vald-agent-ngt
```

If the limit of memory exists, please remove it or update the value to more enormous.

## Search Operation

### Vald returns no search result.

There are two possible reasons.

1. Indexing has not finished in Vald Agent

    Vald will search the nearest vectors of query from the indexing in Vald Agent.
    If the indexing process is running, Vald Agent returns no search result.
    
    It will resolve when completed indexing instructions, like `CreateIndex`.

1. Too short timeout for searching

    When the search timeout configuration is too short, Vald LB Gateway stops the searching process before getting the search result from Vald Agent.

    In the sense of search operation, you can modify search timeout by [payload config](/docs/v1.5/api/search).

<div class="notice">
It is easy to find out which problem occurs by inspections the log of each Pod, like <a href="https://github.com/wercker/stern">stern</a>.
</div>

## Others

### Vald Agent NGT crashed when initContainer.

Vald Agent NGT requires an AVX2 processor for running.
Please check your CPU information.

---

## Related Document

- [Provisioning Troubleshooting](/docs/v1.5/troubleshooting/provisioning)
- [API Status](/docs/v1.5/api/status)
- [FAQ](/docs/v1.5/support/faq)

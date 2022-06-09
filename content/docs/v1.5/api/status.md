---
title: "Status Code_v1.5/Api"
date: 2022-06-09T11:19:26+09:00
draft: false
weight: 800
menu:
  api:
    parent: Api
---

# Response Status Code

This page describes each status code from the API response.

## Status Codes

This table shows the main status code and its name using Vald.
The sections below describe the meaning of each code and why API returns.

| code | name                                      |
| :--: | :---------------------------------------- |
|  0   | [OK](#ok)                                 |
|  3   | [INVALID_ARGUMENT](#invalid_argument)     |
|  4   | [DEADLINE_EXCEEDED](#deadline_exceeded)   |
|  5   | [NOT_FOUND](#not_found)                   |
|  6   | [ALREADY_EXISTS](#already_exists)         |
|  8   | [RESOURCE_EXHAUSTED](#resource_exhausted) |
|  13  | [INTERNAL](#internal)                     |
|  14  | [UNAVAILABLE](#unavailable)               |

## OK

`OK` means complete process with success.

Services that return this code are all services.

## INVALID_ARGUMENT

`INVALID_ARGUMENT` means something wrong in the request argument.

Services that return status are all services.
If you get this code, please verify your request payload is correct.

## DEADLINE_EXCEEDED

`DEADLINE_EXCEEDED` returns when the process ends due to timeout.

Services that return status are:

- [Object Service(only Exists RPC)](/docs/v1.5/api/object#exists-rpc)
- [Insert Service](/docs/v1.5/api/insert)
- [Remove Service](/docs/v1.5/api/insert)
- [Search Service](/docs/v1.5/api/search)

The timeout configuration is on the Vald cluster side.
If it appears constantly, you need to review the cluster settings.
However, only when using a search service can you overwrite the timeout configuration by lengthening the time setting in the search request config.

## NOT_FOUND

`NOT_FOUND` appears when there is no result corresponding to the request.

The example cases are:

- No search result when using SearchById RPC.
- No index data corresponding to the request vector when using Update/Exists/GetObject RPC

Services that return status are:

- [Object Service](/docs/v1.5/api/object)
- [Update Service](/docs/v1.5/api/update)
- [Remove Service](/docs/v1.5/api/insert)
- [Search Service](/docs/v1.5/api/search)

The possible reasons are:

- There is no index data in Vald Agent components or running the indexing process in the Vald Agent components.
  When the Vald Agent component runs the indexing process (createIndex/saveIndex), any process won't run, and it will return with no result.
- The request query vector or ID is wrong when using the search/update/remove service.
  Notably, both update service and remove service require the ID of vector Vald Agent component already indexed.

## ALREADY_EXISTS

`ALREADY_EXISTS` means that the Vald Agent component already stores the vector index same as the query vector when set `skip_strict_exist_check` as `true` in request config.

Services that return status are:

- [Insert Service](/docs/v1.5/api/insert)
- [Update Service](/docs/v1.5/api/update)

You have to change the query vector with `skip_strict_exist_check` as `true` or set `skip_strict_exist_check` as `false` instead of changing the query vector.

## RESOURCE_EXHAUSTED

`RESOURCE_EXHAUSTED` means the some resources has been exhausted.

It appears when:

- There is out-of-memory in gRPC payload, or networks, or etc.
- There are some server overload situations.
- The sent or received message is larger than the configured limit (default is 4 MB).

Services that return status are all services.
The most case in the Vald is that the query vector is too large.
In other words, the vector dimension size in configuration is too large.

## INTERNAL

`INTERNAL` appears when some wrong happens in the Vald cluster.
It is there is the serious problems about the Vald cluster.

Services that return status are all services.
If you get it, please verify the state of the Vald cluster.

<div class="warning">
If the internal server error appears, it should be care and research about logs metrics.
</div>

## UNAVAILABLE

`UNAVAILABLE` means the gRPC message cannot reach the Vald cluster.

It would be best to verify whether the Vald cluster is running and the host and port are correct.

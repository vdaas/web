---
title: "index_v1.4/Api"
date: 2022-02-17T19:23:16+09:00
draft: false
weight: 0
---

# Vald APIs

Vald provides 6 kinds of API for handling vector with Vald cluster.<br>
Vald provide 2 API interface: gRPC and REST API.
Using **gRPC** is preferred for better performance.

## Vald APIs Overview

The APIs overview tables is here:

|    Service     | Description                                                                                                                                       | API NAMES                                                                                                                                                                                                                                                                                                                                                                                      | LINK                                 |
| :------------: | :------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| Insert Service | Insert new vector(s) into the Vald Agent Pods.                                                                                                    | [Insert](/docs/v1.4/api/insert#insert-rpc)<br>[StreamInsert](/docs/v1.4/api/insert#streaminsert-rpc)<br>[MultiInsert](/docs/v1.4/api/insert#multiinsert-rpc)                                                                                                                                                                                                                                                  | [Vald Insert APIs](/docs/v1.4/api/insert) |
| Update Service | Update the exists vector(s) in the Vald Agent Pods.                                                                                               | [Update](/docs/v1.4/api/update#update-rpc)<br>[StreamUpdate](/docs/v1.4/api/update#streamupdate-rpc)<br>[MultiUpdate](/docs/v1.4/api/update#multiupdate-rpc)                                                                                                                                                                                                                                                  | [Vald Update APIs](/docs/v1.4/api/update) |
| Upsert Service | Update the exists vector(s) in the Vald Agent Pods or Insert new vector(s) into the Vald Agent Pods if the vector is not exists.                  | [Upsert](/docs/v1.4/api/upsert#upsert-rpc)<br>[StreamUpsert](/docs/v1.4/api/upsert#streamupsert-rpc)<br>[MultiUpdate](/docs/v1.4/api/upsert#multiupsert-rpc)                                                                                                                                                                                                                                                  | [Vald Upsert APIs](/docs/v1.4/api/upsert) |
| Search Service | Search nearest neighbor vectors using query (vectors or IDs).<br>There are 2 types of Search methods: Search (means ANN Search) and LinearSearch. | [Search](/docs/v1.4/api/search#search-rpc)<br>[SearchByID](/docs/v1.4/api/search#searchbyid-rpc)<br>[StreamSearch](/docs/v1.4/api/search#streamsearch-rpc)<br>[StreamSearchByID](/docs/v1.4/api/search#streamsearchbyid-rpc)<br>[MultiSearch](/docs/v1.4/api/search#multisearch-rpc)<br>[MultiSearchByID](/docs/v1.4/api/search#multisearchbyid-rpc)                                                                         | [Vald Search APIs](/docs/v1.4/api/search) |
|       ^        | ^                                                                                                                                                 | [LinearSearch](/docs/v1.4/api/search#linearsearch-rpc)<br>[LinearSearchByID](/docs/v1.4/api/search#linearsearchbyid-rpc)<br>[StreamLinearSearch](/docs/v1.4/api/search#streamlinearsearch-rpc)<br>[StreamLinearSearchByID](/docs/v1.4/api/search#streamlinearsearchbyid-rpc)<br>[MultiLinearSearch](/docs/v1.4/api/search#multilinearsearch-rpc)<br>[MultiLinearSearchByID](/docs/v1.4/api/search#multilinearsearchbyid-rpc) | ^                                    |
| Remove Service | Remove the exists vector(s) from the Vald Agent Pods.                                                                                             | [Remove](/docs/v1.4/api/remove#remove-rpc)<br>[StreamRemove](/docs/v1.4/api/remove#streamremove-rpc)<br>[MultiRemove](/docs/v1.4/api/remove#multiremove-rpc)                                                                                                                                                                                                                                                  | [Vald Remove APIs](/docs/v1.4/api/remove) |
| Object Service | Get information of vector(s) indexed into the Vald Agent Pods.                                                                                    | [Exists](/docs/v1.4/api/object#exists-rpc)<br>[GetObject](/docs/v1.4/api/object#getobject-rpc)<br>[StreamGetObject](/docs/v1.4/api/object#streamgetobject-rpc)                                                                                                                                                                                                                                                | [Vald Object APIs](/docs/v1.4/api/object) |

<div class="notice">
linear search services are available in v1.4.0 and later version.
</div>

## Client Library

Vald provides [the public client libraries](/docs/v1.4/user-guides/sdks) for some programming languages.
If there is no client library for your favorite programming language, please refer to [build proto docs](/docs/v1.4/api/build_proto) to build on yourself.

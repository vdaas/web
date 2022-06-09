---
title: "index_api"
date: 2022-06-09T11:19:25+09:00
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
| Insert Service | Insert new vector(s) into the Vald Agent Pods.                                                                                                    | [Insert](/docs/api/insert#insert-rpc)<br>[StreamInsert](/docs/api/insert#streaminsert-rpc)<br>[MultiInsert](/docs/api/insert#multiinsert-rpc)                                                                                                                                                                                                                                                  | [Vald Insert APIs](/docs/api/insert) |
| Update Service | Update the exists vector(s) in the Vald Agent Pods.                                                                                               | [Update](/docs/api/update#update-rpc)<br>[StreamUpdate](/docs/api/update#streamupdate-rpc)<br>[MultiUpdate](/docs/api/update#multiupdate-rpc)                                                                                                                                                                                                                                                  | [Vald Update APIs](/docs/api/update) |
| Upsert Service | Update the exists vector(s) in the Vald Agent Pods or Insert new vector(s) into the Vald Agent Pods if the vector is not exists.                  | [Upsert](/docs/api/upsert#upsert-rpc)<br>[StreamUpsert](/docs/api/upsert#streamupsert-rpc)<br>[MultiUpdate](/docs/api/upsert#multiupsert-rpc)                                                                                                                                                                                                                                                  | [Vald Upsert APIs](/docs/api/upsert) |
| Search Service | Search nearest neighbor vectors using query (vectors or IDs).<br>There are 2 types of Search methods: Search (means ANN Search) and LinearSearch. | [Search](/docs/api/search#search-rpc)<br>[SearchByID](/docs/api/search#searchbyid-rpc)<br>[StreamSearch](/docs/api/search#streamsearch-rpc)<br>[StreamSearchByID](/docs/api/search#streamsearchbyid-rpc)<br>[MultiSearch](/docs/api/search#multisearch-rpc)<br>[MultiSearchByID](/docs/api/search#multisearchbyid-rpc)<br>[LinearSearch](/docs/api/search#linearsearch-rpc)<br>[LinearSearchByID](/docs/api/search#linearsearchbyid-rpc)<br>[StreamLinearSearch](/docs/api/search#streamlinearsearch-rpc)<br>[StreamLinearSearchByID](/docs/api/search#streamlinearsearchbyid-rpc)<br>[MultiLinearSearch](/docs/api/search#multilinearsearch-rpc)<br>[MultiLinearSearchByID](/docs/api/search#multilinearsearchbyid-rpc)                                                                         | [Vald Search APIs](/docs/api/search) |
| Remove Service | Remove the exists vector(s) from the Vald Agent Pods.                                                                                             | [Remove](/docs/api/remove#remove-rpc)<br>[StreamRemove](/docs/api/remove#streamremove-rpc)<br>[MultiRemove](/docs/api/remove#multiremove-rpc)                                                                                                                                                                                                                                                  | [Vald Remove APIs](/docs/api/remove) |
| Object Service | Get information of vector(s) indexed into the Vald Agent Pods.                                                                                    | [Exists](/docs/api/object#exists-rpc)<br>[GetObject](/docs/api/object#getobject-rpc)<br>[StreamGetObject](/docs/api/object#streamgetobject-rpc)                                                                                                                                                                                                                                                | [Vald Object APIs](/docs/api/object) |

<br>
<br>
<div class="notice">
linear search services are available in v1.4.0 and later version.
</div>

## Client Library

Vald provides [the public client libraries](/docs/user-guides/sdks) for some programming languages.
If there is no client library for your favorite programming language, please refer to [build proto docs](/docs/api/build_proto) to build on yourself.

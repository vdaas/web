---
title: "Mirror Gateway_v1.7/Troubleshooting"
date: 2024-02-15T17:12:29+09:00
draft: false
weight: 0
description: ""
menu:
  troubleshooting:
    parent: Troubleshooting
---

# Mirror Gateway Troubleshooting

This page introduces the popular troubleshooting for Mirror Gateway.

Additionally, if you encounter some errors when using API, the [API status code](/docs/v1.7/api/status) helps you, too.

## Insert Operation

Mirror Gateway sends an Update request to its host if some requests are `ALREADY_EXISTS`.

Therefore, in addition to the [Insert API status code](/docs/v1.7/api/insert#status-code), the [Update API status code](/docs/v1.7/api/update#status-code) may also be returned to the user.

Here are some common reasons of error.

| name              | common reason                                                                                                                                       |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| CANCELLED         | Executed cancel() of rpc from client/server-side or network problems between client and server.                                                     |
| INVALID_ARGUMENT  | The Dimension of the request vector is NOT the same as Vald Agent's config, the requested vector's ID is empty, or some request payload is invalid. |
| DEADLINE_EXCEEDED | The RPC timeout setting is too short on the client/server side.                                                                                     |
| ALREADY_EXISTS    | Request ID is already inserted. This status code is returned when all target hosts return `ALREADY_EXISTS`.                                         |
| NOT_FOUND         | Requested ID is NOT inserted. This is the status code of the Update request.                                                                        |
| INTERNAL          | Target Vald cluster or network route has some critical error.                                                                                       |

`0 (OK)` is also returned when all target hosts return `OK` or `ALREADY_EXISTS`.

## Update Operation

Mirror Gateway sends an Update request to its host if some requests are `NOT_FOUND`.

Therefore, in addition to the [Update API status code](/docs/v1.7/api/update#status-code), the [Insert API status code](/docs/v1.7/api/insert#status-code) may also be returned to the user.

Here are some common reasons of error.

| name              | common reason                                                                                                                                       |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| CANCELLED         | Executed cancel() of rpc from client/server-side or network problems between client and server.                                                     |
| INVALID_ARGUMENT  | The Dimension of the request vector is NOT the same as Vald Agent's config, the requested vector's ID is empty, or some request payload is invalid. |
| DEADLINE_EXCEEDED | The RPC timeout setting is too short on the client/server side.                                                                                     |
| NOT_FOUND         | Requested ID is NOT inserted. This status code is returned when all target hosts return `NOT_FOUND`.                                                |
| ALREADY_EXISTS    | Request a pair of ID and vector is already inserted. This status code is returned when all hosts return `ALREADY_EXISTS`.                           |
| INTERNAL          | Target Vald cluster or network route has some critical error.                                                                                       |

`0 (OK)` is also returned when all target hosts return `OK` or `ALREADY_EXISTS`.

## Upsert Operation

The request process may not be completed when the response code is NOT `0 (OK)`.

Here are some common reasons of error.

| name              | common reason                                                                                                                                       |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| CANCELLED         | Executed cancel() of rpc from client/server-side or network problems between client and server.                                                     |
| INVALID_ARGUMENT  | The Dimension of the request vector is NOT the same as Vald Agent's config, the requested vector's ID is empty, or some request payload is invalid. |
| DEADLINE_EXCEEDED | The RPC timeout setting is too short on the client/server side.                                                                                     |
| ALREADY_EXISTS    | Requested pair of ID and vector is already inserted. This status code is returned when all target hosts return `ALREADY_EXISTS`.                    |
| INTERNAL          | Target Vald cluster or network route has some critical error.                                                                                       |

`0 (OK)` is also returned when all target hosts return `OK` or `ALREADY_EXISTS`.

## Remove Operation

The request process may not be completed when the response code is NOT `0 (OK)`.

Here are some common reasons of error.

| name              | common reason                                                                                        |
| :---------------- | :--------------------------------------------------------------------------------------------------- |
| CANCELLED         | Executed cancel() of rpc from client/server-side or network problems between client and server.      |
| INVALID_ARGUMENT  | The Requested vector's ID is empty, or some request payload is invalid.                              |
| DEADLINE_EXCEEDED | The RPC timeout setting is too short on the client/server side.                                      |
| NOT_FOUND         | Requested ID is NOT inserted. This status code is returned when all target hosts return `NOT_FOUND`. |
| INTERNAL          | Target Vald cluster or network route has some critical error.                                        |

`0 (OK)` is also returned when all target hosts return `OK` or `NOT_FOUND`.

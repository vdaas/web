---
title: "Component_content/Docs/V1.1/Overview/Component"
date: 2021-05-20T15:47:54+09:00
draft: false
weight: 0
menu:
  component:
    parent: Component
---

# Components <!-- omit in toc -->

This document will give you an overview of all the components developed and used in Vald.

## Table of Contents <!-- omit in toc -->

- [Vald Filter](#vald-filter)
  - [Vald Ingress Filter](#vald-ingress-filter)
  - [Vald Egress Filter](#vald-egress-filter)
  - [Vald Filter Gateway](#vald-filter-gateway)
- [Vald Metadata](#vald-metadata)
  - [Vald Meta Gateway](#vald-meta-gateway)
  - [Vald Meta](#vald-meta)
- [Vald Backup](#vald-backup)
  - [Vald Compressor](#vald-compressor)
  - [Vald Backup Manager](#vald-backup-manager)
  - [Vald Backup Gateway](#vald-backup-gateway)
- [Vald Load Balancing](#vald-load-balancing)
  - [Vald LB Gateway](#vald-lb-gateway)
  - [Agent Discoverer](#agent-discoverer)
- [Vald Core Engine](#vald-core-engine)
  - [Vald Agent](#vald-agent)
  - [Vald Agent Scheduler](#vald-agent-scheduler)
  - [Vald Index Manager](#vald-index-manager)
- [Vald Replication Manager](#vald-replication-manager)
  - [Vald Replication Manager Agent](#vald-replication-manager-agent)
  - [Vald Replication Manager Controller](#vald-replication-manager-controller)
- [Kubernetes Components](#kubernetes-components)
  - [Kube-apiserver](#kube-apiserver)
  - [Custom Resources](#custom-resources)

## Vald Filter

Vald Filter is an optional functionality in Vald.
User can implement the custom filtering logic and integrate with Vald.

Vald Filter provides the following functionalities.

- Custom filter based on request query
- Custom filter for the searching result

### Vald Ingress Filter

Vald Ingress Filter filters the incoming request before processing it.

Users can implement custom filtering logic such as changing the vectors or filtering based on user ID.

### Vald Egress Filter

Vald Egress Filter filters the response before sending it to the user.

This component can reorder the searching result from multiple Vald Agents based on the user-defined ranking.

### Vald Filter Gateway

Vald Filter Gateway forwards the request to Vald Ingress Filter before processing it and forwards the response to the Vald Egress Filter before returning the searching result to the user.

## Vald Metadata

In Vald, metadata consists of the vector data and the corresponding additional data to represent the set of the searching criteria and the result.

Vald Metadata includes the user inputted metadata(vector ID) and the vector, and the internal generated UUID.

### Vald Meta Gateway

The main responsibility of the Vald Meta Gateway is to process the Vald metadata and to forward the information to Vald Backup Gateway.

It will perform the following action:

1. Return error if the user has already input the same Vector ID in Vald
1. Generate the corresponding UUID for internal use.
1. Forward the vector ID and UUID request to the Vald Meta.
1. Forward the vector information (vector ID, vector, and UUID) to Vald Backup Gateway.

### Vald Meta

Vald Meta is the agent to process the CRUD request of the metadata (vector ID and UUID).
Users can configure which data source to be used in Vald Meta (for example Redis or Cassandra).

## Vald Backup

To support auto-healing functionality and increase performance during disaster recovery, Vald implements the backup mechanism.

### Vald Compressor

Vald Compressor compresses the vector data and sends to the Vald Backup Manager to process the backup request.

### Vald Backup Manager

Vald Backup Manager processes the Create/Read/Delete request of the backup request and handles the compressed metadata. Users can configure which data source to be used in Vald Meta (for example Redis or Cassandra).

### Vald Backup Gateway

Vald Backup Gateway will forward the backup request to the Vald LB Gateway.
It also forwards to Vald Compressor asynchronously with metadata.

## Vald Load Balancing

Load balancing is one of the important concepts in distributed computing, which means it distributes a set of tasks over a set of resources aiming for making the overall processing more efficient.
Vald implements its own load balancing controller.
Vald can load balance the request base on node resources.

### Vald LB Gateway

Vald LB Gateway loads balance the user request base on the node resources results from the Agent Discoverer.

### Agent Discoverer

Agent Discoverer discovers active Vald pods and the corresponding node's resources usage via [kube-apiserver](https://github.com/kubernetes/kubernetes/tree/master/cmd/kube-apiserver).

## Vald Core Engine

In this section, we will describe what is Vald Agent and the corresponding components to support Vald Agent.

### Vald Agent

Vald Agent provides functionalities to perform approximate nearest neighbor search.
Agent-NGT uses [yahoojapan/NGT](https://github.com/yahoojapan/NGT) as a core library.

Each Vald Agent pod has its own vector data space because only several Vald Agents are selected to be inserted/updated in a single insert/update request.

When searching a vector in Vald, each Vald Agent return different results of _k_-nearest neighbors depending on their index, and you'll get the merged result of them.

<img src="..//images/v1.1/vector_data_space_explain.svg" />

### Vald Agent Scheduler

Vald Agent Scheduler is the scheduler of the Vald Agent.
It implements it's own custom scheduling logic to increase the scalability of the Vald Agent.

It schedules Vald Agent base on the Node CPU and memory usage, and the amount of the indexes.

### Vald Index Manager

Vald Index Manager controls the timing of the indexing inserted vectors on the Vald Agent.
The index is used to increase the performance of the search action.

It retrieves the active Vald Agent pods from the Vald Discoverer and triggers the indexing action on each Vald Agent.

## Vald Replication Manager

Vald Replication Manager manages the healthiness of the Vald Agent.
When the pod is dead, Vald Replication Manager will recover the cache automatically to keeps the reliability of the service.

### Vald Replication Manager Agent

Vald Replication Manager Agent recovers the specific backup cache to the specific Vald Agent.
It retrieves the target backup from the Vald Compressor and recovers it to the newly created Vald Agent.

### Vald Replication Manager Controller

Vald Replication Manager Controller keeps track of the active Vald Agent pods.
When the Vald Agent is dead, it will trigger the Vald Replication Manager Agent to recover the backup cache to the auto-healed pods from the backup.

## Kubernetes Components

Vald is base on the Kubernetes platform.
In this section we will explain the Kubernetes component used in Vald and why we need them.

### Kube-apiserver

Kube-apiserver is a component of Kubernetes.
The main responsibility of Kube-apiserver in Vald is to provide node resource information for Vald agent scalability.

For more information about Kube-apiserver, please refer to [the official document](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/).

### Custom Resources

Custom Resources in Vald is a [Custom Resource Definition](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) implementation.
It provides flexibility for users to control the Vald deployment such as pod startup sequence, etc.

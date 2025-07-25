---
title: "Manage access to EdgeWorkers"
slug: "manage-access-to-edgeworkers"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 18:47:10 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Mar 04 2022 17:42:18 GMT+0000 (Coordinated Universal Time)"
---
Use EdgeWorkers roles to create and manage access to EdgeWorkers.

Your basic access to any application depends on what apps and services you purchased and are part of your account and contract.

Beyond that, an administrator can add users then create and assign roles to grant individual users access to applications. You can find detailed instructions for managing users, roles, and permissions in the [Identity and Access Management online help](https://techdocs.akamai.com/iam/docs). Review the table below for information about EdgeWorkers-related roles.

The EdgeWorkers permissions model ties an EdgeWorker ID to a group ID. When you [create an EdgeWorker ID](create-an-edgeworker-id.md) you need to select a group ID. Only users that belong to the group ID that you select can manage the EdgeWorker ID granted they have the right roles and permissions. 

| Role | Grants these abilities |
| --- | --- |
| Viewer | readEdgeWorker<br/>readVersionEdgeWorker<br/>readActivationEdgeWorker |
| Editor | readEdgeWorker<br/>writeEdgeWorker<br/>readVersionEdgeWorker<br/>writeVersionEdgeWorker<br/>readActivationEdgeWorker<br/>writeActivationEdgeWorker |
| Publisher | readEdgeWorker<br/>readVersionEdgeWorker<br/>readActivationEdgeWorker<br/>writeActivationEdgeWorker |
| Admin | readEdgeWorker<br/>writeEdgeWorker<br/>readVersionEdgeWorker<br/>writeVersionEdgeWorker<br/>readActivationEdgeWorker<br/>writeActivationEdgeWorker |

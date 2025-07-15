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

The EdgeWorkers permissions model ties an EdgeWorker ID to a group ID. When you [create an EdgeWorker ID](doc:create-an-edgeworker-id) you need to select a group ID. Only users that belong to the group ID that you select can manage the EdgeWorker ID granted they have the right roles and permissions. 

[block:parameters]
{
  "data": {
    "h-0": "Role",
    "h-1": "Grants these abilities",
    "0-0": "Viewer",
    "0-1": "readEdgeWorker  \nreadVersionEdgeWorker  \nreadActivationEdgeWorker",
    "1-0": "Editor",
    "1-1": "readEdgeWorker  \nwriteEdgeWorker  \nreadVersionEdgeWorker  \nwriteVersionEdgeWorker  \nreadActivationEdgeWorker  \nwriteActivationEdgeWorker",
    "2-0": "Publisher",
    "2-1": "readEdgeWorker  \nreadVersionEdgeWorker  \nreadActivationEdgeWorker  \nwriteActivationEdgeWorker",
    "3-0": "Admin",
    "3-1": "readEdgeWorker  \nwriteEdgeWorker  \nreadVersionEdgeWorker  \nwriteVersionEdgeWorker  \nreadActivationEdgeWorker  \nwriteActivationEdgeWorker"
  },
  "cols": 2,
  "rows": 4,
  "align": [
    "left",
    "left"
  ]
}
[/block]

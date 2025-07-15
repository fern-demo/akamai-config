---
title: "Terminology"
slug: "terminology"
excerpt: ""
hidden: false
createdAt: "Tue Oct 03 2023 00:49:05 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jan 27 2025 21:06:17 GMT+0000 (Coordinated Universal Time)"
---
Familiarize yourself with these common terms associated with EdgeWorkers flexible composition.

## Package management

A package management system automates the process of putting modules and dependencies in place so that the computer program can find them. EdgeWorkers uses flexible composition to create and deploy the code bundles and the dependencies defined in the `bundle.json` file.

## Parent EdgeWorker

A parent EdgeWorker is any EdgeWorkers function that imports other EdgeWorkers code bundles as dependencies.  A parent EdgeWorker can also be a child. To learn more, follow the steps in [Create a parent EdgeWorker](doc:create-a-parent-edgeworker).

## Child EdgeWorker

A child EdgeWorker is imported by one or more parent EdgeWorkers. Child EdgeWorkers can also contain dependencies. To learn more, follow the steps in [Add a child EdgeWorker to an existing parent](doc:add-child-edgeworkers).

The example below illustrates the parent-child relationship.

- **EWID: 4 **is the top level parent that has two direct child EdgeWorkers. 
- **EWID: 4** also has one transitive child EdgeWorker. A transitive child is not a direct descendant of the parent EdgeWorker but is connected via another EdgeWorker in the dependency tree.
- **EWID: 2** is both a child EdgeWorker to EWID:4, and a parent to EdgeWorker of EWID:1.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/parentChildRelationship-v3.jpg",
        null,
        ""
      ],
      "align": "center",
      "sizing": "650px",
      "border": true
    }
  ]
}
[/block]


## Combined code bundle

A combined code bundle is composed of the parent code bundle and all imported child dependencies. To learn more, go to the [Create a code bundle](doc:create-a-code-bundle) topic in this guide.

> 📘 You need to [Create an EdgeWorker version](doc:manage-edgeworkers#create-an-edgeworker-version) when you want to activate a new EdgeWorkers code bundle or update an existing code bundle.

## Revision

The EdgeWorkers service creates a Revision when a child EdgeWorker is updated. Revisions are dynamically submitted by the system on the same Akamai network, either staging or production, as the activation they are linked to. One activation can have many revisions. Revisions are mapped, like activations, to a specific network. If a version is activated on the staging network, the revision will also occur on the staging network.  

The first revision is generated when a parent EdgeWorker is activated. Subsequent revisions are dynamically created by new child activations. To learn more, refer to the [Review a dynamic reactivation](doc:dynamic-reactivation) example in this guide.

Activations, on the other hand, are submitted by the user on a specific Akamai network, either staging or production. You need to perform a separate activation to activate the same version on another network.

## Revision ID

Each dynamic reactivation generates a unique Revision ID. The first Revision ID is created when you activate the parent EdgeWorker version. Subsequent Revision IDs are created when you activate a new version of a child EdgeWorker. To see how this works you can review the diagram in the [Dynamic reactivation](doc:terminology#dynamic-reactivation) description.

The Revision ID consists of the activation ID and a unique ID for each reactivation, separated by a dash. For example, the first Revision ID for the Activation 1 would be `1-1`. When a new version of a child is activated, the parent gets a new Revision ID, `1-2`.   If Activation 1 does not have any dependencies, an Revision ID of `1-0` is created automatically as a placeholder.

You can use the Revision ID to identify what was pushed to the network. The Revision ID appears in Control Center with a link to the Bill of Materials. You can also view a list of the Revision IDs in Akamai Control Center. To learn more, refer to the [Review a dynamic reactivation](doc:dynamic-reactivation) example in this guide.

## Static Revisioning

Static revisioning lets you freeze the dependency tree of a imported child EdgeWorkers as you work on changes to your code bundles. Instead of using the current active version, you can import an active or inactive child EdgeWorker using the Revision ID. This lets you import a large tree without having to worry about the impact of dynamic reactivations from various children in the code bundle. For more information, see [Import a static revision](doc:review-a-static-activation).

Revision pinning lets you temporarily disable dynamic reactivation for an EdgeWorker. When you pin a revision, it freezes the entire active dependency tree for EdgeWorkers that you own.  It doesn't let you control the dependencies of a pinned child EdgeWorker that belongs to another team. The parent EdgeWorker won't be dynamically reactivated via that child until it is unpinned. It is up to the team that owns the child EdgeWorkers to decide when to unpin it. 

Static revisioning, on the other hand, provides a way for you to configure a parent EdgeWorker to:

- Import specific Revision IDs
- Disable dynamic reactivation for an imported Revision ID
- Import both active and inactive EdgeWorkers versions

## Static Revision ID

The Static Revision ID is a unique identifier for each static revision. It is only present in a BOM if a specific revision of a dependency is imported. You can use the Revision ID to enable Static Revisioning.

To see the Static Revision ID in the EdgeWorkers Management application: 

- Select the active version of the parent EdgeWorker.
- Then go to the Activation tab and select the `Activation ID` used to active the EdgeWorker that includes the Static Revision ID.
- Next, select the `Revision ID` active on the network.

You can view the EdgeWorker BOM and view all the transitive dependencies for the combined code bundle. This includes the Static Revision ID.

## Revision pinning

Pinning an active revision locks the parent EdgeWorker to that revision.

By default, when you activate a parent EdgeWorker the initial revision is pinned to the parent. This prevents dynamic reactivation. You can use revision pinning to change which revision is pinned to the parent or to pin a revision to the parent if you disabled auto pin when activating the parent. 

Direct or transitive child EdgeWorkers cannot trigger new revisions for the pinned parent EdgeWorker or any of its transitive parents. This allows you to control what is imported by the EdgeWorkers that you own. You can only pin active revisions that you have access to and not those owned by other teams. For more information see [Pin a revision](doc:pin-a-revision) in this guide.

## Auto pin

By default, the initial revision created when you activate the parent EdgeWorker is pinned. Pinning prevents dynamic reactivation. The Revision ID is `X-1` to represent the first Activation and the first Revision for a parent EdgeWorker.

To enable dynamic reactivation you need to disable auto pin when you activate the parent EdgeWorker.

## Dynamic reactivation

A new revision of the parent EdgeWorker is dynamically activated when a new version of a child EdgeWorker is activated. For more information see, [Review a dynamic reactivation](doc:dynamic-reactivation) in this guide.

> 📘 By default, dynamic reactivation is disabled. You need to disable auto pin when you activate the parent EdgeWorker. If the initial revision was pinned, it can be unpinned to enable dynamic reactivation.

A dynamic reactivation pushes the parent EdgeWorker and its dependencies to the Akamai network. A revision includes the collection of versioned EdgeWorkers. You can use these three tools to track each revision and identify what's running on the network.  

- BOM  
- Revision ID  
- Changes between revisions

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/dynamicReactivation-v4.jpg",
        null,
        ""
      ],
      "align": "center",
      "sizing": "650px",
      "border": true
    }
  ]
}
[/block]


## Revision activation

A revision activation lets you activate an old revision. You can only activate a revision that is part of the current activation. On the other hand, an [Activation](doc:manage-edgeworkers#activate-an-edgeworker-version) is submitted by the user on a specific network. You need to perform another activation to activate the same version on another network.

This example shows that you can select a revision that was previously activated and activate it again.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/revisionActivation-v5.jpg",
        null,
        ""
      ],
      "align": "center",
      "sizing": "650px",
      "border": true
    }
  ]
}
[/block]


## BOM

The Bill of Materials (BOM) lists the dependency tree of an activated parent EdgeWorker. It includes the EdgeWorker ID and versions of all the transitive children.

Enable **Include active versions** to limit the results to show only active versions.

Enable **Include currently pinned revisions** to show additional information about the revision that's currently pinned.

You can also select the **Dependency Tree** tab to see a visual representation of the dependencies.

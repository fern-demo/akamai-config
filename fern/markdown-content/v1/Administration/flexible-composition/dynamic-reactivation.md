---
title: "Review a dynamic reactivation"
slug: "dynamic-reactivation"
excerpt: ""
hidden: false
createdAt: "Mon Sep 18 2023 18:09:10 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jan 27 2025 21:06:21 GMT+0000 (Coordinated Universal Time)"
---
This example shows how a parent EdgeWorker is automatically updated when a child is edited.

> 📘 By default, dynamic reactivation is disabled. You need to disable auto-pin for the parent EdgeWorker to allow dynamic reactivation.

In an effort to make some improvements, the Security dev team created and activated a new version of their EdgeWorker.

- The active version number is now `6`.
- As soon as the new version of the Security EdgeWorker is active, the staging version of the parent EdgeWorker is dynamically reactivated.
- Requests sent to the parent EdgeWorker will now use version `6` of the Security EdgeWorker.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/editChild-v1.png",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


To make sure that the parent was dynamically reactivated to reflect the new child Security version you can go to the **Revisions** tab of the CoreSite EdgeWorker.

A third revision appears in the list so we know that the activation was successful. Each dynamic reactivation generates a unique Revision ID. For more information you can click on the Revision ID.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/editChilActivation-v2.png",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/editChildActivation-v1.png",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


## 1. View the Bill of Materials

The BOM shows that version `6` was included as part of the latest dynamic reactivation. The developers that own the CoreSite EdgeWorker didn’t need to perform any tasks to make this update.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/DynActBOM-v1.png",
        "",
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


To further confirm these changes, use the **View diff** button to compare the BOM of the CoreSite EdgeWorkers function.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/viewDiffRev-v1.png",
        "",
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


## 2. View the Combined Code Bundle

The combined code bundle also shows that the latest version of the Security EdgeWorker, version `6`, is part of the code bundle.

> 📘 The parent uses the active version of the Security EdgeWorker. This allows dynamic activation to occur when a new version is activated.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/dynActCCB-v1.png",
        "",
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]

---
title: "How to change to a different EdgeWorkers tier"
slug: "change-resource-tier"
excerpt: ""
hidden: false
createdAt: "Thu Nov 14 2024 15:05:03 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Dec 18 2024 18:54:22 GMT+0000 (Coordinated Universal Time)"
---
This tutorial describes how to change the resource tier associated with an existing EdgeWorkers function. There are three resource tiers available for you to use, Basic Compute, Dynamic Compute, and Enterprise Compute. Each tier  defines a set of consumption limits for your EdgeWorkers functions.

> 👍 To learn more, go to the [Resource tier limitations](doc:resource-tier-limitations) and the [supported use cases](doc:select-a-resource-tier#use-case-support-by-resource-tier) for each resource tier.

# Check your contract

Before you start, make sure that the resource tier you want to change to is available on your contract.

1. To check, go to Akamai Control Center and from the services menu go to **Account Admin** > **Contracts**. 
2. Select your contract ID.
3. In the list of products search for EdgeWorkers.

The resource tiers available on your contract will appear. 

> 📘 Contact your account representative if the resource tier you want to change to doesn't appear.

# Clone the EdgeWorker

To change the resource tier, you need to clone the EdgeWorker ID. 

1. Log in to Control Center.

2. Go to <<PORTAL_ICON_ROOT>> <<CHAR_MENU_DELIMITER>> **CDN** <<CHAR_MENU_DELIMITER>> **EdgeWorkers**.

3. Click on the EdgeWorker ID that you want to update.

The details page will appear. It displays information about the EdgeWorker including the resource tier. In this example the EdgeWorker ID has a resource tier of of **100 - Basic Compute**.

4. Click the **Edit** button to edit the EdgeWorker ID.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/ew-resource-tier-migration-v1.jpg",
        null,
        ""
      ],
      "align": "left",
      "sizing": "500px",
      "border": true
    }
  ]
}
[/block]


<br />

<br />

5. Click the **edit** link to edit the resource tier.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/ew-rt-migrtion2-v1.jpg",
        "",
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


6. Select the new resource tier from the dropdown list.

> 📘 Review the [Resource tier limitations](doc:resource-tier-limitations) before cloning an EdgeWorker ID. It's important to make sure that the EdgeWorkers function can successfully execute when lowering the resource limits. If the execution is unsuccessful the timeout error rate may significantly increase. This can adversely impact your delivery traffic.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/ew-rtMigration3-v1.jpg",
        "",
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


When you select a new resource tier the window title and button changes to **Clone EdgeWorker ID**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/ew-rtMigration4-v1.jpg",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


7. Click the **Clone EdgeWorker ID** button.

This creates a new EdgeWorker ID. Both the new EdgeWorker ID `425125` and the original EdgeWorker ID `425124` appear in the list of EdgeWorker IDs.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/ew-rtMigration5-v1.jpg",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


8. Select the new EdgeWorker ID and click the **Create Version** button. 

You can upload the same EdgeWorkers code bundle and edit it if necessary.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/ew-rtMigration6-v1.jpg",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


9. After you clone the EdgeWorker ID and create a new version you need to [activate the version](doc:manage-edgeworkers#activate-an-edgeworker-version). 

# Update your property

Next, you need to update your property so that the EdgeWorker behavior uses the new EdgeWorker ID with the updated resource tier.

1. Navigate to your property in ​Akamai Control Center​.
2. Click the **New Version** button and select the rule that had the older EdgeWorker ID mapped to it.
3. Find the EdgeWorkers behavior and select the cloned EdgeWorker ID from the dropdown list.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/ew-rtMigration8-v1.jpg",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


4. Save and activate your property.

Once your property is activated it will use the new EdgeWorker ID that applies the new resource tier limitations.

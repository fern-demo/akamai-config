---
title: "EdgeWorkers reports"
slug: "manage-report-data"
excerpt: ""
hidden: false
createdAt: "Thu May 06 2021 21:54:12 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Feb 25 2025 14:50:45 GMT+0000 (Coordinated Universal Time)"
---
EdgeWorkers built-in reports help you gain insight about the performance and execution status of your EdgeWorkers functions. You can also view these reports using the [EdgeWorkers Management API](ref:get-reports).

> 📘 Go to the [Billing Center](https://control.akamai.com/apps/billing/#/bills/your-bills) for accurate EdgeWorkers event numbers. The event numbers provided in the EdgeWorkers reports may be impacted by network congestion. For more information refer to this [Known issue](https://techdocs.akamai.com/edgeworkers/docs/known-issues#use-billing-center-for-accurate-edgeworkers-event-data).

These reports can also help monitor the health of your EdgeWorkers and provide information about whether your EdgeWorkers functions are operating within the defined [product limits](doc:limitations). 

## View the Reporting dashboard

Follow these steps to view the EdgeWorkers Management application and the built-in reports.

> 📘 The EdgeWorkers option is only available under **CDN** if EdgeWorkers is part of your contract.

1. Log in to <<PORTAL_NICKNAME>>.

2. Go to <<PORTAL_ICON_ROOT>> <<CHAR_MENU_DELIMITER>> **CDN** <<CHAR_MENU_DELIMITER>> **EdgeWorkers**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/reportsOption2-v1.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "340px",
      "border": true
    }
  ]
}
[/block]


3. Click the **EdgeWorker Reports** tab.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/reportsOption3-v2.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "440px"
    }
  ]
}
[/block]


[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/reportsOption3-v1.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "3px"
    }
  ]
}
[/block]


***

## Customize the report data

You can customize the data included in your reports. The available customizations include setting date ranges and selecting specific EdgeWorker IDs and versions. By using the data options you can build reports that provide a deeper insight into the delivery of your EdgeWorkers functions. You can also compare versions of the same EdgeWorker ID in a single report. This may help when testing updates and improvements to your configurations.

> 👍 Each time you change data options click the **Update Reports** button to refresh the report contents.

 ![EdgeWorkers reports](https://techdocs.akamai.com/edgeworkers/img/edgeWorkersReports1-v2.png)

[block:parameters]
{
  "data": {
    "h-0": "Data option",
    "h-1": "Description",
    "0-0": "Select EdgeWorker IDs",
    "0-1": "Limit your report to specific EdgeWorker IDs. You can select up to 10 EdgeWorker IDs. Once you select the EdgeWorker IDs you can go to the <strong>Version</strong> tab and select which versions of each selected EdgeWorker ID to include in the report.",
    "1-0": "Select versions",
    "1-1": "By default the report includes all versions of each selected EdgeWorker ID. You can, however, limit the EdgeWorker versions in your reports.",
    "2-0": "Select event handlers",
    "2-1": "Limit your report to the selected event handlers. For more information go to [Event handler functions](doc:event-handler-functions).",
    "3-0": "Select execution statuses",
    "3-1": "Create reports based on the successful, failed, or both execution statuses. You can also choose specific failure types.  \n**Note: **You can't filter sub-requests by execution status.",
    "4-0": "Date range",
    "4-1": "Filter report output to a specific date range."
  },
  "cols": 2,
  "rows": 5,
  "align": [
    "left",
    "left"
  ]
}
[/block]

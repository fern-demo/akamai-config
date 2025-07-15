---
title: "Manage EdgeWorkers"
slug: "manage-edgeworkers"
excerpt: ""
hidden: false
metadata: 
  description: "You can use the EdgeWorkers Management application to perform the administrative tasks required to execute EdgeWorkers functions with a user interface (UI)."
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 19:09:42 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jan 27 2025 21:26:11 GMT+0000 (Coordinated Universal Time)"
---
You can use the EdgeWorkers Management application to perform the administrative tasks required to execute EdgeWorkers functions with a user interface (UI).

# Access the EdgeWorkers Management application

1. Log in to Control Center.

2. Go to <<PORTAL_ICON_ROOT>> <<CHAR_MENU_DELIMITER>> **CDN** <<CHAR_MENU_DELIMITER>> **EdgeWorkers**.

# Create an EdgeWorker version

Create an EdgeWorker version when you want to activate a new EdgeWorkers code bundle or update an existing code bundle.

> 👍 To complete this step, you need a [code bundle](doc:create-a-code-bundle) or you can use the [code bundle editor](doc:code-bundle-editor) to create a new EdgeWorker version.

1. From the EdgeWorkers details page, click on an EdgeWorker ID or name.

   Only the EdgeWorkers you have permission to access appear in the list.

2. Click the **Create version** button.

   [block:image]{"images":[{"image":["https://techdocs.akamai.com/edgeworkers/img/edgeworker-new-version-v1.png",null,"Create EdgeWorker version"],"align":"center","border":true}]}[/block]

3. From the **Create version** window you can:
   1. Drag and drop an existing code bundle onto the window and click the **Create version** button or; 
   2. Use the **Open editor** button to create a new version in the [code bundle editor](doc:code-bundle-editor).  
      The code bundle editor opens the last saved version or a Hello world example for you to use as a starting point for your new version.

> 📘 You cannot use a version previously deleted from your EdgeWorker ID to create a new version. For more information see, [Delete an EdgeWorker version](doc:manage-edgeworkers#delete-an-edgeworker-version).

# Create a draft version

Create a draft if you want to save your changes and continue editing the code bundle later. You can save a draft even if your code bundle contains validation errors. To save your files as a version these validation errors need to be resolved.

1. Select an EdgeWorker ID from the EdgeWorkers details page. 

2. Use the **Create version** or **Open editor** button to create a new version. 

3. You can create a new version or make updates to an existing version and select **Save as draft**.

   For each EdgeWorker ID you can only save one draft. If you've already created a draft, you have the option to discard it and create a new one.

   You can close the draft and return to it later to continue editing. Once you're finished editing the draft you can save it as a new version.

# Activate an EdgeWorker version

Once you have created an EdgeWorker version you can activate it on your staging or production network. Only one EdgeWorker version can be active on the staging network and only one can be active on the production network. When the activation process is complete, the previously activated version becomes inactive. An inactive version can be re-activated.

1. From the EdgeWorker versions page, select the EdgeWorker version you want to activate.

2. Select the network where you want to activate the version.

   You can use the staging network to validate the behavior of your code. Once you've tested the functionality, you can activate it on the production network.

3. Auto pin is enabled by default. It pins the initial revision when you activate a parent EdgeWorker. This option applies to [Flexible composition](doc:flexible-composition), a capability that lets teams within an organization work separately to create and deploy multiple EdgeWorkers for the same website.

   Dynamic reactivation apply if you disable the auto pin option when you activate a parent EdgeWorker.

4. Click the **Activate version** button.

> 👍 To deactivate an active EdgeWorker version selection the version you want to deactivate. You can then click the **Deactivate version** button.

# Cancel an EdgeWorker version activation

Use the EdgeWorkers Management application to cancel a pending EdgeWorker version activation.

1. From the EdgeWorker versions page, select the activation you want to cancel.

> 📘 You can only cancel an activation when it's in a pending state. You cannot cancel an activation that is no longer pending and in progress. You need to wait for the activation to complete and then [deactivate](doc:manage-edgeworkers#activate-an-edgeworker-version) it. Once the deactivation is complete you can then [delete](doc:manage-edgeworkers#delete-an-edgeworker-version) the EdgeWorker version.

2. If the activation is pending on both networks, select **Staging** or **Production**, from the network dropdown.  
   If the activation is only pending on one network the dropdown will be auto-populated.

3. Click the **Cancel Activation** button.

   If the cancellation is successful, the current active version remains active.

# Roll back to the previously active version

You can roll back to the last activated version of an EdgeWorker ID. 

1. Select an EdgeWorker ID from the EdgeWorkers details page.

2. View the activation details that appear for the selected EdgeWorker ID.

   Review the **Staging network** and **Production network** information to see if there is a previously activate version that you can roll back to. 

3. To roll back, click the link to revert to the last activated version. 

# View the version history

Use the EdgeWorkers Management application to view the activation and deactivation history for an EdgeWorker ID.

1. Select an EdgeWorker ID from the EdgeWorker details page.

2. Select **Activation history** or **Deactivation history** tab.

3. View the details that appear in the **Current status** column.

   Review the table for information about each status.

| Status       | Description                                                                                                                                                                                                                                                   |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Activating   | The version is currently activating.                                                                                                                                                                                                                          |
| Deactivating | The current version is currently deactivating.                                                                                                                                                                                                                |
| Active       | The version is active. Only one version can be active at a time.                                                                                                                                                                                              |
| Blocked      | <<COMPANY_NICKNAME>> cannot determine if the EdgeWorker code bundle was successfully deployed to the edge server. When this occurs, <<COMPANY_NICKNAME>> prevents the activation from completing. The previously activated EdgeWorker version remains active. |
| Error        | An error is detected during the activation or deactivation process.                                                                                                                                                                                           |
| Deactivated  | The EdgeWorker version is deactivated. This status can also appear if the EdgeWorkers code bundle is deactivated due to a possible network issue. Contact support for more information.                                                                       |
| Inactive     | The version is currently inactive. This status appears when an EdgeWorker version has not yet been activated or when a deactivation is complete.                                                                                                              |
| Complete     | The version activation or deactivation is complete.                                                                                                                                                                                                           |

# View the resource tiers details

Use the EdgeWorkers Management application to view the resource tier selected for an EdgeWorker ID.

1. Select an EdgeWorker ID from the EdgeWorkers details page.

2. Select the **Resource Tiers** tab.

3. The details for the selected EdgeWorker ID appear in the tab.

> 📘 By default, all EdgeWorker IDs created before resource tiers were introduced, execute using the Dynamic Compute resource tier.

You can contact your <<COMPANY_NICKNAME>> account representative for more information about billing. For instructions on how to change the resource tier assigned to an EdgeWorkers function see Clone an EdgeWorker ID below.

# Clone an EdgeWorker ID

To change the resource tier of an EdgeWorkers function, you need to clone the EdgeWorker ID.

For complete instructions refer to the [How to change to a different EdgeWorkers tier](doc:change-resource-tier) tutorial.

1. Select an EdgeWorker ID from the EdgeWorkers details page and click the **Edit EdgeWorker ID** button.

2. Select the edit link beside the Resource tier field to open the **Clone EdgeWorker ID** window.

3. Select a new resource tier for your EdgeWorker ID.

   By default, all EdgeWorker IDs created before resource tiers were introduced, execute using Dynamic Compute. You can however, change an EdgeWorkers function to Basic Compute, a less costly tier with lower limits.

> 🚧 Review the [Resource tier limitations](doc:resource-tier-limitations) for each resource tier before cloning an EdgeWorker ID. It is important to make sure that the EdgeWorkers function can successfully execute when lowering the resource limits. If the execution is unsuccessful the timeout error rate may significantly increase. This can adversely impact your delivery traffic.

4. Click the **Clone EdgeWorker ID** button.

5. Once you have cloned your EdgeWorker ID you can create and activate EdgeWorker versions.

# Delete an EdgeWorker ID

When you delete an EdgeWorker ID it's permanently removed from your account. It also deletes all versions, code bundles, and the activation and deactivation history associated with the EdgeWorker ID. 

> 👍 See [Delete an EdgeWorker version](doc:manage-edgeworkers#delete-an-edgeworker-version) if you want to delete a version from an EdgeWorker ID.

1. Select the EdgeWorker ID you want to delete from the list of EdgeWorker IDs.

2. Click the **Delete** button on the EdgeWorkers details page.

3. Click the **Search active properties** button to check for active versions associated with the EdgeWorker ID on your properties.

   You can only delete an EdgeWorker ID if none of its versions are active on staging or production.

   Only users with access to all properties should delete an EdgeWorker ID. If you don’t have access to view all properties you’ll receive notification after you click the **Search active properties** button.

> 🚧 You shouldn't delete an EdgeWorker ID if one or more active properties are using it. Doing so can cause issues in your Property Manager configuration.  
> You can, however, deactivate the active property that is using the EdgeWorker ID. You won't be able to re-activate this property once the EdgeWorker ID is deleted.

4. Select the check box to confirm that you have checked to make sure that the EdgeWorker ID isn’t active on any active properties.

5. Click the **Delete EdgeWorker ID** button.

# Delete an EdgeWorker version

When you delete an EdgeWorker version it's permanently removed from the EdgeWorker ID. It also deletes the activation and deactivation history of the version. You can only delete a deactivated EdgeWorker version. Active or activating versions cannot be deleted.

1. Select the EdgeWorker ID that contains the version that you want to delete.

2. Click on the EdgeWorker version and select **Delete version** from the **Actions** menu.

If the EdgeWorker version is active on the staging or production network you will receive a warning message. 

- To deactivate an EdgeWorker version go to the EdgeWorker ID details page and click on the **Versions** tab.
- Find the version number you want to delete and select **Deactivate version** from the Actions menu.

> 👍 You cannot use a version previously deleted from your EdgeWorker ID to create a new version. Follow the steps in [Create a code bundle](doc:create-a-code-bundle) and use a new, unique version in the `bundle.json` file to create a new code bundle.

# View Properties

You can view the active and inactive properties using an existing EdgeWorker ID. This information can be useful when deleting an EdgeWorker ID. 

1. Select an EdgeWorker ID. 

2. Click on the **Properties** tab on the EdgeWorker details page.

   These fields are blank if the EdgeWorker ID is not active on any properties.

[block:parameters]
{
  "data": {
    "h-0": "Field",
    "h-1": "Description",
    "0-0": "ID",
    "0-1": "The property ID.",
    "1-0": "Name",
    "1-1": "The name of the property where the EdgeWorker ID is active.",
    "2-0": "Latest version",
    "2-1": "The latest property version available.  \n  \nThis version may not be active on the staging or production network. It is the last version created.",
    "3-0": "Active stating version",
    "3-1": "The property version active on the staging network.",
    "4-0": "Active production version",
    "4-1": "The property version active on the production network."
  },
  "cols": 2,
  "rows": 5,
  "align": [
    "left",
    "left"
  ]
}
[/block]


# Override the JavaScript Log Level

You can deliver JavaScript logs to an external endpoint using a DataStream 2 stream. For more information go to the [Use DataStream 2 to deliver JavaScript logs](doc:ds2-javascript-logging) topic in this guide. 

These steps describe how to use the EdgeWorkers Management application to override the default JavaScript Log Level in these logs. 

1. Select the EdgeWorker ID that is configured to use DataStream 2 to deliver JavaScript logs.
2. Click on the **Log Level** tab on the EdgeWorker details page.

Provide the following details in the **Override default JavaScript logging level** window and then click the **Change Log Level** button to apply the changes.

[block:parameters]
{
  "data": {
    "h-0": "Field",
    "h-1": "Description",
    "0-0": "Network",
    "0-1": "(Required) The network to activate the log level override, either `STAGING` or `PRODUCTION`.",
    "1-0": "Log level",
    "1-1": "(Required) Specifies the log level. The available log levels are, `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`. The default log level is `ERROR`.",
    "2-0": "DataStream ID",
    "2-1": "(Optional) Specifies the Data Stream 2 stream to use to deliver the logs.",
    "3-0": "Timeout",
    "3-1": "(Optional) Sets the date and time when the logging override settings should expire. Once the expiry occurs the log level reverts back to the default level of `ERROR`.  \nIf you do not specify a timeout, the log level override is applied indefinitely or until you change the log level."
  },
  "cols": 2,
  "rows": 4,
  "align": [
    "left",
    "left"
  ]
}
[/block]

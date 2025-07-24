---
title: "Import a static revision"
slug: "review-a-static-activation"
excerpt: ""
hidden: false
createdAt: "Tue May 28 2024 23:57:40 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Jun 07 2024 15:59:52 GMT+0000 (Coordinated Universal Time)"
---
This example shows how to import a specific Revision ID of the Security EdgeWorker into the parent EdgeWorker.

When you import a Revision ID, the Security dependency tree remains locked to that revision. If the team that owns the Security EdgeWorker activates a new version it will not change your dependency tree. This lets you make and test improvements with a specific revision of an EdgeWorker without being impacted by changes made by the Security team. It also lets the you import an inactive EdgeWorker version. 

To learn more, refer to the [Static Revisioning](terminology.md#static-revisioning) definition on the [Terminology](terminology.md) page.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/staticRevision-v2.jpg" alt="Image"/>
</Frame>


# **Update the parent EdgeWorker**

## 1\. Specify the Revision ID in the code bundle

1. Select the parent EdgeWorker ID in the EdgeWorkers Management application. In this example the EdgeWorker ID for CoreSite is `80554`.
2. Select the currently active version. 
3. Select the **Code Bundle** tab for the active version.
4. Select the `bundle.json` file in the code bundle editor.
5. Increment the `edgeworker-version` number. In this example we updated it to `4`.  You can also update the description to note the reason why you created the new version.
6. Change the security version from `active` to `"revisionId:4-1"`. We will still import the active version of the marketing EdgeWorker.

```json
{
    "edgeworker-version": "4",
    "description" : "Freeze the security dependency tree",
    "dependencies": {
        "marketing": {
            "edgeWorkerId": 80552,
            "version": "active"
        },
        "security": {
            "edgeWorkerId": 80555,
            "version": "revisionId:4-1"
        }
    }
}
```

## 2\. Create a new version of the parent

Check to make sure you don't have any errors. If you try to import a Revision ID that doesn't exist, you'll get an error message.

1. Click the **Create new version** button in the Code Bundle Editor and again in the confirmation window.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/importStaticrevision-v3.jpg" alt="Image"/>
</Frame>


2. Next, activate the version that you just created.
3. Requests sent to the top-level EdgeWorker will now apply the security features included in the Revision ID `4-1` of the Security EdgeWorker.

## 3. View the BOM

To view the BOM, select the active version `4`, the Activation ID `7`, and then the Revision ID `7-1`.

Then select the **Bill of Materials** tab to see all the transitive dependencies for the CoreSite EdgeWorker.

The BOM for the security EdgeWorker is frozen. If SSO, which is a child of security, is updated this change will not impact the CoreSite EdgeWorker. You will see a new version number for the SSO EdgeWorker in the BOM but it will not apply to CoreSite since it was created after the `revisionId` was identified in the code bundle.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/staticRevisionBOM-v4.jpg" alt="Image"/>
</Frame>

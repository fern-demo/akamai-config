---
title: "Code bundle editor"
slug: "code-bundle-editor"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 16:50:37 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Dec 19 2022 14:07:06 GMT+0000 (Coordinated Universal Time)"
---
The code bundle editor is built-in to the EdgeWorkers Management application. You can use this  custom tool to edit your EdgeWorkers without having to set up an integrated development environment or use a command line interface.

This tool is useful as a quick editor so you can view, validate, and edit the files in your code bundles.

1. Log in to Control Center.

2. Go to <<PORTAL_ICON_ROOT>> <<CHAR_MENU_DELIMITER>> **CDN** <<CHAR_MENU_DELIMITER>> **EdgeWorkers**.

3. Select the EdgeWorker ID you want to edit.

4. Select an EdgeWorker version from the EdgeWorker details page to edit an existing EdgeWorker version.

5. Select the **Code Bundle** tab.

   The files included in the EdgeWorker version appear in the Code bundle editor.

 ![Code bundle editor](https://techdocs.akamai.com/edgeworkers/img/codeBundleEditor-v1.png)

> 👍 You can also use the code bundle editor to [create an EdgeWorker version](doc:manage-edgeworkers#create-an-edgeworker-version).

6. Review these features to learn how the code bundle editor can help you validate and edit your EdgeWorkers.

[block:parameters]
{
  "data": {
    "h-0": "Feature",
    "h-1": "Description",
    "0-0": "1. **View diff**",
    "0-1": "Select two versions of an EdgeWorker ID to compare. Once you've selected the versions you can pick a file from each code bundle to compare in a side-by-side view.  \n  \nIf a draft version exists for the EdgeWorker ID you can load it in the diff tool. This lets you compare a draft and a saved version.",
    "1-0": "2. **Navigate files**",
    "1-1": "Navigate between your EdgeWorkers by selecting a folder in the file tree. Open the <code>bundle.json</code>  and <code>main.js</code>  files to view them in the Code editor. Use the right click menu options to create a new directory or a new file in any existing directory or the root of the EdgeWorkers code bundle. You can also use the right click menu options to rename, remove, or copy/paste the files in the file tree.",
    "2-0": "3. **View and edit**",
    "2-1": "View the contents of the file you selected in the file tree. Here you can also view semantic and syntax validation. To save any changes you've made you need to create a new EdgeWorker version. Do this by manually typing in a new EdgeWorker version number.",
    "3-0": "4. **View errors**",
    "3-1": "View any validation errors. You cannot save an EdgeWorkers code bundle as a new version if  it contains validation errors.  \n  \nYou can save a code bundle that contains validations errors as a draft.",
    "4-0": "5. **Save as draft** ",
    "4-1": "[Create a draft](doc:manage-edgeworkers#create-a-draft-version) if you want to save your changes and continue editing the code bundle later. You can save a draft even if your code bundle contains validation errors.",
    "5-0": "6. **Create new version**",
    "5-1": "The <strong>Create new version</strong> button remains inactive until you update the EdgeWorker version number and resolve any validation errors."
  },
  "cols": 2,
  "rows": 6,
  "align": [
    "left",
    "left"
  ]
}
[/block]

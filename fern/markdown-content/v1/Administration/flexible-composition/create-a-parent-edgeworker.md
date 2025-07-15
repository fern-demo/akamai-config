---
title: "Create a parent EdgeWorker"
slug: "create-a-parent-edgeworker"
excerpt: ""
hidden: false
createdAt: "Sun Sep 10 2023 17:01:34 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Aug 30 2024 11:20:34 GMT+0000 (Coordinated Universal Time)"
---
In this example you'll learn how to use flexible composition to deploy two separate EdgeWorkers to the Akamai staging network for the same website. Each EdgeWorkers function is created and maintained by a separate development team in the same organization.

The Marketing team uses their child EdgeWorker to localize an ad campaign for a specific sales region. The CoreSite team uses their parent EdgeWorker to pull the site together. In the future, the CoreSite team plans to add another child EdgeWorkers from the Security development team.

Here's the dependency hierarchy for this example.

```
CoreSite EdgeWorker
 + marketing (EW 80552)
```

# Before you start

Create a child EdgeWorker called **Marketing**. Deploy and activate it on the Akamai staging network. 

- You can use the instructions in the [EdgeWorkers Management application Hello World](doc:hello-world-edgeworkers-management-application) example to create an EdgeWorker ID and activate the code sample below.
- For best results, use the **Dynamic Compute** resource tier when creating your EdgeWorker ID.
- Remember to note the EdgeWorker ID, you’ll need it to update the dependency list in the parent EdgeWorker.
- Review the [limits](doc:limitations#flexible-composition-limits) that apply to EdgeWorkers functions created using flexible composition.

Here's the JavaScript source code for the `main.js` file.

```javascript
import { logger } from 'log';


export function getMarketingHeader() {
  logger.log("Marketing EdgeWorker called");
  return "<!-- Marketing header goes here -->";
}


// Not used.
export function onClientRequest (request) {}
```

# **Create the parent EdgeWorker**

## 1. Import the child EdgeWorker

1. Add an import statement to the `main.js` file to import the Marketing EdgeWorker as a child.
2. You can use the following JavaScript source code to create a `main.js` file. 

```javascript
import * as marketing from "marketing";

export function onClientRequest(request) {
   let marketingHeader = marketing.getMarketingHeader();

   request.respondWith(200, {}, `
<html>
<head>${marketingHeader}
<body>
<h1>Hello Flexible Composition World!</h1>
`);
}
```

## 2. Add the child EdgeWorker as a dependency

In order to import the EdgeWorkers, you need to declare a set of dependencies in the `bundle.json` file. On loading the EdgeWorkers function, the dependencies are loaded as modules. 

1. Add a **dependencies** section to the `bundle.json` file to add the Marketing EdgeWorker as a child.

2. Enter the name of the dependency that you want to add as a child. You'll need to use this exact name in the import statement and in the `main.js` file of the parent EdgeWorker. In this example we're using "marketing".

3. Enter the EdgeWorker ID of the child you want to import. In this example the EdgeWorker ID is `80552`. You'll need to change this to the actual child EdgeWorker ID that you just created.

4. Enter **active** as the version. This imports the version of the EdgeWorker ID specified in the previous step that is currently active on the Akamai network. When you use the active version, dynamic reactivation will occur if you create and activate a new version of this child EdgeWorker.

> 📘 You can also import a child EdgeWorker by specifying the Revision ID. When you import a specific revision you lock the dependency tree of that child EdgeWorker. This can help when working across teams because it prevents dynamic activation. It also lets you import any active or inactive EdgeWorker revision. For more information see, [Import a static revision](doc:review-a-static-activation).

```json
{
    "edgeworker-version": "1",
    "description" : "Get our marketing header",
    "dependencies": {
        "marketing": {
            "edgeWorkerId": 80552,
            "version": "active"
        }
    }
}
```

5. [Create a code bundle](doc:create-a-code-bundle) for these files. 
6. [Create an EdgeWorker ID](doc:create-an-edgeworker-id-1) named **CoreSite**. 
7. Create a version and drop the `tgz` code bundle in the **Create version** window and click the **Create version** button again. 
8. Next, [Activate an EdgeWorker version](doc:manage-edgeworkers#activate-a-version).

# **View the Revision details**

Select **CoreSite** on the EdgeWorker IDs page and go to the** Revisions **tab.

> 📘 You can also perform these tasks using the [EdgeWorkers API](ref:get-revisions).

## 1. View the Revision Activations

1. The first revision is automatically generated when you activate a parent EdgeWorker that includes dependencies.
2. In this example, the Revision ID is `1-1` to represent the first Activation and the first Revision for this EdgeWorkers function. The next Activation will generate a Revision ID of `2-1`.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/revisions-v2.png",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


3. To view more details about the revision, click on `1-1` the Revision ID in this example.

<br />

## 2. View the Bill of Materials

Select the **Bill of Materials (BOM)** tab to view the dependency tree for the CoreSite EdgeWorkers function.

The BOM includes the Marketing EdgeWorkers function, and which version was activated. The BOM also shows the version of the top-level EdgeWorker and all of its dependencies. Every Revision ID is associated with a BOM. In this case, the BOM for Revision ID `1-1` shows that it contains version 1 of the parent EdgeWorker and version `1` of the child EdgeWorker `80552`.

For more information, refer to the [Terminology](doc:terminology) section in this guide.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/BOM-v3.jpg",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


## 3. View the Combined Code Bundle

Select the **Combined Code Bundle** tab to view the `main.js` and the `bundle.json` files for each of the EdgeWorkers functions included in the combined code bundle.

The Code Bundle includes the top-level EdgeWorker and all of its transitive dependencies. In this case, that means version `1.0` of the marketing EdgeWorker and `0.2` of the CoreSite EdgeWorker.

For more information, refer to the [Terminology](doc:terminology) section in this guide.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/combinedCodeBundle-v2.png",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]

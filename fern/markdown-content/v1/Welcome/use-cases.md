---
title: "Tutorials"
slug: "use-cases"
excerpt: ""
hidden: false
createdAt: "Fri May 14 2021 17:45:08 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Mar 01 2024 13:47:42 GMT+0000 (Coordinated Universal Time)"
---
The EdgeWorkers service makes it possible for you to deploy JavaScript functions at the edge and create customized experiences for your website visitors. Like most serverless solutions, EdgeWorkers scripts are invoked at the four different [phases of an HTTP request](doc:event-handler-functions). This provides an opportunity to improve performance, by moving compute closer to your users. Using every edge server as a compute node also accelerates your development and deployment times by applying solutions on a massive scale across our entire, globally distributed, Intelligent Edge Platform.

Follow these steps to implement a serverless function, written in JavaScript. To do this, you'll create an EdgeWorkers [code bundle](doc:create-a-code-bundle).

1. [Create an EdgeWorker ID](doc:create-an-edgeworker-id-1).

2. Create a `main.js` file.

   Here are recipes for the JavaScript source code that include event handler functions for some of the most common EdgeWorkers implementations. 

> 👍 You can find more code samples in the [EdgeWorkers GitHub repository](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples). They are practical examples to use as a starting point for your <<COMPANY_NICKNAME>> EdgeWorkers. Feel free to use, modify, and extend!

[block:tutorial-tile]
{
  "backgroundColor": "#018FF4",
  "emoji": "",
  "id": "60da2d5664a35a0029771fe7",
  "link": "https://techdocs.akamai.com/v1/recipes/add-geo-and-custom-data-as-a-cookie",
  "slug": "add-geo-and-custom-data-as-a-cookie",
  "title": "Add geo and custom data as a cookie"
}
[/block]


[block:tutorial-tile]
{
  "backgroundColor": "#018FF4",
  "emoji": "",
  "id": "616970c0f68b0b005cee2f3e",
  "link": "https://techdocs.akamai.com/v1/recipes/boost-search-autocomplete-performance",
  "slug": "boost-search-autocomplete-performance",
  "title": "Boost search autocomplete performance"
}
[/block]


5. Create a `bundle.json` file that contains metadata for the EdgeWorkers function.

6. [Create a code bundle](doc:create-a-code-bundle) to compress the `.main.js` and `bundle.json` files into a `.tgz` file.  
   `tar -czvf filename.tgz main.js bundle.json`

7. Activate the version, see [Manage EdgeWorkers](doc:manage-edgeworkers).

8. Use the [EdgeWorkers CLI](https://github.com/akamai/cli-edgeworkers) to update the results for the most popular search terms via a scheduled task.

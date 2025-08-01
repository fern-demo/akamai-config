---
title: "Tutorials"
slug: "use-cases"
---
The EdgeWorkers service makes it possible for you to deploy JavaScript functions at the edge and create customized experiences for your website visitors. Like most serverless solutions, EdgeWorkers scripts are invoked at the four different [phases of an HTTP request](event-handler-functions.md). This provides an opportunity to improve performance, by moving compute closer to your users. Using every edge server as a compute node also accelerates your development and deployment times by applying solutions on a massive scale across our entire, globally distributed, Intelligent Edge Platform.

Follow these steps to implement a serverless function, written in JavaScript. To do this, you'll create an EdgeWorkers [code bundle](create-a-code-bundle.md).

1. [Create an EdgeWorker ID](create-an-edgeworker-id-1.md).

2. Create a `main.js` file.

   Here are recipes for the JavaScript source code that include event handler functions for some of the most common EdgeWorkers implementations. 

> 👍 You can find more code samples in the [EdgeWorkers GitHub repository](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples). They are practical examples to use as a starting point for your <Markdown src="../../snippets/COMPANY_NICKNAME.mdx" />. Feel free to use, modify, and extend!

3. Refer to the individual tutorials in the use cases section below for detailed implementation examples:
   - [Add geo and custom data as a cookie](https://techdocs.akamai.com/v1/recipes/add-geo-and-custom-data-as-a-cookie)
   - [Boost search autocomplete performance](https://techdocs.akamai.com/v1/recipes/boost-search-autocomplete-performance)


5. Create a `bundle.json` file that contains metadata for the EdgeWorkers function.

6. [Create a code bundle](create-a-code-bundle.md) to compress the `.main.js` and `bundle.json` files into a `.tgz` file.  
   `tar -czvf filename.tgz main.js bundle.json`

7. Activate the version, see [Manage EdgeWorkers](manage-edgeworkers.md).

8. Use the [EdgeWorkers CLI](https://github.com/akamai/cli-edgeworkers) to update the results for the most popular search terms via a scheduled task.

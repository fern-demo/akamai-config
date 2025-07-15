---
title: "Boost search autocomplete performance"
slug: "boost-autocomplete-performance"
excerpt: "Implement EdgeWorkers code to maximize the performance of popular search terms."
hidden: true
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Oct 04 2021 18:08:47 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Jul 14 2023 14:31:40 GMT+0000 (Coordinated Universal Time)"
---
Suggesting relevant search terms while a visitor types in a search box is a common practice on many websites and search engines. It provides a relevant and fast response that is essential for an excellent user experience. 

To do this, you'll create an EdgeWorkers bundle that contains a JSON key-value store with the responses for the most popular terms.

Follow these steps to implement a serverless function, written in JavaScript, that accelerates autocomplete at the Edge.

1. [Create an EdgeWorker ID](doc:create-an-edgeworker-id-1).

2. Create a key value store with labels and values in a file called `searchterms.js`.  
   Format the file as shown. You can download a complete example from [GitHub](https://github.com/akamai/edgeworkers-examples/blob/master/edgeworkers/examples/respond-from-edgeworkers/respondwith/fast-autocomplete/searchterms.js)
   ```
   "red":[{"label":"Red socks (103 results)","value":"cat876"},{"label":"Red shoes (203 results)","value":"cat124"},{"label":"Red shirts (34 results)","value":"cat89"}]
   ```
   This could be a local file, or you can use the [EdgeKV CLI](https://github.com/akamai/cli-edgeworkers/blob/master/docs/edgekv_cli.md) to store the data on the edge network. The local list of terms in this example code uses JSON formats seen in [jQuery UI](https://jqueryui.com/autocomplete/) or [Awesomplete](https://leaverou.github.io/awesomplete/).

3. Create a `main.js` file, the JavaScript source that contains event handler functions.
   ```
   import URLSearchParams from 'url-search-params';  
   import { default as searchterms } from './searchterms.js';
   export function onClientRequest(request){
       const params = new URLSearchParams(request.query);
       const jsonContentType = {'Content-Type':['application/json;charset=utf-8']};
       const searchResult = searchterms[params.get('term').toLowerCase()];
       if(searchResult){
           request.respondWith(200, jsonContentType, JSON.stringify(searchResult));    
       }
   }
   ```
   This EdgeWorkers code takes the `GET` parameter `term=` and looks up the term in the key value store file `searchterms.js`. If a match is found, a 200 status with the serialized JSON response is returned, and when there is no match, the request is forwarded to origin.

4. Create a `bundle.json` file that contains metadata for the EdgeWorker function.
   ```
   {
       "edgeworker-version":"0.1",
       "description":"Reply instantly to most popular search terms from the Edge, unpopular terms go forward to 
   origin."
   }
   ```

5. [Create a code bundle](doc:create-a-code-bundle) to compress the `.main.js` and `bundle.json` files into a `.tgz` file.  
   `tar -czvf filename.tgz main.js bundle.json`

6. Activate the version, see [Manage EdgeWorkers](doc:manage-edgeworkers).

7. Use the [EdgeWorkers CLI](https://github.com/akamai/cli-edgeworkers) to update the results for the most popular search terms via a scheduled task.

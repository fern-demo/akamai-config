---
title: "Store locator"
slug: "store-locator"
---
Many websites provide a search function to help users find nearby locations such as retail stores. Typically, a store locator service is implemented on-premise or at the cloud origin, to search a database to find physical locations near the user. You can improve the performance of this search by executing it in a serverless function at the Edge with EdgeWorkers.

> 📘 Go to the [Akamai Edge Compute demo site](https://www.edgecompute.live/) to see this example in action and to view the underlying code.

# Before you begin

Finding the nearest store requires three key pieces of information:

- The user location expressed as latitude and longitude
- Store locations, including latitude and longitude
- A function to find the closest locations to the user

The first two items are relatively simple. However, writing an efficient function to find the closest locations to the user is deceptively complex. While it sounds easy to calculate the distance of each location from the user and return those with the shortest distance, iterating through hundreds of locations and recalculating distances on every user request is not an efficient use of computing resources.

Instead of determining the distance from every user to every store, you can use [spatial indexing](https://en.wikipedia.org/wiki/Spatial_database#Spatial_index) to arrange location data into a structure that supports efficient searching. While it’s possible to write your own spatial search algorithms, the process is time consuming and requires an in depth understanding of the underlying data structures. 

Fortunately, you don’t need to reinvent the wheel. There is a large library of open-source JavaScript modules available through [npm](https://www.npmjs.com/). Dependencies are then packaged into the EdgeWorker module with rollup. In this article, we will show you how to use `npm` and rollup to include [geokdbush](https://github.com/mourner/geokdbush) and [kdbush](https://github.com/mourner/kdbush), two JavaScript libraries that power fast spatial indexing, and search.

# 1. Install and quickstart

The result of this tutorial is available on GitHub in the [EdgeWorkers Examples Repository](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples).

Follow these steps to view the sample EdgeWorkers project and build the bundle:

1. Install [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/download/), if not already installed.

2. Clone the source code from the Akamai EdgeWorkers Examples Repository.  
   `git clone https://github.com/akamai/edgeworkers-examples.git`

3. Change the directory into the store locator path and install dependencies from the npm.

```shell
cd storelocator
npm install
```

4. Build the EdgeWorkers code bundle with npm.

```shell
npm run build
```

5. Locate the bundle at `dist/storelocator.tgz`.

   Learn more about the [store locator microservice](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples/personalization/storelocator).

# 2. Determine user location

To locate stores that are close to the site visitor, your web application needs to determine where the user is located. The browser’s geolocation API provides a precise location if the user accepts permissions to access it. For consumers who do not, IP-based geolocation can approximate their location, as described in the [Geo-Based Redirect example](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples/traffic-routing/redirect-geo).

# 3. Retrieve store locations

The next set of information required is a list of store locations. Each location must include the latitude, longitude, and any other data necessary for the store locator service to deliver accurate results. You can then encode the data in a JSON object and deploy it with your EdgeWorkers code.

1. Query data from the OpenStreetMap Overpass API to generate a list of locations. For this example, use [Overpass Turbo](https://overpass-turbo.eu/) to search Walmart stores in the U.S. with this query:

```json
[out:json][timeout:2500];
{{geocodeArea:United States of America}}->.searchArea;
(  
  node[brand="Walmart"](area.searchArea);
);
out body;
>;
out skel qt;
```

2. Save the results to a JSON file called `data/locations.json`.  
   You can find an example in the [GitHub repo](https://github.com/akamai/edgeworkers-examples/blob/master/edgecompute/examples/personalization/storelocator/data/locations.json).

# 4. Find the closest stores

Once you know the locations of the users and stores, the final step is to find the closest stores. As mentioned earlier, looping through every store and calculating the distance to each is not going to be fast. 

Instead, you can use a spatial index to arrange location data into a structure that supports efficient searching will speed results. To avoid the time and effort of writing the spatial indexing and search logic, we recommend you use [geokdbush](https://github.com/mourner/geokdbush/blob/master/README.md). Geokdbush is an open source JavaScript library that indexes geographic data in a [k-d tree](https://en.wikipedia.org/wiki/K-d_tree) and implements a fast nearest-neighbor search. For more details on spatial indexing and search algorithms, visit the [R-tree wiki](https://en.wikipedia.org/wiki/R-tree).

# 5. Manage dependencies

1. Execute `npm init` in an empty directory to create an npm project.

2. Change the entry point to `main.js`.

   This creates a `package.json` file that contains the project metadata.

```shell
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (storelocator) 
version: (1.0.0) 
description: Example store locator service using Akamai EdgeWorkers
entry point: (index.js) main.js
test command: 
git repository: 
keywords: 
author: jj@company.com
license: (ISC) Apache-2.0
About to write to /Users/jjs/projects/gss/temp/storelocator/package.json:

{
  "name": "storelocator",
  "version": "1.0.0",
  "description": "Example store locator service using Akamai EdgeWorkers",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "josjohns@akamai.com",
  "license": "Apache-2.0"
}


Is this OK? (yes)
```

3. Install dependency modules.

```shell
$ npm install --save kdbush
$ npm install --save geokdbush
```

 These commands download the `kdbush` and `geokdbush` modules into the `node_modules` directory and update the dependencies in the `package.json` file.

# 6. Add location data

Save the results from the Overpass search to a JSON file, for example,`data/locations.json`. In the next step you'll package the data into an ES module using rollup.

A fragment of the location data is shown here. The full file is available on [GitHub](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples/personalization/storelocator/data).

```json
{
  "version": 0.6,
  "generator": "Overpass API 0.7.56.1002 b121d216",
  "osm3s": {
    "timestamp_osm_base": "2020-04-18T20:41:02Z",
    "timestamp_areas_base": "2020-03-06T11:03:01Z",
    "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
  },
  "elements": [

{
  "type": "node",
  "id": 207731972,
  "lat": 34.8850980,
  "lon": -92.1125500,
  "tags": {
    "addr:city": "Jacksonville",
    "addr:country": "US",
    "addr:full": "2000 John Harden Dr",
    "addr:housenumber": "2000",
    "addr:postcode": "72076",
    "addr:state": "AR",
    "addr:street": "John Harden Drive",
    "brand": "Walmart",
    "brand:wikidata": "Q483551",
    "brand:wikipedia": "en:Walmart",
    "name": "Walmart Supercenter",
    "opening_hours": "24/7",
    "operator": "Walmart",
    "phone": "+1-501-985-8731",
    "ref:walmart": "24",
    "shop": "supermarket",
    "website": "https://www.walmart.com/store/24/jacksonville-ar/whats-new"
  }
},
{
  "type": "node",
  "id": 309761248,
  "lat": 28.5361908,
  "lon": -81.2091148,
  "tags": {
    "addr:city": "Orlando",
    "addr:country": "US",
    "addr:full": "600 S Alafaya Trl",
    "addr:housenumber": "600",
    "addr:postcode": "32828",
    "addr:state": "FL",
    "addr:street": "South Alafaya Trl",
    "brand": "Walmart",
    "name": "Walmart Neighborhood Market",
    "opening_hours": "Mo-Su 06:00-24:00",
    "operator": "Walmart",
    "phone": "+1-407-380-0384",
    "ref": "3617",
    "ref:walmart": "3617",
    "shop": "supermarket",
    "website": "https://www.walmart.com/store/3617/orlando-fl/whats-new"
  }
}
  ]
}
```

# 7. Write and bundle EdgeWorkers code

This code indexes the location data upon initialization of the EdgeWorkers module. On each HTTP request, it will read the latitude and longitude from incoming query string parameters, search the indexed data for the nearest two stores, and respond with the result as a JSON object.

1. Create a JavaScript file called `main.js` that contains this code.

```javascript
import URLSearchParams from 'url-search-params';

import KDBush from 'kdbush';
import geokdbush from 'geokdbush';

import locations from './data/locations.json'

/* Initialize index of locations */
const indexedLocations = new KDBush(locations.elements, (p) => p.lon, (p) => p.lat);

export function onClientRequest(request) {

  /* Extract longitude and latitude from query string */
  const params = new URLSearchParams(request.query);
  const lat = Number(params.get('lat'));
  const lon = Number(params.get('lon'));

  /* Respond with an error if lat or lon are not passed in. */
  if(!lon || !lat){
    request.respondWith(
        400,
        {'Content-Type':['application/json;charset=utf-8']},
        JSON.stringify({error:'lat and lon parameters must be provided'})
      );
      return;
  }
  /* var nearest = geokdbush.around(indexedLocations, -83.259, 42.292, 2); */

  /* Find 2 closest locations */
  let nearest = geokdbush.around(indexedLocations, lon, lat, 2);

  if (!nearest) {
    request.respondWith(
        400,
        {'Content-Type':['application/json;charset=utf-8']},
        JSON.stringify({error:'Error locating nearby locations. lat:${lat}, lon:${lon}'})
      );
      return;
  }

  let result = [];
  for (var i = 0; i &lt; nearest.length; i++) {
    let location = nearest[i];
    /* calculate distance and convert to miles */
    let distance = geokdbush.distance(lon, lat, location.lon, location.lat) / 1.609;
    /* add distance and location to the result */
    result.push ({distance: distance, location: location})
  }

  /* Respond with json result containing nearest locations */
  request.respondWith(
      200,
      {'Content-Type':['application/json;charset=utf-8']},
      JSON.stringify(result, null, 2));
}
```

2. Create a `bundle.json` file.  
   This is a manifest that contains the version and description of the EdgeWorker.

```json
{
    "edgeworker-version": "0.1",
    "description" : "Returns the closest store locations to the provided latitude and longitude"
}
```

3. Bundle the module.  
   This command installs rollup into the project as a development dependency.

```shell
$ npm install rollup --save-dev
```

4. Install rollup plug-in modules.

```shell
# Allow referencing json data file as an ES module
$ npm install --save-dev rollup-plugin-json
# Provide the ability for rollup to resolve node modules
$ npm install --save-dev @rollup/plugin-node-resolve
# Wrap commonjs modules into an ES module
$ npm install --save-dev @rollup/plugin-commonjs
# copy additional asset files
$ npm install --save-dev rollup-plugin-copy-assets
```

5. Create a `rollup.config.js` file that contains the configuration options for rollup.

```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from "rollup-plugin-copy-assets";
import json from 'rollup-plugin-json';

export default {
/* Specify main file for EdgeWorker */
input: 'main.js',

/* Define external modules, which will be provided by the EdgeWorker platform */
external: ['url-search-params'],

/* Define output format as an ES module and specify the output directory */
output: {
format: 'es',
dir: "dist/work"
},

/* Bundle all modules into a single output module */
preserveModules: false,
plugins: [

/* Convert CommonJS modules to ES6 */
commonjs(),

/* Resolve modules from node_modules */
resolve(),

/* Copy bundle.json to the output directory */
copy({
assets: [
"bundle.json",
]
}),

/* Package json data as an ES6 module */
json()
]
};
```

6. Execute `rollup -c` from the command line to bundle the EdgeWorker module and associated files into the `dist/work` directory.

7. Add a build script in the `package.json` file to execute rollup and build the `.tgz` file.

```json
...,
"scripts": {
    "build": "rollup -c && cd dist/work && tar -czvf ../storelocator.tgz *"    
},
...
```

8. Issue this command to build the EdgeWorkers code bundle.

```shell
$ npm run build

> storelocator@1.0.0 build /Users/jjs/projects/gss/temp/storelocator
> rollup -c && cd dist/work && tar -czvf ../storelocator.tgz *

main.js → dist/work...
created dist/work in 459ms
a bundle.json
a main.js
```

Once you've created the `.tgz`, you can upload and deploy it. Learn more about how to [Manage EdgeWorkers](manage-edgeworkers.md).

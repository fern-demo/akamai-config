---
title: "Manifest and Playlist Manipulation"
slug: "manifest-and-playlist-personalization"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Thu Apr 06 2023 16:05:06 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Aug 01 2023 16:30:34 GMT+0000 (Coordinated Universal Time)"
---
Learn how to use an EdgeWorkers function to dynamically create personalized Video on Demand (VOD) or live manifest and playlist files. You can implement these use cases without incurring additional compute costs or making changes to the origin.

# Before you begin

We recommend that you select the [Dynamic Compute resource tier](doc:select-a-resource-tier) when creating the EdgeWorker ID for this tutorial. Dynamic Compute provides higher consumption limits that may be necessary for the playlist or manifest file.

> 👍 The complete code sample for this tutorial is available in the [GitHub repo](https://github.com/akamai/edgeworkers-examples/tree/master/delivery/media).

EdgeWorkers supports HTTP Live Streaming (HLS) playlist and Dynamic Adaptive Streaming over HTTP (DASH) manifest files. You can configure personalization based on parameters such as:

- [Device type](doc:device-object)
- [User geography](doc:user-location-object)
- [Request headers](doc:request-object)
- Query strings specified in each use case

> 📘 These examples use the HLS Parser module. You can also use the DASH Parser module to configure video streaming examples.

# 1. Filter bitrates

Bitrate Filtering lets you define query parameters to filter-in specific bitrates in the playlist file. 

> 👍 The playlist file expresses bitrates (bps), in multiples of 100,000.

## Filter-in bitrate

You can use the `br_in` parameter to filter-in a list of bitrates.

   Bitrate Filtering uses a default tolerance of ±100,000 bps for comparisons. A parameter value of 2200000 bps will match any bitrate value within [2100000, 2300000] such as, 2185000.

1. Import the [HLS parser](doc:hls-parser)  module into your EdgeWorkers code.

   Refer to the instructions in [Import a JavaScript module](doc:import-a-javascript-module) for more information.

   The HLS parser module exports the [`Manifest Parsing` ](doc:hls-parser#manifest-parsing) helper functions.

2. Refer to the EdgeWorkers `main.js` file below for details on how to configure bit-rate filtering.

```javascript main.js
import { HLS } from ‘hls.js’
import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';
import URLSearchParams from "url-search-params";

const UNSAFE_RESPONSE_HEADERS = ['content-length', 'transfer-encoding', 'connection', 'vary',
  'accept-encoding', 'content-encoding', 'keep-alive',
  'proxy-authenticate', 'proxy-authorization', 'te', 'trailers', 'upgrade','host'];

function getSafeResponseHeaders(headers) {
  for (let unsafeResponseHeader of UNSAFE_RESPONSE_HEADERS) {
    if (unsafeResponseHeader in headers) {
      delete headers[unsafeResponseHeader];
    }
  }
  return headers;
}

export async function responseProvider (request) {
    //fetch the original playlist
    const response = await httpRequest(`${request.scheme}://${request.host}${request.path}`);
    const textManifest = await response.text();
    let QP = new URLSearchParams(request.query);
  
    // parse requested manifest
    let playlistObject = HLS.parseManifest(textManifest);
   
    // modify requested manifest as per request parameters
    if (QP.has('br_in')) {
      const br_in = QP.get('br_in')
      // parse value of br_in & assign it to bitrates
      let bitrates = br_in.split(',');
      HLS.preserveVariantsByBitrate(playlistObject, bitrates, hls.Tolerance.DEFAULT);
    }
 
    // populate personalized manifest
    const modifiedManifest = HLS.stringifyManifest(playlistObject);
    
    return createResponse(
      response.status,
      //return only safe response headers
      getSafeResponseHeaders(response.getHeaders()),
      modifiedManifest
    );
}
```

2. Here's the original playlist file before the `br_in=200000` parameter is applied. 

```text Original playlist file
br_in=200000

#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=100000,RESOLUTION=416x234,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/low/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=200000,RESOLUTION=416x234,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/lo_mid/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=300000,RESOLUTION=416x234,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/hi_mid/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=400000,RESOLUTION=640x360,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/high/index.m3u8
```

3. Here's the personalized playlist. The updated playlist includes the bandwidths between 100000 - 300000. The bitrate of 400000 has been removed.

```text Personalized playlist file
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=100000,RESOLUTION=416x234,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/low/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=200000,RESOLUTION=416x234,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/lo_mid/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=300000,RESOLUTION=416x234,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/hi_mid/index.m3u8
```

## Filter-in bitrate range

You can use the `br_in_range` parameter to filter-in a range of bitrates.

A tolerance of ±100,000 bps does not apply to `br_in_range`. Thus, a value with a `br_in_range` parameter directly filters in the ranges of bitrates of interest.

> 👍 Bitrate filtering using `br_in_range` also lets you omit the lower or upper bound. 
> 
> - `br_in_range=1800000-` is inferred as `br_in_range=1800000-Number.MAX_VALUE`.
> - `br_in_range=-4200000` is inferred as `br_in_range=0-4200000`.

1. Import the [HLS parser](doc:hls-parser) module into your EdgeWorkers code.

   Refer to the instructions in [Import a JavaScript module](doc:import-a-javascript-module) for more information.

   The HLS parser module exports the [`Manifest Parsing` ](doc:hls-parser#manifest-parsing) helper functions.

2. Refer to the EdgeWorkers `main.js` file below for details on how to configure bit-rate range filtering.

```javascript main.js
import { HLS } from ‘hls.js’
import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';
import URLSearchParams from "url-search-params";

const UNSAFE_RESPONSE_HEADERS = ['content-length', 'transfer-encoding', 'connection', 'vary',
  'accept-encoding', 'content-encoding', 'keep-alive',
  'proxy-authenticate', 'proxy-authorization', 'te', 'trailers', 'upgrade','host'];

function getSafeResponseHeaders(headers) {
  for (let unsafeResponseHeader of UNSAFE_RESPONSE_HEADERS) {
    if (unsafeResponseHeader in headers) {
      delete headers[unsafeResponseHeader];
    }
  }
  return headers;
}
 
export async function responseProvider (request) {
  
    const response = await httpRequest(`${request.scheme}://${request.host}${request.path}`);
    const textManifest = await response.text();
    let QP = new URLSearchParams(request.query);
  
    // parse requested manifest
    let playlistObject = HLS.parseManifest(textManifest);
     
    // modify requested manifest as per request parameters
    if (QP.has('br_in_range')) {
      const br_in_range = QP.get('br_in_range')
      // parse value of br_in_range & assign it to bitrates
      let bitrates = br_in_range.split(',');
      HLS.preserveVariantsByBitrate(playlistObject, bitrates, hls.Tolerance.DEFAULT);
    }
 
    // populate personalized manifest
    const modifiedManifest = HLS.stringifyManifest(playlistObject);
    
    return createResponse(
      response.status,
      //return only safe response headers
      getSafeResponseHeaders(response.getHeaders()),
      modifiedManifest
    );
}
```

2. Here's the original playlist file before the `br_in_range` parameter is applied.

```text Original playlist file
br_in_range=2200000-4500000

#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=1500000,RESOLUTION=416x234,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/low/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2400000,RESOLUTION=416x234,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/lo_mid/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=4400000,RESOLUTION=416x234,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/hi_mid/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=6400000,RESOLUTION=640x360,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/high/index.m3u8
```

3. Here's the personalized playlist file. The playlist now includes only bitrates between 2200000-4500000.

```text Personalized manifest file
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=2400000,RESOLUTION=416x234,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/lo_mid/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=4400000,RESOLUTION=416x234,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/hi_mid/index.m3u8
```

> 🚧 Bitrate Filtering can result in an empty playlist or manifest file. This can occur, for example, when all the bitrates present in the playlist or manifest are removed due to bad input. The EdgeWorkers function does not perform any checks to mitigate or avoid this scenario.

# 2. Filter resolutions

You can use the [Device Object](doc:device-object) properties to filter the list of resolutions in the playlist. This example removes all resolutions higher than the maximum supported resolution of the requesting device.

1. Get the device resolution using the [Device Object](doc:device-object) properties.

   You can find the maximum supported resolution of a device in the `request.device.resolutionWidth` x `request.device.resolutionHeight` attributes of the `request.device Object`.

2. Import the [HLS parser](doc:hls-parser) module into your EdgeWorkers code.

   Refer to the instructions in [Import a JavaScript module](doc:import-a-javascript-module) for more information.

   The HLS parser module exports the [`Manifest Parsing`](doc:hls-parser#manifest-parsing) helper functions.

3. Refer to the EdgeWorkers `main.js` file below for details on how to configure resolution filtering.

```javascript main.js
import { HLS } from ‘hls.js’
import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';

const UNSAFE_RESPONSE_HEADERS = ['content-length', 'transfer-encoding', 'connection', 'vary',
  'accept-encoding', 'content-encoding', 'keep-alive',
  'proxy-authenticate', 'proxy-authorization', 'te', 'trailers', 'upgrade','host'];

function getSafeResponseHeaders(headers) {
  for (let unsafeResponseHeader of UNSAFE_RESPONSE_HEADERS) {
    if (unsafeResponseHeader in headers) {
      delete headers[unsafeResponseHeader];
    }
  }
  return headers;
}

export async function responseProvider (request) {
  
    const response = await httpRequest(`${request.scheme}://${request.host}${request.path}`);
    const textManifest = await response.text();
    
    // parse requested manifest
    let playlistObject = HLS.parseManifest(textManifest);
    
    let resolution;
    // get max supported resolution from request.device object
    if (request.device.resolutionWidth && request.device.resolutionHeight) {
     	 resolution = request.device.resolutionWidth + 'x' + request.device.resolutionHeight
    } else {
      	//default max resolution
     	 resolution = '1920x1080'
    }
    HLS.preserveVariantsByResolution(playlistObject, resolution);
 
     // populate personalized manifest
    const modifiedManifest = HLS.stringifyManifest(playlistObject);
    
    return createResponse(
      response.status,
      //return only safe response headers
      getSafeResponseHeaders(response.getHeaders()),
      modifiedManifest
    );
}
```

2. Here's the playlist file before using the device resolution to filter the device resolutions.

```text Original manifest file
request.device.resolutionWidth = 1280
request.device.resolutionHeight = 720

#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=1500000,RESOLUTION=1280x720,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/low/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2400000,RESOLUTION=640x480,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/lo_mid/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=4400000,RESOLUTION=1920x1080,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/hi_mid/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=6400000,RESOLUTION=2048x1152,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/high/index.m3u8
```

3. Here's the personalized playlist file. The playlist file now only includes the supported resolutions. The resolution filtering preserved all resolutions less than 1280x720. It removed all higher resolutions unsupported by the device.

```text Personalized playlist file
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=1500000,RESOLUTION=1280x720,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/low/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2400000,RESOLUTION=640x480,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/lo_mid/index.m3u8
```

Since Resolution is an optional but recommended attribute, if not found in the playlist, this operation is not performed.

# 3. Re-order resolutions

You can use the `rs_order` parameter to prioritize the preferred resolutions by placing them at the top of the list. The format for this parameter is, `rs_order=<width>x<height>[,<width>x<height>]+,`

> 📘 Resolution re-ordering is only supported for HLS playlist files.

1. Import the [HLS parser](doc:hls-parser) module into your EdgeWorkers code.

   Refer to the instructions in [Import a JavaScript module](doc:import-a-javascript-module) for more information.

    The HLS parser module exports the [`Manifest Parsing`](doc:hls-parser#manifest-parsing) helper functions.

2. Refer to the EdgeWorkers `main.js` file below for details on how to configure resolution re-ordering.

```javascript main.js
import { HLS } from ‘hls.js’
import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';
import URLSearchParams from "url-search-params";

const UNSAFE_RESPONSE_HEADERS = ['content-length', 'transfer-encoding', 'connection', 'vary',
  'accept-encoding', 'content-encoding', 'keep-alive',
  'proxy-authenticate', 'proxy-authorization', 'te', 'trailers', 'upgrade','host'];

function getSafeResponseHeaders(headers) {
  for (let unsafeResponseHeader of UNSAFE_RESPONSE_HEADERS) {
    if (unsafeResponseHeader in headers) {
      delete headers[unsafeResponseHeader];
    }
  }
  return headers;
}
 
export async function responseProvider (request) {
  
    const response = await httpRequest(`${request.scheme}://${request.host}${request.path}`);
    const textManifest = await response.text();
    let QP = new URLSearchParams(request.query);
  
    // parse requested manifest
    let playlistObject = HLS.parseManifest(textManifest);
     
    // modify requested manifest as per request parameters
    if (QP.has('rs_order')) {
        const rs_order = QP.get('rs_order')
        // parse values of rs_order(i.e 1280x720,640x360) & assign it to resArray
        let resArray = rs_order.split(',');
        HLS.updateVariantsAtIndex(playlistObject, resArray);
    }
 
    // populate personalized manifest
    const modifiedManifest = HLS.stringifyManifest(playlistObject);
    
    return createResponse(
      response.status,
      //return only safe response headers
      getSafeResponseHeaders(response.getHeaders()),
      modifiedManifest
    );
}
```

3. Here's the playlist file before using the `rs_order` parameter to re-order the resolutions.

```text Original playlist file
rs_order=1280x720,640x360

#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=1500000,RESOLUTION=960x540,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/low/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2400000,RESOLUTION=1280x720,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/lo_mid/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=4400000,RESOLUTION=640x360,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/hi_mid/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=6400000,RESOLUTION=416x234,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/high/index.m3u8
```

4. Here's the personalized playlist file. The resolutions now appear in order of priority. The 1280x720 resolution has higher priority than 640x360. In the output, 1280x720 will come first, then 640x360 and then any other resolutions are pushed down the list in the existing order.

```text Personalized manifest file
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=2400000,RESOLUTION=1280x720,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/lo_mid/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=4400000,RESOLUTION=640x360,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/hi_mid/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1500000,RESOLUTION=960x540,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/low/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=6400000,RESOLUTION=416x234,CODECS="avc1.42e00a,mp4a.40.2"
http://example.com/high/index.m3u8
```

> 📘 Since Resolution is an optional but recommended attribute, if not found in the manifest, this operation is not performed.

# 4. Localize language

Language localization lets you use [User Location](doc:user-location-object) properties to filter subtitles and audio tracks in the playlist or manifest file based on language. The User Location properties provide information about the geographic location of the requesting device and includes the:

- [city](doc:user-location-object#city)
- [continent](doc:user-location-object#continent)
- [country](doc:user-location-object#country)
- [region](doc:user-location-object#region)
- [zipCode](doc:user-location-object#zipcode) 

> 📘 Closed captions are not currently supported for language localization.

1. Get the [user location](doc:user-location-object) of the request.  
   In this example, the request originates from a device in Paris, France. The following details are part of the request's User Location properties. 

   ```
   `request.userLocation.city = Paris`
   `request.userLocation.continent = EU`
   `request.userLocation.country = FR`
   ```

 To remove all audio and subtitle details from the playlist except for French you can use the  
`lo_geo=[fr]` parameter.

2. Import the [HLS parser](doc:hls-parser) module into your EdgeWorkers code.

   Refer to the instructions in [Import a JavaScript module](doc:import-a-javascript-module) for more information.

   The HLS parser module exports the [`Manifest Parsing`](doc:hls-parser#manifest-parsing) helper functions.

3. Refer to the EdgeWorkers `main.js` file below for details on how to configure language localization.

```javascript main.js
import { HLS } from ‘hls.js’
import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';

const UNSAFE_RESPONSE_HEADERS = ['content-length', 'transfer-encoding', 'connection', 'vary',
  'accept-encoding', 'content-encoding', 'keep-alive',
  'proxy-authenticate', 'proxy-authorization', 'te', 'trailers', 'upgrade','host'];

function getSafeResponseHeaders(headers) {
  for (let unsafeResponseHeader of UNSAFE_RESPONSE_HEADERS) {
    if (unsafeResponseHeader in headers) {
      delete headers[unsafeResponseHeader];
    }
  }
  return headers;
}

export async function responseProvider (request) {
    
    const response = await httpRequest(`${request.scheme}://${request.host}${request.path}`);
    const textManifest = await response.text();
  
    // parse requested manifest
    let playlistObject = HLS.parseManifest(textManifest);
     
    // get language to localize the manifest using User Location Object
    let language = request.userLocation.country.toLowerCase();
  	if (!language) {
    	language = 'fr'
    }
    // filter audio and subtitle as per languages
  	HLS.preserveAudioRenditionsByLanguage(playlistObject, [language]);
    HLS.preserveSubtitleRenditionsByLanguage(playlistObject, [language]);
    
    // populate personalized manifest
    const modifiedManifest = HLS.stringifyManifest(playlistObject);
    
    return createResponse(
      response.status,
      //return only safe response headers
      getSafeResponseHeaders(response.getHeaders()),
      modifiedManifest
    );
}
```

4. Here's an example of the contents of the playlist file before localization.

```text Original playlist file
languages = ['fr']

#EXTM3U
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="AAC group",LANGUAGE="eng",NAME="English",AUTOSELECT=YES,\ DEFAULT=YES,URI="eng1/aac-en.m3u8"
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="AAC group",LANGUAGE="fre",NAME="français",AUTOSELECT=YES,\ DEFAULT=NO,URI="fr1/aac-fr.m3u8"
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="DD group",LANGUAGE="eng",NAME="English",AUTOSELECT=YES,\ DEFAULT=YES,URI="eng2/dd-en.m3u8"
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="DD group",LANGUAGE="fr",NAME="français",AUTOSELECT=YES,\ DEFAULT=NO,URI="fr2/dd-fr.m3u8"
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",LANGUAGE="eng",NAME="English",
DEFAULT=YES,AUTOSELECT=YES,FORCED=NO,URI="sub-en.m3u8"
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",LANGUAGE="fra",NAME="French",
DEFAULT=YES,AUTOSELECT=YES,FORCED=NO,URI="sub-fr.m3u8"
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=195023,CODECS="avc1.42e00a,mp4a.40.2",AUDIO="AAC group"
lo/prog-index.m3u8,SUBTITLES="subs",URI="curling-hi.m3u8"
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=591680,CODECS="avc1.42e01e,mp4a.40.2",AUDIO="DD group"
hi/prog-index.m3u8,URI="curling-lo.m3u8"
```

5. Here's the personalized playlist file. The playlist file now only includes French audio and subtitle details.

```text Personalized playlist file
#EXTM3U
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="AAC group",LANGUAGE="fre",NAME="français",AUTOSELECT=YES,\ DEFAULT=NO,URI="fr1/aac-fr.m3u8"
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="DD group",LANGUAGE="fr",NAME="français",AUTOSELECT=YES,\ DEFAULT=NO,URI="fr2/dd-fr.m3u8"
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",LANGUAGE="fra",NAME="French",
DEFAULT=YES,AUTOSELECT=YES,FORCED=NO,URI="sub-fr.m3u8"
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=195023,CODECS="avc1.42e00a,mp4a.40.2",AUDIO="AAC group"
lo/prog-index.m3u8,SUBTITLES="subs",URI="curling-hi.m3u8"
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=591680,CODECS="avc1.42e01e,mp4a.40.2",AUDIO="DD group"
hi/prog-index.m3u8,URI="curling-lo.m3u8"
```

> 📘 Filtering by language is case sensitive. It is performed on the LANGUAGE attribute for each audio and subtitle rendition from the master playlist.
> 
> If you specify an unknown string value such as, `languages = [' ']` it can remove all audio or subtitle renditions. This is because `[' ']` is not present in the master playlist. As the function attempts to preserve the audio and subtitles with `languages = [' ']` it removes all existing audio or subtitle renditions.

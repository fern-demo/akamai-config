---
title: "Content insertion"
slug: "content-insertion"
---
Learn how to create an EdgeWorkers function that dynamically adds auxiliary media content to an existing Video on Demand (VOD) asset. For advertising, branding, and distribution personalization it's useful to be able to dynamically insert content into an existing asset. This example uses the HLS Parser module. You can also use the DASH Parser module to configure content insertion.

# Before you begin

We recommend that you select the [Dynamic Compute resource tier](doc:select-a-resource-tier) when creating the EdgeWorker ID for this tutorial. Dynamic Compute provides higher consumption limits that may be necessary to add auxiliary media content to an existing VOD asset.

> 👍 The complete code sample for this example is available in the [GitHub repo](https://github.com/akamai/edgeworkers-examples/tree/master/delivery/media).

EdgeKV is not currently supported. Development is underway so that auxiliary media content playlists can be stored in an [EdgeKV](https://techdocs.akamai.com/edgekv/docs) database. These auxiliary manifests will be available to retrieve from EdgeKV using a request parameter as a key in an EdgeWorkers function.

> 📘 EdgeWorkers is supported on both the [Enhanced TLS  and Standard TLS](https://techdocs.akamai.com/property-mgr/docs/prepare-your-edge-certificates#understand-the-levels-of-security) delivery methods.

> 📘 This example only applies to VOD assets.

# 1. Import the HLS parser

To configure  content insertion import the [HLS parser](doc:hls-parser) module into your `main.js` file.

Refer to the instructions in [Import a JavaScript module](doc:import-a-javascript-module) for more information.

The HLS parser module exports the [`insertAuxiliaryContent`](doc:hls-parser#insertauxiliarycontent) function. You can use it to insert segments from the auxiliary content to the primary media playlist at the specified duration.

# 2. Place the auxiliary content in the timeline

1. You can use the following values to specify the position of the inserted content:

   - **Pre-roll**: Use 0 to add auxiliary content before the primary content.
   - **Mid-roll**: Use any positive value (x) to add auxiliary content after x number of seconds.
   - **Post-roll**: Use `MAX_VALUE` to add auxiliary content at the end of the primary playback.

> 📘 Auxiliary content is considered a discontinuity in the playlist. Each discontinuity is enclosed inside the `EXT-X-DISCONTINUITY` HLS tag.

2. This code sample demonstrates how to use the `insertAuxiliaryContent` function from the [HLS parser](doc:hls-parser) to perform content insertion.

```javascript main.js
import { hls } from './hls.js';
import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';
import URLSearchParams from "url-search-params";
 
export function responseProvider (request) {
    let bumperList = [];
    let keyValuePairs = new URLSearchParams(request.query);
     
    const primaryResponse = await httpRequest(`${request.scheme}://${request.host}${request.path}`);
    const primaryResponseBody = await primaryResponse.text();
    let primaryResponseBodyObject = hls.parseManifest(primaryResponseBody);
 
    // request ad1 playlist if required to be added & insert it into bumperList having bumper objects
    let bumper1RequestUrl; let bumper1Response; let bumper1ResponseBody; let bumper1ResponseBodyObject;
    if (keyValuePairs.has('ad1') === true) {
        bumper1RequestUrl = `${request.scheme}://${request.host}/hls-clear/rkalra/bumper/ad1/ad1_720p.m3u8?cns=1`;
        bumper1Response = await httpRequest(bumper1RequestUrl);
        bumper1ResponseBody = await bumper1Response.text();
        bumper1ResponseBodyObject = hls.parseManifest(bumper1ResponseBody);
        const bumper = {auxiliaryPlaylist: bumper1ResponseBodyObject, afterSeconds: keyValuePairs.get('ad1')};
        bumperList.push(bumper);
    }
 
    // request ad2 playlist if required to be added & insert it into bumperList having bumper objects
    let bumper2RequestUrl; let bumper2Response; let bumper2ResponseBody; let bumper2ResponseBodyObject;
    if (keyValuePairs.has('ad2') === true) {
        bumper2RequestUrl = `${request.scheme}://${request.host}/hls-clear/rkalra/bumper/ad2/ad2_720p.m3u8?cns=1`;
        bumper2Response = await httpRequest(bumper2RequestUrl);
        bumper2ResponseBody = await bumper2Response.text();
        bumper2ResponseBodyObject = hls.parseManifest(bumper2ResponseBody);
        const bumper = {auxiliaryPlaylist: bumper2ResponseBodyObject, afterSeconds: keyValuePairs.get('ad2')};
        bumperList.push(bumper);
    }
 
    hls.insertAuxiliaryContent(primaryResponseBodyObject, bumperList);
    const modifiedResponseBody = hls.populateManifest(primaryResponseBodyObject);
 
    return createResponse(
        primaryResponse.status,
        primaryResponse.headers,
        modifiedResponseBody
    );
}
```

3. Here's the primary playlist.

```text Primary playlist
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:2
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-PLAYLIST-TYPE:VOD
#EXTINF:2.002000,
720p_000.ts
#EXTINF:2.002000,
720p_001.ts
#EXTINF:2.002000,
720p_002.ts
#EXTINF:2.002000,
720p_003.ts
#EXTINF:2.002000,
720p_004.ts
#EXTINF:2.002000,
720p_005.ts
#EXTINF:2.002000,
720p_006.ts
#EXTINF:2.002000,
720p_007.ts
#EXTINF:2.002000,
720p_008.ts
#EXTINF:2.002000,
720p_009.ts
#EXTINF:2.002000,
720p_010.ts
#EXTINF:2.002000,
720p_011.ts
#EXT-X-ENDLIST
```

4. Here's the sample playlist for Advertisement 1 that the customer would like to PRE ROLL (afterSeconds=0).

```text Ad1 playlist
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:2
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-PLAYLIST-TYPE:VOD
#EXTINF:2.002000,
../ad1/ad1_720p_000.ts
#EXTINF:1.920000,
../ad1/ad1_720p_001.ts
#EXTINF:1.920000,
../ad1/ad1_720p_002.ts
#EXTINF:1.920000,
../ad1/ad1_720p_003.ts
#EXTINF:1.920000,
../ad1/ad1_720p_004.ts
#EXTINF:1.920000,
../ad1/ad1_720p_005.ts
#EXTINF:1.920000,
../ad1/ad1_720p_006.ts
#EXTINF:1.920000,
../ad1/ad1_720p_007.ts
#EXTINF:1.920000,
../ad1/ad1_720p_008.ts
#EXTINF:0.800000,
../ad1/ad1_720p_009.ts
#EXT-X-ENDLIST
```

5. Here's the sample playlist for Advertisement 2 that the customer would like to POST ROLL (afterSeconds=Number.MAX_VALUE).

```text Ad2 playlist
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:2
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-PLAYLIST-TYPE:VOD
#EXTINF:2.002000,
../ad2/ad2_720p_000.ts
#EXTINF:1.920000,
../ad2/ad2_720p_001.ts
#EXTINF:1.920000,
../ad2/ad2_720p_002.ts
#EXTINF:1.920000,
../ad2/ad2_720p_003.ts
#EXTINF:1.920000,
../ad2/ad2_720p_004.ts
#EXTINF:1.920000,
../ad2/ad2_720p_005.ts
#EXTINF:1.920000,
../ad2/ad2_720p_006.ts
#EXTINF:1.920000,
../ad2/ad2_720p_007.ts
#EXTINF:1.920000,
../ad2/ad2_720p_008.ts
#EXTINF:0.800000,
../ad2/ad2_720p_009.ts
#EXT-X-ENDLIST
```

6. Here's the modified playlist.

```text Modified playlist
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:2
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-PLAYLIST-TYPE:VOD
#EXTINF:2.002000,
../ad1/ad1_720p_000.ts
#EXTINF:1.920000,
../ad1/ad1_720p_001.ts
...
...
../ad1/ad1_720p_009.ts
#EXT-X-DISCONTINUITY
#EXTINF:2.002000,
720p_000.ts
#EXTINF:2.002000,
720p_001.ts
#EXTINF:2.002000,
720p_003.ts
...
...
 #EXTINF:2.002000,
720p_010.ts
#EXTINF:2.002000,
720p_011.ts
#EXT-X-DISCONTINUITY
#EXTINF:2.002000,
../ad2/ad2_720p_000.ts
#EXTINF:1.920000,
../ad2/ad2_720p_001.ts
...
...
#EXTINF:1.920000,
../ad2/ad2_720p_008.ts
#EXTINF:0.800000,
../ad2/ad2_720p_009.ts


#EXT-X-ENDLIST
```

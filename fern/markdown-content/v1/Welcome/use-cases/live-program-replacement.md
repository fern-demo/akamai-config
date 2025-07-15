---
title: "Live program replacement"
slug: "live-program-replacement"
excerpt: ""
hidden: false
createdAt: "Fri Apr 07 2023 15:10:25 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Sep 03 2024 11:25:34 GMT+0000 (Coordinated Universal Time)"
---
This example demonstrates how to use an EdgeWorkers function to dynamically replace a **live stream** with a **blackout slate** during a specific time period and within specific geolocations. With live sporting events it's sometimes necessary to blackout a channel due to regional rights or league specific rules.

# Before you begin

We recommend that you select the [Dynamic Compute resource tier](doc:select-a-resource-tier) when creating the EdgeWorker ID for this tutorial. Dynamic Compute provides higher consumption limits that may be necessary to perform program replacement.

> 👍 The complete code sample for this example is available in the [GitHub repo](https://github.com/akamai/edgeworkers-examples/tree/master/delivery/media).

> 📘 This example is only applicable the HLS Parser module. Live program replacement for DASH manifests is not yet supported.

## About blackout slates

For more detailed information about blackout slates refer to the [HLS parser](doc:hls-parser) section in this guide. A blackout slate has its own child playlists and segments that adhere to the parent stream's encoding profile such as bitrates, resolutions, and segment duration as the original content. There should be one policy per live stream that contains a list of blackout events coded as tuples such as geo, interval, and url. 

- The origin needs to contain the blackout slate playlists.
- The blackout child playlists must be less than 128 KB.
- A live media playlist should contain at least one `EXT-X-PROGRAM-DATE-TIME` tag for the first sample of a  
  Media Segment with an absolute date and time.

## EdgeKV support

[EdgeKV](https://techdocs.akamai.com/edgekv/docs) is not currently supported. Development efforts are underway to let you use an EdgeKV database to:

- Store policies that contain lists of blackout events. 
- Filter the applicable policies based on [User Location Object](doc:user-location-object) properties. 
- Use the stream URL as the key in the EdgeKV data model. 

> 📘 EdgeWorkers is supported on both the [Enhanced TLS  and Standard TLS](https://techdocs.akamai.com/property-mgr/docs/prepare-your-edge-certificates#understand-the-levels-of-security) delivery methods.

# 1. Import the HLS parser

1. To configure live program replacement, import the [HLS parser](doc:hls-parser) module into your `main.js` file.

   Refer to the instructions in [Import a JavaScript module](doc:import-a-javascript-module) for more information.

   The HLS parser module includes the [`LiveManifestTransformer`](doc:hls-parser#livemanifesttransformer) helper class. You can use it to insert data such as start-time, end-time, and alternative content or a URL.

# 2. Specify the blackout slate

1. Specify the details of the blackout slate using these parameters.

- **startDate** in ISO 8601 format, representing the start date of the replacement window. 
- **endDate** in ISO 8601 format, representing the end date of the replacement window.
- **content** is the blackout playlist that is used to replace the media segment URI. If a URL is passed, the HLS parser makes a sub-request to fetch the blackout slate content.
- Additionally, you can also specify a geolocation using the [User Location](doc:user-location-object) properties. The media playlist request from the player contains the User Location properties. You can configure the EdgeWorkers function to filter the applicable policy data based on a user's location.

> 📘 All media segments that occur during the specified time replacement window are replaced with blackout segments.

2. The EdgeWorkers function makes a sub-request for the original media playlist and on the response does the following:

- Gets complete original media and converts bytes to UTF-8.
- Invokes the necessary helper functions for the `LiveManifestTransformer` class to perform blackout slate replacements.
- Checks for any applicable blackout intervals at `EXT-X-PROGRAM-DATE-TIME`. For example, policy start-time `<= EXT-X-PROGRAM-DATE-TIME <= policy end-time`. If so, replaces the original content segment with a content segment from the policy.  
- Repeats the segment replacement process until the `EXT-X-PROGRAM-DATE-TIME` for the original content segment is not in range of the start-time and end-time. 

3. The above logic executes whenever the player reloads a live media playlist.

4. This code sample demonstrates the usage of the `LiveManifestTransformer` class from the [HLS parser](doc:hls-parser). 

> 📘 In the below example, the video and audio policies are hardcoded. You can, however, load the policies from Property Manager using a user defined variable. 
> 
> Refer [Request.getVariable()](https://techdocs.akamai.com/edgeworkers/docs/request-object#getvariable) to learn how to read the value of a Property Manager user-defined variable in your EdgeWorkers code.

```javascript main.js
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
 
// Policy structure accepted by LiveManifestTransformer class
/**
 * [{
      startDate: 'ISO 8601 date',
      endDate:  'ISO 8601 date',
      content:  'URL or blackout slate playlist as valid m3u8 content in utf8 encoded'
    }];
 */
// Example
/**
 * [{
      startDate: '2022-06-26T08:37:31.553+01:00',
      endDate:  '2022-06-26T08:37:37.553+01:00'),
      content:  'https://<domain>/Slate/Slate734s/Playlist_320x180.m3u8'
    },
    { startDate: '2022-06-26T08:37:15.553+01:00',
      endDate:   '2022-06-26T08:37:23.553+01:00',
      content:  '#EXTM3U\n#EXT-X-VERSION:6\n#EXT-X-TARGETDURATION:3...'
    }];
 */
 
import { createResponse } from 'create-response';
import { httpRequest } from 'http-request';
import { logger } from 'log';
import { TextDecoderStream, TextEncoderStream } from 'text-encode-transform';
import { TransformStream } from 'streams';
import { LiveManifestTransformer} from './hls.js';
 
const startDate = '2022-08-17T15:07:30.000Z';
const endDate = '2022-08-17T15:07:50.000Z';
 
// In this example the video policy is hardcoded.
//You can also load the policy from EdgeKV or Property Manager and filterthe applicable policy based on the User Location Object.
const videoPolicy = [{
  "startDate": startDate,
  "endDate": endDate,
  "content":  `#EXTM3U
  #EXT-X-VERSION:6
  ## Generated with https://github.com/google/shaka-packager version v2.5.1-9f11077-release
  #EXT-X-TARGETDURATION:3
  #EXT-X-PLAYLIST-TYPE:VOD
  #EXT-X-MAP:URI="http://example-ew-hls-mper.akamaized.net/Slate/Slate734s/REPLACE-ME/init.mp4"
  #EXTINF:2.000,
  http://example-ew-hls-mper.akamaized.net/Slate/Slate734s/REPLACE-ME/seg_0002.m4s
  #EXTINF:2.000,
  http://example-ew-hls-mper.akamaized.net/Slate/Slate734s/REPLACE-ME/seg_0003.m4s
  #EXTINF:2.000,
  http://example-ew-hls-mper.akamaized.net/Slate/Slate734s/REPLACE-ME/seg_0004.m4s
  #EXTINF:2.000,
  http://example-ew-hls-mper.akamaized.net/Slate/Slate734s/REPLACE-ME/seg_0005.m4s
  #EXT-X-ENDLIST`
}];
 
// In this example the video policy is hardcoded.
const audioPolicy = [{
  "startDate": startDate,
  "endDate": endDate,
  "content":  `#EXTM3U
  #EXT-X-VERSION:6
  ## Generated with https://github.com/google/shaka-packager version v2.5.1-9f11077-release
  #EXT-X-TARGETDURATION:3
  #EXT-X-PLAYLIST-TYPE:VOD
  #EXT-X-MAP:URI="http://example-ew-hls-mper.akamaized.net/Slate/Slate734s/audio_en/init.mp4"
  #EXTINF:2.000,
  http://example-ew-hls-mper.akamaized.net/Slate/Slate734s/audio_en/seg_0002.m4s
  #EXTINF:2.000,
  http://example-ew-hls-mper.akamaized.net/Slate/Slate734s/audio_en/seg_0003.m4s
  #EXTINF:2.000,
  http://example-ew-hls-mper.akamaized.net/Slate/Slate734s/audio_en/seg_0004.m4s
  #EXTINF:2.000,
  http://example-ew-hls-mper.akamaized.net/Slate/Slate734s/audio_en/seg_0005.m4s
  #EXT-X-ENDLIST`
}];
 
export class HlsProgramReplacementTranform extends TransformStream {
  constructor(policies) {
    //Load all the policies
    const hlsprogramtransformer = new LiveManifestTransformer(policies);
    let residual = '';
    function start(controller) {}
    function transform(chunk, controller) {
      residual += chunk;
    }
    function flush(controller) {
      //Perform replacement
      const data = hlsprogramtransformer.transform(residual);
      if (data.length > 0) {
        controller.enqueue(data);
      }
      
    }
    super({ start, transform, flush });
  }
}
 
export async function responseProvider(request) {
  try {
    if (request.url.includes('live.m3u8')) {
 
      // If request is for audio manifest, then use audio policy
      if (request.url.includes('audio_en')) {
        
        //If customer wants to read policy from PM user defined variables
        //const audioPolicy = JSON.parse(request.getVariable('PMUSER_AUDIOPOLICY'));
        
        //Validate and marshal the policy in the format accepted by LiveManifestTransformer class.
        const inputPolicyPromise = LiveManifestTransformer.marshalPolicy(audioPolicy);
        // Kindly provide any auth related headers from original request if required by origin server
        let responsePromise = httpRequest(`https://${request.host}${request.url}`);
        let [inputPolicy, response] = await Promise.all([inputPolicyPromise, responsePromise]);
        return createResponse(
          response.status,
          {},
          response.body
            .pipeThrough(new TextDecoderStream())
            .pipeThrough(new HlsProgramReplacementTranform(inputPolicy))
            .pipeThrough(new TextEncoderStream())
        );
      } else {
        
        //If customer wants to read policy from PM user defined variables
        //const videoPolicy = JSON.parse(request.getVariable('PMUSER_VIDEOPOLICY'));
        
        // If request is for video manifest, then use video policy.
        // The video policy used in this example is generic for all resolutions. 
        // i.e Different resolution blackout slate playlist can be obtained by replacing REPLACE-ME with requested playlist resolution. Slate/Slate734s/REPLACE-ME/seg_0002.m4s
       	// You can have a map that stores different blackout slate playlist based on policy. 
        // Fetch resolution from requested playlist.
        const parts = request.url.split('/');
        for (const policy of videoPolicy){
          // Replace REPLACE-ME with correct URI file path. In this case the URI path contains resolution at REPLACE-ME position
          policy.content = policy.content.replace(/REPLACE-ME/gi, parts[parts.length -2]);
        }
        const inputPolicyPromise = LiveManifestTransformer.marshalPolicy(videoPolicy);
        // Kindly provide any auth related headers from original request if required by origin server.
        let responsePromise = httpRequest(`https://${request.host}${request.url}`);
        let [inputPolicy, response] = await Promise.all([inputPolicyPromise, responsePromise]);
        return createResponse(
          response.status,
          {},
          response.body
            .pipeThrough(new TextDecoderStream())
            .pipeThrough(new HlsProgramReplacementTranform(inputPolicy))
            .pipeThrough(new TextEncoderStream())
        );
      }
    } else {
      //other file request.
      //You can also invoke EdgeWorkers only for media playlist and not for segment request using a Property Manager match rule.
      let response = await httpRequest(`https://${request.host}${request.url}`);
      return createResponse(
        response.status,
        {},
        response.body
      );
    }
  } catch (err) {
    logger.log('D-RP<ERROR>: %s', err.message);
    return Promise.resolve(createResponse(400, {}, err.message));
  }
}
```

---
title: "DASH parser"
slug: "dash-parser"
excerpt: ""
hidden: false
createdAt: "Wed Apr 05 2023 15:00:27 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Sep 06 2024 15:18:16 GMT+0000 (Coordinated Universal Time)"
---
This module is available to use in your EdgeWorkers code bundle to parse and modify Dynamic Adaptive Streaming over HTTP (DASH) Media Presentation Description (MPD) files. 

The protocols for transferring unbounded streams of multimedia data as described in the [Guidelines for Implementation: DASH-IF Interoperability Points](https://dashif-documents.azurewebsites.net/DASH-IF-IOP/master/DASH-IF-IOP.html) were applied when creating this EdgeWorkers module.

> 👍 Refer to [Import a JavaScript module](doc:import-a-javascript-module) for instructions on how to load an external JavaScript module into the EdgeWorkers `main.js` file.

# Code samples and use cases

Go to the the [EdgeWorkers GitHub repo](https://github.com/akamai/edgeworkers-examples/tree/master/delivery/media/dash) for access to the DASH module, the main helper class you need to import into your `main.js` file and the TypeScript definition file.

To help you learn more about how to use the DASH Parser module, we've added the following use cases to this guide. You can also find the code samples in the [EdgeWorkers GitHub repo](https://github.com/akamai/edgeworkers-examples/tree/master/delivery/media/dash/examples).

- **[Manifest and Playlist Manipulation](doc:manifest-and-playlist-personalization)**  
  Dynamically create personalized renditions of available Video on demand (VOD) manifest files using the DASH parser.

- **[Content insertion](doc:content-insertion)**  
  Dynamically add auxiliary media content to an existing Video on Demand (VOD) asset using Pre-Roll, Mid-Roll, and Post-Roll operations. 

# Manifest parsing

## parseMPD()

Parses and creates an internal object such as a MPD file using the input text manifest. This function does not return a value.

```javascript
parseMPD(textManifest)
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "textManifest",
    "0-1": "String",
    "0-2": "The Dash MPD file contents loaded using `httpRequest` in `responseProvider`  \nor  \nA hardcoded Dash MPD xml string."
  },
  "cols": 3,
  "rows": 1,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## getJSON()

Returns the  internal object such as an MPD created using `parseMPD()`. 

## stringifyMPD()

Converts the JavaScript Object (MPD) back to an XML string. Returns a string representation of the object parsed using `parseMPD()`.

# Variant Manipulation

## filterRepresentationsByBandwidth()

Removes variants other than the matched bitrates passed as the input. Tolerance is also taken into account. This function does not return a value.

```javascript
filterRepresentationsByBandwidth(mpd: any, ranges: string[], tolerance?: number)
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "mpd",
    "0-1": "Any",
    "0-2": "A JSON Object returned after calling the `parseMPD` and `getJSON()` methods.",
    "1-0": "ranges",
    "1-1": "Array of strings",
    "1-2": "Represents the bandwidths to filter-in.  \nBitrate Filtering supports either an array of range of values or array of values. A tolerance of ±100,000 is used for an array of values. For example, a parameter value of 2200000 bps will be a match for any bitrate value within 2100000 and  2300000 such as, 2185000. Inputs such as, ['600000','2000000'] or [600000-2000000', '700000-7000000'] are. both accepted. You can also pass a single value as ['1000000'].",
    "2-0": "tolerance",
    "2-1": "Number",
    "2-2": "**Optional** Default value is 100000."
  },
  "cols": 3,
  "rows": 3,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## filterRepresentationsByResolution()

Removes variants with resolutions higher than the specified `maxSupportedResolution`. Returns `true` if a variant is deleted by this function, `false` otherwise.

```javascript
filterRepresentationsByResolution(mpd, maxSupportedResolution)
```

| Parameter              | Type   | Description                                                                |
| :--------------------- | :----- | :------------------------------------------------------------------------- |
| mpd                    | Any    | JSON Object returned after calling the `parseMPD` and `getJSON()` methods. |
| maxSupportedResolution | String | '320-240'                                                                  |

## filterAdaptationSetsByAudioLanguage()

Removes audio variants with languages not specified. This function does not return a value.

```javascript
filterAdaptationSetsByAudioLanguage(mpd,language)
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "mpd",
    "0-1": "Any",
    "0-2": "JSON Object returned after calling the `parseMPD` and `getJSON()` methods.",
    "1-0": "languages",
    "1-1": "String  \nArray of strings",
    "1-2": "One or more languages to filter-in. For example, ['en','fr']."
  },
  "cols": 3,
  "rows": 2,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## filterAdaptationSetsBySubtitlesLanguage()

Removes subtitle variants with languages not specified. This function does not return a value.

```javascript
filterAdaptationSetsBySubtitlesLanguage(mpd,language)
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "mpd",
    "0-1": "Any",
    "0-2": "JSON Object returned after calling the `parseMPD` and `getJSON()` methods.",
    "1-0": "language",
    "1-1": "String  \nArray of strings",
    "1-2": "One or more languages to filter-in. For example, ['en','fr']."
  },
  "cols": 3,
  "rows": 2,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


# Content (bumper) insertion

The following restrictions apply to bumper insertion.

- The bumper MPD and primary MPD must be present on the origin server.
- You can insert the  bumper MPD as pre (before), mid (middle), post (after) roll. The roll refers to the primary MPD.
- You need to specify the `segmentTemplate` and `segmentTimeline` and preferably use the same segment durations for audio, video, and subtitles while encoding. There is currently no error to inform you if the audio and video segment durations are incompatible.
- You should configure the `afterSeconds`  parameter for a mid roll bumper insertion to be greater than `0`. You should also create multiple segment durations as it is not possible to split a segment.

## bumperInsertion()

Used for pre, post, or mid-roll bumper insertions. This function does not return a value.

```javascript
bumperInsertion(mpd: any, bumperPlaylistArrayObject: Bumper[])
```

| Parameter                 | Type      | Description                                                                                              |
| :------------------------ | :-------- | :------------------------------------------------------------------------------------------------------- |
| mpd                       | Any       | JSON Object returned after calling the `parseMPD` and `getJSON()` methods.                               |
| bumperPlaylistArrayObject | Bumper\[] | A holder for a bumper Dash MPD, that will be inserted into the main Dash MPD  at the specified duration. |

## Bumper

A holder for an bumper Dash MPD, that will be inserted into the main Dash MPD at the specified duration.

```javascript
Bumper = {
  responseBodyObject: any;
  afterSeconds: number;
};
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "afterSeconds",
    "0-1": "Number",
    "0-2": "`0` indicates the postroll bumper insertion, where the period from the bumper MPD will be inserted at the end of the primary MPD.  \n  \n`-1` indicates the preroll bumper insertion, where the period from the bumper MPD will be inserted at the start of primary MPD.  \n  \nAny other positive values such as, 10 indicates the number of seconds after which the bumper MPD will be inserted into the primary MPD.  \n  \nThe `afterSeconds` parameter is relative to the primary MPD, where the bumper MPDs will be inserted.",
    "1-0": "responseBodyObject",
    "1-1": "Object",
    "1-2": "JSON Object returned after calling `parseMPD` and `getJSON()` methods."
  },
  "cols": 3,
  "rows": 2,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]

---
title: "HLS parser"
slug: "hls-parser"
excerpt: ""
hidden: false
createdAt: "Wed Apr 05 2023 12:56:04 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Sep 06 2024 15:16:39 GMT+0000 (Coordinated Universal Time)"
---
This module is available to use in your EdgeWorkers code bundle to parse and modify HTTP Live Streaming (HLS) playlist files. 

The protocols for transferring unbounded streams of multimedia data, as described in [RFC 8216](https://www.rfc-editor.org/rfc/rfc8216.html), were applied when creating this EdgeWorkers module.

Currently the HLS parser only accepts complete UTF-8 encoded m3u8 playlist file contents and does not work in streaming mode to parse chunks of data.

> 👍 Refer to [Import a JavaScript module](doc:import-a-javascript-module) for instructions on how to load an external JavaScript module into the EdgeWorkers `main.js` file.

# Code samples and use cases

Go to the the [EdgeWorkers GitHub repo](https://github.com/akamai/edgeworkers-examples/tree/master/delivery/media/hls) for access to the HLS module, the main helper class you need to import into your `main.js` file and the TypeScript definition file.

To help you learn more about how to use the HLS Parser module, we've added the following use cases to this guide. You can also find the code samples in the [EdgeWorkers GitHub repo](https://github.com/akamai/edgeworkers-examples/tree/master/delivery/media/hls/examples).

- **[Manifest and Playlist Manipulation](doc:manifest-and-playlist-personalization)**  
  Dynamically create personalized renditions of available Video on demand (VOD) playlists.

- **[Live program replacement](doc:live-program-replacement)**  
  Dynamically replace a live stream or linear program with a blackout slate during a time period and within specific geographic locations.

- **[Content insertion](doc:content-insertion)**  
  Dynamically add auxiliary media content to an existing Video on Demand (VOD) asset using Pre-Roll, Mid-Roll, and Post-Roll operations. 

# Manifest Parsing

## parseManifest()

Parses and creates an internal object using the input text manifest. Returns a Playlist Object.

```javascript
parseManifest(text)
```

| Parameter | Type        | Description                                                |
| :-------- | :---------- | :--------------------------------------------------------- |
| text      | UTF8 String | UTF-8 encoded string representation of the manifest input. |

## stringifyManifest()

Creates the manifest from the `playlistObject` passed from `parseManifest()`. Returns a string.

```javascript
stringifyManifest(playlistObject)
```

| Parameter      | Type   | Description                                                                                                                                                                                 |
| :------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| playlistObject | Object | Instance of the playListObject, MasterPlaylist, or MediaPlaylist. For more information, refer to the [npm](https://www.npmjs.com/package/hls-parser) documentation on this external module. |

## getManifestType()

Indicates the type of playlist that was requested such as, master, media, or invalid playlist. Returns a MANIFEST_TYPE enum.

```javascript
getManifestType(playlistObject)
```

| Parameter      | Type   | Description                                                                                                                                                                                  |
| :------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| playlistObject | Object | Instance of the playList Object, MasterPlaylist, or MediaPlaylist. For more information, refer to the [npm](https://www.npmjs.com/package/hls-parser) documentation on this external module. |

# Variant Manipulation

## preserveVariantsByBitrate()

Removes all variants with specified bitrates from the playlist. Returns `true` if a variant is deleted by this function, `false` otherwise.

```javascript
preserveVariantsByBitrate(playlistObject, bitrate, tolerance=100000)
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "playlistObject",
    "0-1": "Object",
    "0-2": "Instance of the playlist Object, MasterPlaylist, or MediaPlaylist. For more information, refer to the [npm](https://www.npmjs.com/package/hls-parser) documentation on this external module.",
    "1-0": "bitrate",
    "1-1": "Array of strings",
    "1-2": "Represents the bitrates. For example, 100000, 10000-20000, 20000-300000.  \nThe value is a decimal-integer of bits per second. It represents the average segment bitrate of the Variant Stream.",
    "2-0": "tolerance=100000",
    "2-1": "Number",
    "2-2": "Bitrate tolerance. By default, bitrate filtering uses a tolerance of ±100,000 bps for comparisons.  \nFor example, a parameter value of 2200000 bps will match any bitrate value within \": \"tolerance=1000\" such as, 2185000.  \nNote: Tolerance is not considered for bitrate ranges such as, 10000-20000."
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


## preserveVariantsByResolution()

Removes all resolutions higher than the specified maximum supported resolution. It accepts a single resolution as a string in the format `<width>x<height>`. Returns `true` if a variant is deleted by this function, `false` otherwise.

```javascript
preserveVariantsByResolution(playlistObject, maxSupportedResolution)
```

| Parameter              | Type   | Description                                                                                                                                                                                  |
| :--------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| playlistObject         | Object | Instance of the playList Object, MasterPlaylist, or MediaPlaylist. For more information, refer to the [npm](https://www.npmjs.com/package/hls-parser) documentation on this external module. |
| maxSupportedResolution | String | String representation for resolution in the format `<width>x<height>`.                                                                                                                       |

## moveVariantToIndex()

Moves the metadata of a variant with a given resolution to the `newIndex`. Returns the last index where the variant is updated. Its value can differ from the  value of `newIndex` provided there can be repetition of the same resolution in a master playlist.

```javascript
moveVariantToIndex(playlistObject, resolution, newIndex = 0)
```

| Parameter      | Type   | Description                                                                                                                                                                                  |
| :------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| playlistObject | Object | Instance of the playList Object, MasterPlaylist, or MediaPlaylist. For more information, refer to the [npm](https://www.npmjs.com/package/hls-parser) documentation on this external module. |
| resolution     | String | String representation for resolution in format `<width>x<height>`.                                                                                                                           |
| newIndex = 0   | Number | Index in the manifest's variant list where the variant with the resolution needs to be moved.                                                                                                |

## updateResolutionOrder()

Moves the metadata of all variants with specified resolutions to the top. The order of these variants is preserved as provided in the array of resolutions. Providing multiple entries of the same resolution can cause undesired results. This function internally uses the `moveVariantToIndex` to move the respective variants. Returns `true` if the resolution order is updated by this function, `false` otherwise.

```javascript
updateResolutionOrder(playlistObject, resolutions[])
```

| Parameter      | Type   | Description                                                                                                                                                                                  |
| :------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| playlistObject | Object | Instance of the playList Object, MasterPlaylist, or MediaPlaylist. For more information, refer to the [npm](https://www.npmjs.com/package/hls-parser) documentation on this external module. |
| resolutions\[] | String | Array of string representation for resolution in format `<width>x<height>`.                                                                                                                  |

# Rendition Manipulation

## preserveAudioRenditionByLanguage()

Removes audio renditions that use languages not specified in the master playlist. Returns `true` if a rendition is deleted by this function, `false` otherwise.

```javascript
preserveAudioRenditionByLanguage(playlistObject, language)
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "playlistObject",
    "0-1": "Object",
    "0-2": "Instance of the playList Object, MasterPlaylist, or MediaPlaylist.For more information, refer to the [npm](https://www.npmjs.com/package/hls-parser) documentation on this external module.",
    "1-0": "language",
    "1-1": "String",
    "1-2": "Contains single or multiple languages to be preserved. For example, ['EN','FR'].  \n  \nThe value is a quoted-string containing a [RFC 5646](https://www.rfc-editor.org/rfc/rfc5646.html) language tag that identifies the language of the VALUE.  \n  \nNote: An array of any other characters ([' '], ['abc']) can remove all subtitle renditions."
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


## preserveSubtitleRenditionByLanguage()

Removes subtitle renditions that use languages not specified in the master playlist. Returns `true` if a rendition is deleted by this function, `false` otherwise.

```javascript
preserveSubtitleRenditionByLanguage(playlistObject, language)
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "playlistObject",
    "0-1": "Object",
    "0-2": "Instance of the playList Object, MasterPlaylist, or MediaPlaylist. For more information, refer to the [npm](https://www.npmjs.com/package/hls-parser) documentation on this external module.",
    "1-0": "language",
    "1-1": "Array of strings",
    "1-2": "Contains single or multiple languages to be preserved. For example, ['EN','FR'].  \n  \nThe value is a quoted-string containing a [RFC 5646](https://www.rfc-editor.org/rfc/rfc5646.html) language tag that identifies the language of the VALUE.  \n  \nNote: An array of any other characters ([' '], ['abc']) can remove all subtitle renditions."
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

## insertAuxiliaryContent()

Inserts segments from the auxiliary content into the primary media playlist at the specified duration. This auxiliary content: 

- Must be present on the origin server as individual segments. 
- Must have its own playlist. 
- Can be inserted as pre (before), mid (middle), post (after) roll.  The roll refers to the primary media playlist segments.
- Auxiliary content segments should adhere to the parent stream's encoding profile such as bitrates, resolutions, and segment duration as the original content.

This function does not return a value.

### Exceptions

Throws an  {Error} with a message if the argument type checks fails. For example, if the playlist object sent is invalid the following error is thrown.  

`Error('Received invalid playlist object, expected valid master playlist object.')`

```javascript
insertAuxiliaryContent(playlistObj: Object, bumpers: Bumper[]): void
```

## playlistObj

Instance of the mediaPlaylist that corresponds to the primary media bumpers.

| Parameter   | Type                              | Description                                                                                                                                                                                  |
| :---------- | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| playlistObj | Object                            | Instance of the playList Object, MasterPlaylist, or MediaPlaylist. For more information, refer to the [npm](https://www.npmjs.com/package/hls-parser) documentation on this external module. |
| bumper      | Bumper\[] or Array of type Bumper | Holder type for auxiliary media playlist that will be inserted in primary media playlist at specified duration.                                                                              |

## Bumper

A holder for an auxiliary media playlist that will be inserted into the primary media playlist at the specified duration.

```javascript
Bumper: { afterSeconds: number; auxiliaryPlaylist: Object }
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "afterSeconds",
    "0-1": "Number",
    "0-2": "Duration in seconds, relative to primary media playlist, where the segments from the `auxiliaryPlaylist` will be inserted.  \n  \n`MAX_VALUE` indicates the segments from the auxiliary media playlist that need to be inserted at the end in the primary media playlist.  \n  \nA value of `0` indicates that the segments from the auxiliary media playlist need to be inserted at the start in the primary media playlist.",
    "1-0": "auxiliaryPlaylist",
    "1-1": "Object",
    "1-2": "Instance of the `mediaPlaylist` Object that corresponds to the auxiliary media playlist."
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


# LiveManifestTransformer

The `LiveManifestTransformer` class replaces black slate segments in the HLS playlist file.

The window in the HLS file:

- Should not contain overlapping windows.
- Has at least one `HLS_TAG_EXTX_PROGRAM_DATE_TIME` tag for the media playlist.

# LiveManifestTransformer()

Constructor for the new `LiveManifestTransformer` Object to initialize the policies. Returns a `LiveManifestTransformer` Object.

```javascript
LiveManifestTransformer(input: Policy[])
```

| Parameter | Type   | Description                                                                                |
| :-------- | :----- | :----------------------------------------------------------------------------------------- |
| startDate | String | Start date, in ISO 8601 format, of the replacement window.                                 |
| endDate   | String | End date, in ISO 8601 format, of the replacement window.                                   |
| content   | String | Playlist manifest object containing segments to be replaced during the replacement window. |

## marshalPolicy()

Resolves content of each policy to the media playlist object. Content can be either a URL or media playlist encoded as a string. If a URL is passed as content, the actual blackout slate media playlist is fetched and marshaled to a JavaScript playlist object. Returns a Promise\<Policy\[]>.

```javascript
marshalPolicy(input: Policy[]): Promise<Policy[]>
```

If marshaling fails for the UTF-8 encoded playlistError the following error message is thrown.  

`Error('Failed to parse blackslate media playlist')`

| Parameter | Type   | Description                                                                                                                             |
| :-------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| startDate | String | Start date, in ISO 8601 format, of the replacement window.                                                                              |
| endDate   | String | End date, in ISO 8601 format, of the replacement window.                                                                                |
| content   | String | UTF-8 encoded playlist manifest containing segments to be replaced during the  replacement window or playlist URL to fetch from origin. |

## transform()

Transforms the original playlist with the content to be replaced from the policy for the specified window.  
Returns a `string - Modified playlist manifest`.

```javascript
transform(manifest: string): string
```

| Parameter | Type   | Description                                                                                                                                                                                                                                   |
| :-------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| manifest  | String | HLS content in [UTF-8 format](https://www.google.com/url?q=https://tools.ietf.org/html/rfc8216&sa=D&source=docs&ust=1681169152746103&usg=AOvVaw1ejJ6f5zDlz-JZk4mclTjE). This needs to be the complete content of the original media playlist. |

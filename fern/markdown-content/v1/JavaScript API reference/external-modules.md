---
title: "External modules"
slug: "external-modules"
excerpt: ""
hidden: false
createdAt: "Wed Apr 05 2023 14:58:59 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Jan 15 2025 12:54:42 GMT+0000 (Coordinated Universal Time)"
---
EdgeWorkers supports external modules to use in your code bundles to provide a class or a library of functions for a specific purpose.

Akamai provides a [JavaScript helper library](https://techdocs.akamai.com/edgekv/docs/library-helper-methods) so you can use [EdgeKV](https://techdocs.akamai.com/edgekv/docs/welcome-to-edgekv) to access data from within an EdgeWorkers function.

You can import the [HLS parser](doc:hls-parser) and [DASH parser](doc:dash-parser) modules to build the following video use cases.

- [Manifest and Playlist Manipulation](doc:manifest-and-playlist-personalization)
  - [Bitrate filtering](doc:manifest-and-playlist-personalization#filter-bitrates)
  - [Resolution filtering](doc:manifest-and-playlist-personalization#filter-resolutions)
  - [Resolution re-ordering](doc:manifest-and-playlist-personalization#re-order-resolutions)
  - [Language localization](doc:manifest-and-playlist-personalization#localize-language)
- [Live program replacement](doc:live-program-replacement) (Currently only supported with the HLS module.)
- [Content insertion](doc:content-insertion) 

The [jwt](doc:jwt) module is available to verify JWT tokens using digital signatures.

The [cwt](doc:cwt) module is available to create, sign, and verify CWT tokens..

You can use the [watermarking](doc:watermarking) module to watermark Over-The-Top (OTT) content delivered in an Adaptive Bitrate (ABR) format.

> 📘 For instructions on how to include these modules in your EdgeWorkers code bundles see, [Import a JavaScript module](doc:import-a-javascript-module).

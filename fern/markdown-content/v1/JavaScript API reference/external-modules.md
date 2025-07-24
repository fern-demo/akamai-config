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

You can import the [HLS parser](hls-parser.md) and [DASH parser](dash-parser.md) modules to build the following video use cases.

- [Manifest and Playlist Manipulation](manifest-and-playlist-personalization.md)
  - [Bitrate filtering](manifest-and-playlist-personalization.md#filter-bitrates)
  - [Resolution filtering](manifest-and-playlist-personalization.md#filter-resolutions)
  - [Resolution re-ordering](manifest-and-playlist-personalization.md#re-order-resolutions)
  - [Language localization](manifest-and-playlist-personalization.md#localize-language)
- [Live program replacement](live-program-replacement.md) (Currently only supported with the HLS module.)
- [Content insertion](content-insertion.md) 

The [jwt](jwt.md) module is available to verify JWT tokens using digital signatures.

The [cwt](cwt.md) module is available to create, sign, and verify CWT tokens..

You can use the [watermarking](watermarking.md) module to watermark Over-The-Top (OTT) content delivered in an Adaptive Bitrate (ABR) format.

> 📘 For instructions on how to include these modules in your EdgeWorkers code bundles see, [Import a JavaScript module](import-a-javascript-module.md).

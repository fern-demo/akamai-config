---
title: "July 19, 2022 — Increased resource tier limits"
slug: "july-19-2022-resource-tier-limits"
type: ""
createdAt: "Tue Jul 19 2022 15:18:00 GMT+0000 (Coordinated Universal Time)"
hidden: false
---
We updated the following HTTP sub-request [limits](doc:resource-tier-limitations) in the Dynamic compute resource tier.

- Maximum wall time allowed per HTTP sub-request increased from 1.5 seconds to 4 seconds for all event handlers including `responseProvider`.
- Maximum number of HTTP sub-requests allowed from a parent request during the `onClientRequest`, `onOriginRequest`, `onOriginResponse`, and `onClientResponse` event handlers increased from 1 to 2.
- Maximum number of HTTP sub-requests allowed in parallel per request during the `onClientRequest`, `onOriginRequest`,`onOriginResponse`, and `onClientResponse` event handlers increased from 1 to 2.
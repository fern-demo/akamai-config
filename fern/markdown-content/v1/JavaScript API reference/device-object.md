---
title: "Device Object"
slug: "device-object"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue May 04 2021 22:11:31 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Feb 10 2022 14:43:45 GMT+0000 (Coordinated Universal Time)"
---
The `device` request object contains properties specifying the client device characteristics.

Device property specifics apply to a given [request](request-object.md) . The value of this property is null if the contract associated with the request does not have entitlements for [Edge Device Characteristics](https://techdocs.akamai.com/property-mgr/docs/device-charac).

# acceptsThirdPartyCookie

Indicates if the device supports cookies from a pixel in a page in a different domain. Although the device supports this feature it may be disabled by the user of the device. This is a read-only boolean value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.acceptsThirdPartyCookies;
// => true
```

# brandname

Brand name of the device. This is a read-only string value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.brandName;
// => "Firefox"
```

# hasAjaxSupport

Indicates if the device browser supports AJAX in JavaScript. This is a read-only boolean value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.hasAjaxSupport;
// => true
```

# hasCookieSupport

Indicates if the device browser supports cookies. This is a read-only boolean value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.hasCookieSupport;
// => true
```

# hasFlashSupport

Indicates if the device browser supports Flash. This is a read-only boolean value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.hasFlashSupport;
// => true
```

# isMobile

Indicates if the device is a mobile device. This is a read-only boolean value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0 
request.device.isMobile;
// => false
```

# isTablet

Indicates if the device is a tablet. This is a read-only boolean value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.isTablet;
// => false
```

# isWireless

Indicates if the device is a wireless device. This is a read-only boolean value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0 
request.device.isWireless; 
// => false
```

# marketingName

Additional name by which the device may be known. This is a read-only string value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0 
request.device.marketingName; 
// => "Firefox 68"
```

# mobileBrowser

The mobile browser name of the device. This is a read-only string value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.mobileBrowser;
// => "Firefox"
```

# mobileBrowserVersion

The mobile browser version of the device. This is a read-only string value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.mobileBrowserVersion;
// => "68"
```

# modelName

Model name or number of the device. This is a read-only string value.# modelName

Model name or number of the device. This is a read-only string value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0 
request.device.modelName;
// => "68"
```

# os

The device operating system name. This is a read-only string value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.os;
// => "Mac OS X"
```

# osVersion

The device operating system version. This is a read-only string value.

```text
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.osVersion;
// => "10.14"
```

# physicalScreenHeight

The physical screen height of the device, in millimeters. This is a read-only integer value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.physicalScreenHeight;
// => 175
```

# physicalScreenWidth

The physical screen width of the device, in millimeters. This is a read-only integer value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.physicalScreenWidth;
// => 280
```

# resolutionHeight

The screen resolution height of the device, in pixels. This is a read-only integer value.# resolutionHeight

The screen resolution height of the device, in pixels. This is a read-only integer value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.resolutionHeight;
// => 800
```

# resolutionWidth

The screen resolution width of the device, in pixels . This is a read-only integer value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.resolutionWidth;
// => 1280
```

# xhtmlSupportLevel

Indicates the device XHTML support level. This is a read-only integer value.

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0
request.device.xhtmlSupportLevel;
// => 4
```

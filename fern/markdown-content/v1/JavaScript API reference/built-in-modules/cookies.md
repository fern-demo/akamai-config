---
title: "cookies"
slug: "cookies"
excerpt: ""
hidden: false
createdAt: "Wed May 05 2021 12:44:43 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jan 20 2025 15:17:09 GMT+0000 (Coordinated Universal Time)"
---
A cookies module is available to assist in cookie manipulation. This module exports two structs, **Cookies** and **SetCookie**, each corresponding to one "Cookie" or "Set-Cookie" header respectively.

> 📘 Cookies are often user or session specific, stripping the cookie helps improve the offload of cached objects.
> 
> To keep the `Set-Cookie` header, you can use the `<edgeservices:cookie.pass-set-cookie-policy>` metadata tag. This metadata tag lets you keep the `Set-Cookie` header modifications made during the `onClientResponse` event.

```javascript
import {Cookies, SetCookie} from 'cookies';

export function onClientRequest(request) {
  let cookies = new Cookies(request.getHeader('Cookie'));
}
```

# Properties for the SetCookie Object

## name

Sets the cookie name.

```javascript
var cookie = new SetCookie();
cookie.name = 'Cookie1';
response.setHeader('Set-Cookie', cookie.toHeader());
```

## value

Sets the cookie value.

```javascript
var cookie = new SetCookie();
cookie.name = 'Cookie1';
cookie.value = 'Value1';
response.setHeader('Set-Cookie', cookie.toHeader());
// Set-Cookie: Cookie1=Value1;
```

## domain

<b>Optional</b> Sets the domain name for the cookie. 

```javascript
var cookie = new SetCookie();
cookie.name = 'Cookie1';
cookie.value = 'Value1';
cookie.domain = 'example.com';
response.setHeader('Set-Cookie', cookie.toHeader());
// Set-Cookie: Cookie1=Value1; Domain=example.com;
```

## expires

<b>Optional</b> Sets the expiry date of the cookie in GMT. If an expiry date is not specified or set to 0, a session cookie is created. 

```javascript
var cookie = new SetCookie();
cookie.name = 'Cookie1';
cookie.value = 'Value1';
cookie.expires = new Date('August 23, 2020 03:24:00');
response.setHeader('Set-Cookie', cookie.toHeader());
// Set-Cookie: Cookie1=Value1; Expires=Sun, 23 Aug 2020 03:24:00 GMT;
```

## httpOnly

<b>Optional</b> Helps mitigate the risk of a client side script accessing a protected cookie (if supported by the browser). 

```javascript
var cookie = new SetCookie();
cookie.name = 'Cookie1';
cookie.value = 'Value1';
cookie.httpOnly = true; // true or false
response.setHeader('Set-Cookie', cookie.toHeader());
// Set-Cookie: Cookie1=Value1; HttpOnly;
```

## maxAge

<b>Optional</b> Sets the expiry time relative to the current time in seconds. A value of zero tells the browser to delete the cookie immediately.

```javascript
var cookie = new SetCookie();
cookie.name = 'Cookie1';
cookie.value = 'Value1';
cookie.maxAge = 900;
response.setHeader('Set-Cookie', cookie.toHeader());
// Set-Cookie: Cookie1=Value1; Max-Age=900;
```

## path

<b>Optional</b> Sets the path for the cookie. 

```javascript
var cookie = new SetCookie();
cookie.name = 'Cookie1';
cookie.value = 'Value1';
cookie.path = '/';
response.setHeader('Set-Cookie', cookie.toHeader());
// Set-Cookie: Cookie1=Value1; path=/;
```

## sameSite

<b>Optional</b> Allows servers to prevent cookies from being sent using cross-site requests (where [Site](https://developer.mozilla.org/en-US/docs/Glossary/Site) is defined by the registerable domain). This provides some protection against cross-site request forgery attacks ([CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)). 

```javascript
var cookie = new SetCookie();
cookie.name = 'Cookie1';
cookie.value = 'Value1';
cookie.sameSite = 'Strict'; // Strict, Lax, None
response.setHeader('Set-Cookie', cookie.toHeader());
// Set-Cookie: Cookie1=Value1; SameSite=Strict;
```

## secure

<b>Optional</b> Specifies the cookies that can only be used with HTTPS only. 

```javascript
var cookie = new SetCookie();
cookie.name = 'Cookie1';
cookie.value = 'Value1';
cookie.secure = true; // true or false
response.setHeader('Set-Cookie', cookie.toHeader());
// Set-Cookie: Cookie1=Value1; Secure;
```

# Methods for SetCookie()

Constructor for a new "SetCookie" object. Holds a specific Set-Cookie header representation and the SetCookie object that corresponds to the "Set-Cookie" header.

#### Parameters

```javascript
SetCookie([cookieHeader], [options])
```

Review the table below for information about the available parameters.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "cookieHeader",
    "0-1": "String or Object",
    "0-2": "<b>Optional</b> Passes the raw Set-Cookie header to the constructor to parse. If a string is passed, an attempt is made to parse it as Set-Cookie. If an Object is passed, the constructor copies properties of that object into the SetCookie object for its own properties.",
    "1-0": "options",
    "1-1": "Object",
    "1-2": "<b>Optional</b> This object parses an existing Set-Cookie header to override the default decode of the Set-Cookie values. This object must have a function named 'decode' on it, to return the custom decoding results from the string."
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


```javascript
var cookie = new SetCookie(); // Sets empty cookie object
```

```javascript
var cookie = new SetCookie( 'Cookie1=Value1; Path=/;');
```

`options`

```javascript
import { SetCookie } from 'cookies';

const options = {
  decode: (s) => { return decodeURI(s); }
};

export function onClientResponse (request, response) {
  var setCookie = new SetCookie('mycookie=value1%20value2', options);
  response.setHeader('set-cookie', setCookie.toHeader());
}

// Set-Cookie: mycookie=value1 value2;
```

## toHeader([options])

Returns the string value to use when setting the Cookie header, encoding values by default.

#### Parameters

```javascript
toHeader([options])
```

Review the table below for information about the available parameters.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "options",
    "0-1": "String",
    "0-2": "<b>Optional</b> The Options object overrides the default encoding of the Set-Cookie values. This object must have a function named 'encode' on it, to return the custom encoding results for the string."
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


```javascript
import { SetCookie } from 'cookies';

export function onClientResponse (request, response) {
   var cookie = new SetCookie({name: 'cookie', value: 'VALUE1 value2'});
   response.setHeader('Set-Cookie', cookie.toHeader());
}

// Set-Cookie: cookie=VALUE1 value2;
```

`options`

```javascript
import { SetCookie } from 'cookies';

const options = {
  encode: (s) => { return encodeURI(s); }
};

export function onClientResponse (request, response) {
   var cookie = new SetCookie('cookie=VALUE1 value2');
   response.setHeader('Set-Cookie', cookie.toHeader(options));
}

// Set-Cookie: cookie=VALUE1%20value2;
```

# Methods for Cookies()

Constructor for a new "Cookies" object to hold cookies.

#### Parameters

```javascript
Cookies([cookieHeader], [options])
```

Review the table below for information about the available parameters.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "cookieHeader",
    "0-1": "String or Array",
    "0-2": "<b>Optional</b> Passes the raw Cookie header to the constructor to parse. If an array is passed, the first element must be a string that is used as the cookie's string to parse. If it is not passed, an empty cookies object is returned.",
    "1-0": "options",
    "1-1": "String",
    "1-2": "<b>Optional</b> This object is only used when parsing an existing Cookie header to override the default decode of the Cookie values. This object must have a function named 'decode' on it to return the custom decoding results from the string."
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


```javascript
// Cookie: Cookie1=Value1;Cookie2=Value2;Cookie3=Value3;
  let cookies = new Cookies(request.getHeader('Cookie'));
```

`options`

```javascript
import { Cookies } from 'cookies';

  const options = {
    decode: (s) => { return decodeURI(s); }
  };

export function onClientResponse (request, response) {
  const cookie = new Cookies('Cookie1=Value1%20Value2', options);
  response.setHeader('Set-Cookie', cookie.toHeader());
}

// Set-Cookie: Cookie1=Value1 Value2;
```

## toHeader()

Returns the string value to use when setting the Cookie header, encoding values by default.

#### Parameters

```javascript
toHeader([options])
```

Review the table below for information about the available parameters.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "options",
    "0-1": "String",
    "0-2": "<b>Optional</b> The Options object overrides the default encoding of the Set-Cookie values. This object must have a function named 'encode' on it, to return the custom encoding results for the string."
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


```javascript
// Cookie: cookie1=value1;cookie2=value2;
import { Cookies } from 'cookies';
export function onClientResquest (request) {
  const cookieJar = new Cookies(request.getHeader('Cookie'));
  cookieJar.delete('cookie2');
  request.setHeader('Cookie', cookieJar.toHeader());
}
// Cookie: cookie1=value1;
```

`options`

```javascript
import { SetCookie } from 'cookies';

const options = {
  encode: (s) => { return encodeURI(s); }
};

export function onClientResponse (request, response) {
   var cookie = new SetCookie('cookie=VALUE1 value2');
   response.setHeader('Set-Cookie', cookie.toHeader(options));
}

// Set-Cookie: cookie=VALUE1%20value2;
```

## get()

Returns the first instance of the cookie matching the specified cookie name.

```javascript
get(name)
```

Review the table below for information about the available parameters.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "name",
    "0-1": "String",
    "0-2": "Name of first matching cookie  \n  \nIf no cookies exist, a value of `undefined` is returned."
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


```javascript
// Cookie: Cookie1=Value1;Cookie2=Value2;Cookie3=Value3;
  let cookies = new Cookies(request.getHeader('Cookie'));
  var cookie1Cookie = cookies.get('Cookie1');
// cookie1Cookie ==> "Value1"
```

## getAll()

Returns all cookie instances matching the specified cookie name.

#### Parameters

```javascript
getAll (name)
```

Review the table below for information about the available parameters.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "name",
    "0-1": "String",
    "0-2": "Name of all matching cookies  \n  \nIf no cookies exist, an empty array is returned."
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


```javascript
// Cookie: Cookie1=Value1;Cookie1=Value2;Cookie1=Value3;
  let cookies = new Cookies(request.getHeader('Cookie'));
  var cookieValues = cookies.getAll('Cookie1');
// cookieValues ==> ["Value1", "Value2", "Value3"]
```

## names()

Returns the names of all existing cookies held by the specified cookies object. Array of Strings.

```javascript
// Cookie: Cookie1=Value1;Cookie2=Value2;Cookie3=Value3;
 
  let cookies = new Cookies(request.getHeader('Cookie'));
  var cookieNames = cookies.names();
 
// cookieNames ==> ["Cookie1", "Cookie2", "Cookie3"]
```

## add()

Adds a cookie to an object containing all the cookies.

#### Parameters

```javascript
add(name, value)
```

Review the table below for information about the available parameters.

| Parameter | Type   | Description                     |
| :-------- | :----- | :------------------------------ |
| name      | String | Name of the cookie to be added  |
| value     | String | Value of the cookie to be added |

```javascript
// Cookie: Cookie1=Value1;Cookie2=Value2;
  let cookies = new Cookies(request.getHeader('Cookie'));
  cookies.add('Cookie3','Value3');
  cookies.toHeader();
// Cookie: Cookie1=Value1;Cookie2=Value2;Cookie3=Value3;
```

## delete()

Removes all cookies with a given name.

#### Parameters

```javascript
delete(name)
```

Review the table below for information about the available parameters.

| Parameter | Type   | Description                      |
| :-------- | :----- | :------------------------------- |
| name      | String | Name of the cookie to be removed |

```javascript
// Cookie: Cookie1=Value1;Cookie2=Value2;Cookie3=Value3;
  let cookies = new Cookies(request.getHeader('Cookie'));
  cookies.delete('Cookie3');
  cookies.toHeader();
// Cookie: Cookie1=Value1;Cookie2=Value2;
```

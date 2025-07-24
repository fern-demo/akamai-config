---
title: "About the JavaScript API"
slug: "about-the-javascript-api"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon May 24 2021 00:13:25 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Feb 09 2023 18:37:54 GMT+0000 (Coordinated Universal Time)"
---
Review these details when designing EdgeWorkers functions. To learn more about the specific HTTP events that can execute an EdgeWorkers script, see [EdgeWorkers event model](event-handler-functions.md).

> 👍 For information about the supported HTTP methods see, [Event handler methods](event-handler-functions.md#event-handler-methods).

**Use case support matrix**  
View the event handler and JavaScript method you can use to achieve an EdgeWorkers use case.

##

<table>

<caption>

</caption>

<colgroup>

<col/>

<col/>

<col/>

</colgroup>

<thead>

<tr>

<th>Event Handler</th>

<th>Use Cases</th>

<th>Methods</th>

</tr>

</thead>

<tbody>

<tr>

<td rowspan="6" style="vertical-align:top">onClientRequest</td>

<td>
Redirect Management

Traffic Filtering  
Allow / Deny  
Static Response Offload
</td>

<td style="vertical-align:top"> <a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#respondwith">respondWith() </a></td>

</tr>

<tr>

<td style="vertical-align:top">Header Management</td>

<td>
<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#getheader">getHeader()  </a>

<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#setheader">setHeader() </a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#addheader">addHeader()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#removeheader">removeHeader()</a>

</td>

</tr>

<tr>

<td style="vertical-align:top">Cookie Management</td>

<td>
<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies">cookies </a>

<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies#toheader">toHeader()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies#get">get()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies#getall">getAll()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies#names">names()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies#add">add()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies#delete">delete()</a>

See the note below.
</td>

</tr>

<tr>

<td style="vertical-align:top">Delivery Property Flow Control</td>

<td>
<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#getvariable">getVariable() </a>

<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#setvariable">setVariable() </a>

</td>

</tr>

<tr>

<td>
Conditionally Route Traffic

Personalization
</td>

<td><a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#route">route() </a></td>

</tr>

<tr>

<td style="vertical-align:top">Cache Key Manipulation</td>

<td>
<a href="https://techdocs.akamai.com/edgeworkers/docs/cachekey-object#excludequerystring">excludeQueryString()</a>

<a  href="https://techdocs.akamai.com/edgeworkers/docs/cachekey-object#includequerystring">includeQueryString()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/cachekey-object#includequeryargument">includeQueryArgument()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/cachekey-object#includecookie">includeCookie()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/cachekey-object#includeheader">includeHeader()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/cachekey-object#includevariable">includeVariable()</a>
</td>

</tr>

<tr>

<td rowspan="1" style="vertical-align:top">onClientResponse</td>

<td>
Redirect Management

Immediate HTML responses

Refer to the [Product limits](limitations.md) for information about the supported response size.
</td>

<td style="vertical-align:top"> <a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#respondwith">respondWith() </a></td>

</tr>

<tr>

<td rowspan="3" style="vertical-align:top">
onOriginRequest
onOriginResponse  
onClientResponse
</td>

<td style="vertical-align:top">Header Management</td>

<td>
<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#getheader">getHeader()  </a>

<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#setheader">setHeader() </a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#addheader">addHeader()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#removeheader">removeHeader()</a>
</td>

</tr>

<tr>

<td style="vertical-align:top">Cookie Management</td>

<td>
<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies">cookies </a>

<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies#toheader">toHeader()</a>
<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies#get">get()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies#getall">getAll()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies#names">names()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies#add">add()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/cookies#delete">delete()</a>

See the note below.
</td>

</tr>

<tr>

<td>Delivery Property Flow Control</td>

<td>
<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#getvariable">getVariable() </a>

<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#setvariable">setVariable() </a>
</td>

</tr>

<tr>

<td rowspan="2" style="vertical-align:top">responseProvider</td>

<td style="vertical-align:top">Response Orchestration</td>

<td>

<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#getheader">getHeader()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#getheaders">getHeaders()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#getvariable">getVariable()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#text">text()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#json">json()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/request-object#arraybuffer">arrayBuffer()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/create-response">createResponse()</a>  
<a href="https://techdocs.akamai.com/edgeworkers/docs/http-request#http-request">httpRequest() </a>

To use the `responseProvider` functions, you need to  
import the <a href="https://techdocs.akamai.com/edgeworkers/docs/create-response">create-response</a>, <a href="https://techdocs.akamai.com/edgeworkers/docs/streams">streams</a>,  
<a href="https://techdocs.akamai.com/edgeworkers/docs/text-encode-transform">text-encode-transform</a>, and <a href="https://techdocs.akamai.com/edgeworkers/docs/http-request">http-request </a>modules.
</td>

</tr>

<tr>

<td>Manipulate the response (body, headers)</td>

<td><a href="https://techdocs.akamai.com/edgeworkers/docs/create-response#createresponse">createResponse()</a></td>

</tr>
</tbody>

</table>

> 📘 Cookie Management methods
>
> To use theCookie Management methods, you need to import the <a a href="https://techdocs.akamai.com/edgeworkers/docs/cookies">cookies </a> module.

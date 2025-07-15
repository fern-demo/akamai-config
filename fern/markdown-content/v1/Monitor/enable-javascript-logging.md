---
title: "JavaScript logging"
slug: "enable-javascript-logging"
excerpt: ""
hidden: false
createdAt: "Thu May 06 2021 21:09:01 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Apr 24 2025 17:56:10 GMT+0000 (Coordinated Universal Time)"
---
JavaScript logging captures log messages generated during the current request. You can deliver the JavaScript logs via [Enhanced debug headers](doc:enable-enhanced-debug-headers) or a [DataStream 2 stream](doc:ds2-javascript-logging).

In addition to logging static strings, you can also use variable substitution to include [dynamic data](doc:enable-javascript-logging#add-dynamic-data-to-log-messages) in the EdgeWorkers logs. 

> 🚧 When adding JavaScript logging to your EdgeWorkers make sure that sensitive data is not included in the log output.

The following restrictions apply to JavaScript logging headers:

- Logging headers are not cached.
- The logging header includes all messages logged for the specified event handler.
- The maximum log size per event handler is 1024 bytes. 
- If the log contents exceed 1024 bytes the results are truncated.

# Use enhanced debug headers to view JavaScript logs

For information about how to retrieve logs for the `responseProvider` event handler see, [Enable JavaScript logging for responseProvider](doc:enable-javascript-logging#enable-javascript-logging-for-responseprovider).

1. To view the JavaScript logging results you need to set up your property for [enhanced debug headers](doc:enable-enhanced-debug-headers).

2. Import the built-in [log](doc:log)  module.

```javascript
import {logger} from 'log' // Import the logger module export function
```

3. Add the logging messages into the event handlers of your choice. You can add EdgeWorkers log messages to all event handlers.

> 👍 You can also use format specifiers to add dynamic data to the log messages.

```javascript
import { logger } from 'log'; // Import the logger module export function
export function onClientRequest (request) {
  logger.log('gold');
}
export function onOriginRequest (request) {
  logger.log('silver');
}
export function onOriginResponse (request, response) {
  logger.log('bronze');
}
export function onClientResponse (request, response) {
  logger.log('iron');
}
export function responseProvider (request) {
  logger.log('steel');
}
```

4. Activate your EdgeWorkers code bundle that now includes the built-in log module.

5. To view the log data you can use this curl request that adds the `Pragma: Akamai-X-Ew-Debug` and the `Akamai-EW-Trace` headers. These headers retrieve the logging information.

```curl
curl -i 'http://www.example.com/ -H 'Pragma: akamai-x-ew-debug' -H 'Akamai-EW-Trace: eyJ0eXAiOiJKV1Qi ... iu1XOS9eJOl-54Ywd'
```

This example lists the corresponding logging response header for each event handler.  A response header is only returned when logging information is available for the event.

```text
"X-Akamai-EdgeWorker-onClientRequest-Log: D:main.js:4 gold\r\n"
"X-Akamai-EdgeWorker-onOriginRequest-Log: D:main.js:8 silver\r\n"
"X-Akamai-EdgeWorker-onOriginResponse-Log: D:main.js:12 bronze\r\n"
"X-Akamai-EdgeWorker-onClientResponse-Log: D:main.js:16 iron\r\n"
```

6. You can also use the `akamai-x-ew-log` header to specify the [log](doc:log) level. The available log levels, in ascending order of severity, are `trace`, `debug`, `info`, `warn`, and `error`. In the request header below, `akamai-x-ew-log-level: error`, specifies that **error** level messages should be included in the logs.

```curl
curl "http://www.example.com" -H 'Pragma: akamai-x-ew-debug' -H 'akamai-x-ew-log' -H 'akamai-x-ew-log-level: error' -H 'Akamai-EW-Trace: eyJ0eXAiOiJKV1Qi ... iu1XOS9eJOl-54Yw
```

## Enable JavaScript logging for responseProvider

JavaScript logging for the `responseProvider` event handler includes a multi-part response. It consists of the expected response body followed by an additional section that contains the `responseProvider` debug fields.

With streamed responses, this information is not available until the event handler ends.

> 📘 For `responseProvider` you need to add the Pragma `akamai-x-ew-debug-rp` header that enables the multi-part response header. If the `responseProvider` event handler is not implemented, a status of **UnimplementedEventHandler** will appear in the standard trace header.

1. Make sure that  you've [enabled enhanced debug headers](doc:enable-enhanced-debug-headers)  and added the [built-in log](doc:log) module to your EdgeWorkers function.

2. Here’s a curl request that adds the Pragma `akamai-x-ew-debug-rp` multi-part response header and the `Akamai-EW-Trace` header to retrieve the JavaScript logging information:

```curl
curl -i 'http://www.example.com/ -H 'Pragma: akamai-x-ew-debug-rp' -H 'Akamai-EW-Trace: eyJ0eXAiOiJKV1Qi ... iu1XOS9eJOl-54Yw'
```

In the multi-part response output below, the original body is separated from the trailing debug information by the `j50cx0rLZHkfMieMHdE7HM` randomized boundary string.

```shell
HTTP/1.1 200 OK
Content-Type: multipart/form-data; boundary=j50cx0rLZHkfMieMHdE7HM
content-disposition: attachment
Date: Thu, 22 Oct 2020 19:08:18 GMT
Content-Length: 1871
Connection: keep-alive
X-Akamai-EdgeWorker-onClientResponse-Info: ew=[EdgeWorker ID] v1.0:Example; status=Success; status_msg=-; wall_time=0.037; cpu_time=0.037; sc_ver=2.15.14; pearl_ver=2.0.1; ew_exe_ip=198.18.231.68; heap_usage=0
X-Akamai-EdgeWorker-onClientRequest-Info: ew=[EdgeWorker ID] v:Example; status=UnimplementedEventHandler; sc_ver=; pearl_ver=2.0.1; ew_exe_ip=198.18.231.68
AK_EIP_FORWARDER_IP: 
X-Powered-By: Akamai EdgeWorkers
--j50cx0rLZHkfMieMHdE7HM
content-type: application/json
content-disposition: form-data; name="response-provider-body"
{"endPoint1":{"manifest1":{ ... }},"endPoint2":{"manifest2":{ ... }},"endPoint3":{"manifest3":{ ... }}}
--j50cx0rLZHkfMieMHdE7HM
content-type: text/plain;charset=UTF-8
content-disposition: form-data; name="stream-trace"
X-Akamai-EdgeWorker-ResponseProvider-Info: ew=[EdgeWorker ID] v1.0:Example; status=Success; status_msg=-; wall_time=18.921; cpu_time=5.892
X-Akamai-EdgeWorker-responseProvider-Log: D:main.js:40 SubRequests Completed - Resulting JSON {"endPoint1":{"manifest1":{ ... }},"endPoint2":{"manifest2":{ ... }},"endPoint3":{"manifest3":{ ... }}}
--j50cx0rLZHkfMieMHdE7HM--
```

3. You can also use the `akamai-x-ew-log` header to specify the [log](doc:log) level. The available log levels, in ascending order of severity, are `trace`, `debug`, `info`, `warn`, and `error`. In the request header below, `akamai-x-ew-log-level: error`, specifies that **error** level messages should be included in the logs.

```curl
curl -i 'http://www.example.com/ -H 'Pragma: akamai-x-ew-debug-rp'-H 'akamai-x-ew-log' -H 'akamai-x-ew-log-level: error' -H 'Akamai-EW-Trace: eyJ0eXAiOiJKV1Qi ... iu1XOS9eJOl-54Yw'
```

# Use DataStream 2 to deliver the JavaScript logs

For complete instructions that include how to set up a DataStream 2 stream and a log destination, refer to the [Use DataStream 2 to deliver JavaScript logs](doc:javascript-logging) tutorial.

1. Import the [log](doc:log) built-in module in the `main.js` file. The log built-in module logs messages generated during the current request.

```javascript
// Import logging module
import { logger } from 'log';

export function onClientRequest (request) {
  logger.trace("onClientRequest test trace level");
  logger.debug("onClientRequest test  debug level");
  logger.info("onClientRequest test  info level");
  logger.warn("onClientRequest test  warn level");
  logger.error("onClientRequest test  error level");


  request.respondWith(
    200, {},
    '<html><body><h1>Hello World From Akamai EdgeWorkers</h1></body></html>');
}

export function onClientResponse (request, response) {
  logger.trace("onClientResponse test  trace level");
  logger.debug("onClientRequest test  debug level");
  logger.info("onClientResponse test  info level");
  logger.warn("onClientResponse test  warn level");
  logger.error("onClientResponse test  error level");

  response.setHeader('X-Hello-World', 'From Akamai EdgeWorkers');
}
```

2. Add the logging parameter to the `bundle.json` file. You can set the JavaScript logging level in the code bundle. By default, EdgeWorkers logs are set to ERROR.  
   Use the `ds2id` you created to stream the logs. For more information see, [Use DataStream 2 to deliver JavaScript logs](doc:javascript-logging).

```json
{
    "edgeworker-version": "0.3",
    "description" : "Hello World Observability Example",
    "config": {
    "logging": {
        "level":"warn",
        "schema": "v1",
        "ds2id": 68215
    }
  }
}
```

You can also use [EdgeWorkers CLI](https://github.com/akamai/cli-edgeworkers) to change the log level.

```curl
curl -i 'http://www.example.com/ -H 'Pragma: akamai-x-ew-debug-rp'-H 'akamai-x-ew-log' -H 'akamai-x-ew-log-level: error' -H 'Akamai-EW-Trace: eyJ0eXAiOiJKV1Qi ... iu1XOS9eJOl-54Yw'
```

# Add dynamic data to log messages

You can also add dynamic data to your logging output. For example, you can include information such as JavaScript variables or information about the specific request.

> 📘 Make sure that you do not include sensitive information in the log messages.  
> When adding data to your JavaScript log use **variable substitution** instead of manual string concatenation or string templates. Variable substitution is recommended for performance reasons.

1. JavaScript logging supports the [WhatWG](https://console.spec.whatwg.org/) open specifications to enable variable substitution. 

   You can use these format specifiers when using variable substitution to add data.

| Specifier | Result                                                                       |
| :-------- | :--------------------------------------------------------------------------- |
| %s        | Converts an argument into a string and inserts it into the JavaScript log.   |
| %d or %i  | Converts an argument into an integer and inserts it into the JavaScript log. |
| %f        | Converts an argument into float and inserts it into the JavaScript log.      |
| %o or %O  | Converts an argument into JSON and inserts it into the JavaScript log.       |
| %%        | Inserts a verbatim "%" into the JavaScript log.                              |

2. This example imports the built-in log module and includes information about the host, method, and path used during the EdgeWorkers `onClientRequest` event handler.

```javascript
import {logger} from 'log';
export function onClientRequest(request) {
   logger.log("The request's host is: %s", request.host);
   logger.log("The request's method is: %s", request.method)
   logger.log("The request's path is: %s", request.path)
   if (request.scheme == 'https') {
       logger.log('This is an https request')
   } else {
       logger.log('This is an http request')
   }
}
```

3. This curl request that passes the Pragma `akamai-x-ew-debug` and the `Akamai-EW-Trace` token to the web site <https://www.example.com>.

```curl
curl -i 'https://www.example.com' -H 'Pragma:akamai-x-ew-debug' -H 'Akamai-EW-Trace: eyJ0eXAiOiJKV1Qi ... iu1XOS9eJOl-54Yw'
```

This example shows that the log provides information about the host, method, and path used during the EdgeWorkers `onClientRequest` event handler.

```shell
X-Akamai-EdgeWorker-onClientRequest-Log: D:main.js:4 The request's host is : www.example.com |D::5 The request's method is : GET|D::6 The request's path is : /reflect.html|D::11 This is an http request
```

# JavaScript logging for subWorkers

Each EdgeWorkers event can generate a 1 KB log. This means that a single subWorker invocation can potentially generate a 4 KB log. This makes logging the largest contributor to the subWorkers debugging response headers.

If your log response headers are hitting these limits, making it difficult to debug a particular subWorker, you can specify the `akamai-x-ew-subworkers-log` request header. The value of this header should be a comma separated list of the EdgeWorker IDs you want to include in the logs. Any EdgeWorkers not on this list will not produce log headers for the request. 

This request specifies a single EdgeWorker ID to log `akamai-x-ew-subworkers-log: 809212161`.

```curl
curl -i '<http://example.com'> -X GET -H 'Akamai-EW-Trace: eyJhb...Xrg' -H 'Pragma: akamai-x-ew-debug, akamai-x-ew-debug-log, akamai-x-ew-subworkers' -H 'akamai-x-ew-subworkers-log: 809212161'

HTTP/1.1 200 OK  
Content-Type: text/html  
Content-Length: 18  
Expires: Thu, 25 Jan 2024 16:15:00 GMT  
Cache-Control: max-age=0, no-cache, no-store  
Pragma: no-cache  
Date: Thu, 25 Jan 2024 16:15:00 GMT  
Connection: keep-alive  
X-Akamai-EdgeWorker-onClientResponse-Info-11efe: ew=809212161 v:swparent; status=UnimplementedEventHandler  
X-Akamai-EdgeWorker-onClientRequest-Log-11efe: D:main.js:8 root request OCR  
X-Akamai-EdgeWorker-onClientRequest-Info-11efe: ew=809212161 vc14e39809f55f159475c12f9b06ba671_1:swparent; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=3.191; init_cpu_time=0; cpu_time=0.325; memory_usage=1640  
x-akamai-edgeworker-onclientresponse-info-11e63.11efe: ew=296717999 v:swchild; status=UnimplementedEventHandler  
x-akamai-edgeworker-onclientrequest-info-11e63.11efe: ew=296717999 v1:swchild; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=0.133; init_cpu_time=0; cpu_time=0.079; memory_usage=380
```

This request specifies multiple EdgeWorker IDs to log `akamai-x-ew-subworkers-log: 809212161,29671799`.

```curl
curl -i '<http://example.com'> -X GET -H 'Akamai-EW-Trace: eyJ...Xrg' -H 'Pragma: akamai-x-ew-debug, akamai-x-ew-debug-log, akamai-x-ew-subworkers' -H 'akamai-x-ew-subworkers-log: 809212161,296717999'

HTTP/1.1 200 OK  
Content-Type: text/html  
Content-Length: 18  
Expires: Thu, 25 Jan 2024 16:18:42 GMT  
Cache-Control: max-age=0, no-cache, no-store  
Pragma: no-cache  
Date: Thu, 25 Jan 2024 16:18:42 GMT  
Connection: keep-alive  
X-Akamai-EdgeWorker-onClientResponse-Info-12130: ew=809212161 v:swparent; status=UnimplementedEventHandler  
X-Akamai-Edgeworker-Subrequests-12130: ew=809212161; evt=CReq; id=1; method=GET; url="<http://127.0.0.1/?x=sw_root_to_sw_child">; rsp=200; dur=4; req_id=11e65  
X-Akamai-EdgeWorker-onClientRequest-Log-12130: D:main.js:8 root request OCR  
X-Akamai-EdgeWorker-onClientRequest-Info-12130: ew=809212161 vc14e39809f55f159475c12f9b06ba671_1:swparent; status=Success; status_msg=-; res_tier=200; init_wall_time=0.339; wall_time=4.957; init_cpu_time=0.339; cpu_time=0.395; memory_usage=220332  
x-akamai-edgeworker-onclientresponse-info-11e65.12130: ew=296717999 v:swchild; status=UnimplementedEventHandler  
x-akamai-edgeworker-onclientrequest-log-11e65.12130: D:main.js:5 child request OCR  
x-akamai-edgeworker-onclientrequest-info-11e65.12130: ew=296717999 v1:swchild; status=Success; status_msg=-; res_tier=200; init_wall_time=0.13; wall_time=0.182; init_cpu_time=0.129; cpu_time=0.085; memory_usage=5276
```

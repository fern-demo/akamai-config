---
title: "Use a Content Security Policy to cut latency, not security"
slug: "content-security-policy"
---
A Content Security Policy (CSP) is a security feature implemented in web browsers. It protects websites and web applications from attacks such as cross-site scripting (XSS) and data injection. To provide protection, CSP controls and limits the source of the various types of content loaded and executed on a web page. This content includes scripts, stylesheets, and images.

You can also go to the [EdgeWorkers Edge Compute demo site](https://www.edgecompute.live/) to see this use case example in action and to view the underlying code.

EdgeWorkers provides numerous performance benefits for CSPs. These policies also need to complement the security measures on the application server-side. To ensure comprehensive protection for your web application you need an in-depth strategy that combines:

- Server-side security
- Edge security
- Edge-based CSP headers

> 📘 Ensure your caching setup is correctly configured
> 
> While the [caching](https://techdocs.akamai.com/property-mgr/docs/know-caching) configuration isn’t covered here, it’s crucial to remember that the real value lies in the ability to apply dynamic CSP to cached content for every request. Only then will you fully realize the benefits of CSP and eliminate the need for repeated trips to the origin server.

# **How CSP works and how it ties into the HTML source**

## Define a CSP header

A CSP is typically defined server-side by setting a special HTTP header called `Content-Security-Policy` in the response sent by the web server when a user requests a web page. This header specifies the rules that the browser should follow when loading and executing content on the page. You can define the CSP header in various ways depending on your server technology. For example, in Node, you can set it like this, `res.set(“Content-Security-Policy: directive1 value1; directive2 value2; …”);`.

## Directives and values

The CSP header consists of directives and their corresponding values. These directives define the rules for various types of resources. For example, the `script-src` directive specifies the allowed sources for JavaScript files, and the `style-src` directive specifies the allowed sources for stylesheets.

Here's an example of a CSP header.

```html
Content-Security-Policy: default-src ‘self’; script-src ‘self’ <https://static.example.com>; style-src ‘self’ ‘unsafe-inline’;
```

- `default-src self` By default, loads all content from the same origin as the page itself.
- `script-src` Allows scripts to load from the same origin and from the specified external source. In this example the source is`<https://static.example.com>` . 
- `style-src` Allows stylesheets to load from the same origin and also supports inline styles.

## Tie into HTML

Once the CSP header is set on the server, the browser enforces these rules when loading resources on the web page. In the HTML source, developers can add elements like and to reference external resources. The browser will then check the CSP header to ensure that these resources comply with the defined rules. If a resource is not allowed by the CSP, the browser will block its execution.

## Unique on every request

CSP headers are typically static and consistent for all requests to a particular web page. They are not unique on every request. You can, however, use CSP in combination with nonce values or hashes to allow for dynamic inline scripts and styles while maintaining security. Nonces and hashes ensure that even if the source of a script or style is not explicitly listed in the CSP, it can still execute if it matches the nonce or hash value specified in the CSP header. These nonce values or hashes can change on each request, making them unique. They also need to be generated and managed on the server-side. Or do they? Keep reading to learn how the EdgeWorkers solution can resolve this issue.

# **EdgeWorkers solution**

Implementing the dynamic CSP nonce at the Edge with EdgeWorkers can provide significant advantages. Nonce generation and insertion server-side can be difficult to do and can impact performance. Let’s delve into some of the advantages that EdgeWorkers offers.

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/cspEdgeWorkers-v2.jpg" alt="Image"/>
</Frame>


## Reduced latency

EdgeWorkers generated nonces eliminate the need for high-latency calls to the origin server. This is achieved by dynamically generating and embedding nonces into cached content. This process traditionally posed challenges due to the requirement that the CSP be unique for each request. With EdgeWorkers, we can generate and embed nonces into cached content at the Edge for every request. 

This serverless and distributed approach:

- Serves CSPs from edge locations in the closest geographical proximity to users.
- Provides a scalable environment for CSP processing.
- Processes CSPs independently of the primary application servers.

## Distributed security

CSP nonce generation at the edge establishes an additional layer of security distinct from the application code. The CSP EdgeWorker can help mitigate risks due to application vulnerabilities before requests even reach end users.

## Ease of maintenance

Managing the dynamic nonce for the CSP at the edge with a serverless approach simplifies maintenance tasks. You can centrally update CSP policies at the edge without modifying the application code itself. This reduces deployment complexities and the likelihood of introducing bugs. You can use a single consistent EdgeWorkers function, applied across all applications, as a central point of control.

# **Extend with EdgeKV**

While this article primarily discusses the generation and insertion of CSP nonces into your CSP headers and HTML, it’s equally feasible to extend the advantages described here to manage the complete CSP header using EdgeWorkers and EdgeKV. This approach also simplifies the process of creating customized CSP policies tailored to specific pages.

Let’s first set the baseline of what our origin server is sending and then we’ll write our EdgeWorkers function. 

Here's the CSP header.

```html
Content-Security-Policy: default-src ’self;script-src 'nonce-replaceWithGeneratedNonceForEveryRequest';worker-src 'none';object-src \*;style-src 'self' 'unsafe-inline'; ….
```

Here's the HTML snippet.

```html
<script nonce="nonce-replaceWithGeneratedNonceForEveryRequest">
    document.getElementById("example").innerHTML = "This content was inserted using an inline script";
</script>
<script type=‘module" src="script.js" nonce="nonce-replaceWithGeneratedNonceForEveryRequest"></script>
```

## Generate the nonce

A **nonce** is a cryptographic value that changes with each request. It's a critical component in preventing certain types of attacks, such as cross-site scripting (XSS). The generated nonce should be a cryptographically secure random number that is supported through the [crypto](doc:crypto) module and [getRandomValues()](doc:crypto#getrandomvalues) function. As a best practice the prefix, `nonce-` is appended  to the value. This nonce will allow only trusted scripts to execute on the page.

### Generate a  random number

The `crypto.getRandomValues()` method is called with a `Uint32Array`  length of 1. This method generates a cryptographically secure 32 bit random number and stores it in the array. Cryptographically secure randomness is important for generating nonces to ensure they cannot be easily predicted or manipulated by attackers.

```javascript
let array = new Uint32Array(1);  
crypto.getRandomValues(array);
```

### Base64 encoding

The string representation of the random number is encoded using Base64 encoding via the [btoa](doc:encoding#btoa) function exported by the [encoding](doc:encoding) module. [Base64](doc:encoding#base64) encoding is a common way to convert binary data into a string of ASCII characters. These character are suitable for use in HTTP Headers and HTML. Here it ensures that the nonce value contains characters that are safe to include in both HTML attributes and HTTP headers.

```javascript
let encodedData = btoa(stringToEncode);
```

## Append the nonce to the CSP header

The CSP header defines which sources of content are safe for loading and execution. In this step, the code retrieves the original CSP header from the origin response. It then uses the `parsePolicy` custom function to parse the CSP policy. The CPS header also isolates the directive related to the  `script-src` script sources.

By replacing the original script sources with the generated nonce, the code only executes scripts with this specific nonce. This effectively prevents unauthorized scripts from running.

- **Get the origin response** - The code uses the [http-request](doc:http-request) EdgeWorkers module to asynchronously fetch content from the origin.
  ```javascript
  let htmlResponse = await httpRequest(“/”);
  ```
- **Extract the Origin CSP Header** - The response received from the origin contains headers, including the Content-Security-Policy (CSP) header. The `getHeader()` function retrieves an array of values associated with the `Content-Security-Policy` header.
  ```javascript
  let originCSPHeader = htmlResponse.getHeader(‘Content-Security-Policy’)[0];
  ```
- **Parse the CSP Policy** - The `parsePolicy()` function is a custom function used to parse the CSP header string into a structured object. This object maps CSP directives, such as `script-src` to their respective values.
  ```javascript
  policy.split(“;”).forEach((directive) => {  
  const [directiveKey, …directiveValue] = directive.trim().split(/\\s+/g);  
  if (directiveKey && !Object.hasOwnProperty.call(result, directiveKey)) {  
  result[directiveKey] = directiveValue;  
  }  
  });
  ```
- **Create the CSP header with the EdgeWorkers dynamically generated nonce** -  The `parsedPolicyElement` obtained from the previous step, represents the default script source value, is replaced in  `originCSPHeader` with the generated nonce. The resulting `newCspHeader` is an updated CSP header string that includes the generated nonce for script sources.
  ```javascript
  let responseHeaders = htmlResponse.getHeaders();  
  let parsedPolicyElement = parsedPolicy[‘script-src’][0].toString();  
  let newCspHeader = originCSPHeader.replace(parsedPolicyElement, “'”+nonce+“'”);  
  responseHeaders[‘content-security-policy’] = [newCspHeader];
  ```

## Rewrite the HTML with the nonce

The code utilizes the [html-rewriter](doc:htmlrewriter) EdgeWorkers module to manipulate the HTML content of the response. It dynamically injects the generated nonce into the HTML. Any existing script elements that possess the original origin nonce are updated to use the new dynamically generated nonce.

- `rewriter.onElement()` Registers a handler to run when a CSS selector matches. The callback function allows us to write code to modify the html content.
- `rewriter.onElement()` Matches on the origin nonce selector. The callback uses the `setAttribute()` method to modify the value of the nonce attribute for the matched element. The new value is set to the dynamically generated nonce.

```javascript
rewriter.onElement(‘[nonce=’ + parsedPolicyElement + ‘]’, el => {
el.setAttribute(‘nonce’, encodedData, {quote: “'”})
});
```

# **The Result**

For every request a nonce is generated, added to the CSP header, and then injected into the HTML source.

Here's the CSP Header.

```html
Content-Security-Policy: default-src 'self';script-src 'nonce-Mzky0TklNzclOQ==';worker-src 'none';object-src. \*;style-src 'self' 'unsafe-inline'; …
```

Here's the HTML snippet.

```html
<script nonce= "Mzky0TklNzclOQ--">
    document.getElementById("example’').innerHTML = "This content was inserted using an inline script";
</script>
<script type='module' src="script.js" nonce=’MzkyQTklNzclOQ--’></script>
```

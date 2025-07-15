---
title: "Execution Environment"
slug: "execution-environment"
excerpt: ""
hidden: true
createdAt: "Thu Feb 29 2024 19:31:56 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Feb 29 2024 23:31:58 GMT+0000 (Coordinated Universal Time)"
---
The CLI loads the `config.js` file in the EdgeWorker directory as a module.

- The CLI will obey Node import rules for config.js, meaning that developers can use NPM modules normally.
- The CLI will run the export named `onConfig` with an argument of type RuleBuilder as the argument (see below).
- The CLI generate rules from the argument passed in.
  - Calling functions on the argument will mutate it.
  - The CLI will ignore the return value of onConfig().
- onConfig() will not be able to access any configuration necessary to reference the property (such as setting hostnames, property id, groups, etc).

# TypeScript Classes

- The object passed to onConfig() will be of the type RuleBuilder.
- All methods on RuleBuilder will return a RuleBuilder, allowing function chaining.
- A separate CriteriaBuilder type will include all criteria, named in a manner described below.
- Parameters to RuleBuilder functions will be TypeScript primitives: strings, booleans, numbers, and Arrays of primitives.
- Complex PAPI options (such as the cloudletconfig type for a cloudletPolicy parameter) should be mapped to typed objects (as defined by a TypeScript interface).  
  This will be a P2. We can define the types as TypeScript a object to allow customers to pass arbitrary structures in to the API.

# Calling Criteria and Behaviors

- Criteria will be prefixed with the string `on`. e.g. The contentType criteria will be inserted with the onContentType() matcher.  
  The `on` prefix is chosen so it feels like we're adding an event listener, similar to DOM event handlers (e.g. onClick(), onChange(), onError())  
  Behaviour will be prefixed with the string `set`. e.g. The allowOptions behaviour can be inserted with the setAllowOptions() command.  
  The `set` prefix is used to indicate we're changing the receiver.  
  The prefixes are added so  
  devs can easily select a type of functionality with code complete. e.g.  
  typing config.on and triggering Intellisense will supply the developer with a listing of all matchers,  
  while triggering Intellisense after config.set will supply the developer with a list of all commands  
  the resulting code looks a bit nicer. Original PoCs for the tech preview do not include a prefix and they don't look as nice as the examples with `on` and `set`.

The API will introduce setters, which allow customers to amend the previous arguments to a command.  
The setter will be prefixed with `set` and suffixed with the parameter name that is being rewritten.  
e.g. setOriginCompress(v: boolean) will allow the customer to update the value of the compress parameter to a previously called setOrigin().  
The setter will find the parameters to the previous call by iterating up towards the root of the tree, stopping when it arrives at the first command with the corresponding name.  
The system will throw an exception from the setter when a named behaviour can't be found in current rule's ancestors.  
The system will not raise exceptions for logically inconsistent setters (e.g. a setter that changes an originType without updating the associated options)

All options will be passed in to matchers and behaviours as part of a named object.  
e.g. .onPathName({values: [".png", ".jpg", ".svg", ".ico"]} )  
Customers will be able to omit options  
with a default value (aka defaultVal in the PM catalog JSON).  
whose visibility condition is not met.  
We will support visibility conditions: (P2)  
with an eq, neq, or in operator, where the values are a literal list.  
Options with unsupported visibility conditions will be made optional.  
Unsupported options will be flagged in the documentation, so customers will understand that the full feature was omitted for tech preview.  
For options whose visibility condition is not met (ie, they are not used with the current set of values), we should consider throwing an exception when they are passed in. (P2)  
This would prevent customers from accumulating useless parameters when iterating - they would be forced to delete or comment out unused options.  
If all parameters have a default, customers will be able to omit the object literal (P2)  
e.g. .setPrefetchable()  
Options will be required if  
They have no default value.  
Their visibility condition is met, and it uses one of the supported conditions (P2). 

The API will allow users to specify items stored elsewhere in PAPI by id, and insert the full definition automatically. (P2)  
e.g. cpcodes, as described in EW-20231.

# Composing PAPI Rule Trees

The RuleBuilder and CriteriaBuilder types are normal TypeScript/JavaScript objects, meaning that they can be passed into other functions without restriction.  
This means rules can be added in other files, using standard JavaScript import syntax (import and require).  
This sort of looks like mild dependency injection:  
Rule tree composition with function calls Expand source

The downside is that customers must use the supplied RuleBuilder object: they can't create an instance of RuleBuilder, configure it, and then graft it onto the one passed into onConfig()  
The following reinterpretation of the code above does not work:

UNSUPPORTED Workflow showing customer instantiation of PAPIBuilder Expand source

Reasons to avoid instantiation of RuleBuilder:  
Setters need to walk the tree above to raise an exception if the command is missing. If a setter is added in a disconnected branch (ie, one created by new RuleBuilder), then it can't validate the tree above.  
The RuleBuilder class needs to be supplied as a dependency in JavaScript. If customers want to import config.js in their EdgeWorker, then we need to provide an Edge-side implementation of the RuleBuilder to import.  
This is a design decision that can be relaxed with minor ramifications. Such work is outside the scope of the tech preview, however. 

In a post-tech-preview environment, we would presumably run onConfig() during dual activation of the property and EdgeWorker. If that's the case, we would probably want to support the inclusion of other EdgeWorkers via JavaScript composition.

# Branching

Repeated calls to any return value of a RuleBuilder object will produce a new branch in the rule tree.  
Customers can also produce a new branch with the .setup() function on RuleBuilder  
The only parameter of the .setup()  function is a callback.  
The callback will be called immediately with the receiving RuleBuilder instance passed in as an argument.  
This is consistent with the .setup() function described in the original document.  
The return value of the .setup() will be ignored.  
The functions called on the RuleBuilder argument will be inserted into the rule tree as descendents of the current PAPI node.

# Boolean Operations

## Boolean NOT

There does not appear to be a NOT operator in PAPI. We will not provide workarounds.  
(P2) For matchers that provide an internal negation (e.g. when the hostname matchOperator is set to IS_NOT_ONE_OF), then we will provide an unless prefix that implicitly sets the matchOperator to the negated value.

## Boolean AND

The API will not provide an AND operator. Customers can nest matchers instead.

## Boolean OR

We will provide an OR operator named .any().  
Consistent with the Promise API and the existing criteriaMustSatisfy rule property.  
.any() will accept a single callback as an argument.  
The callback will take an argument that may have multiple matchers chained on it.  
The callback argument will implement the Matcher interface described above.  
Only matchers may be called on the argument, ie, the user can't add commands to the argument, or call .setup() or .any().  
The intent is to implement .any() with a single PAPI JSON Rule. Allowing commands on it would complicate that goal.  
Be aware that there a minor inconsistency with this approach. The calls to the criteria parameter in the callback are inconsistent with the branching behaviour described above. 

Consider:

cfg  
  .onPath({values: ["/a*"]})  
  .onHostname({values: ["host"]})  
  .onFileExtension({values: [".js"]})  
  // CONSIDER THIS SPOT

In the normal onConfig() flow, that is a boolean AND. Any command added after the onFileExtension() runs only if the matchers have matched. However, in the .any() callback:

cfg  
  .any(criteria => {  
    criteria  
      .onPath({values: ["/a*"]})  
      .onHostname({values: ["host"]})  
      .onFileExtension({values: [".js"]})  
      // CONSIDER THIS SPOT  
  })

the location after the onFileExtension() looks like a branch from the previous example, but it follows a different convention: everything there runs, and the developer can't add a command. 

The alternatives involve more typing and adding more items to the namespace.

Each matcher could be built with a function:

cfg.any(OnPath(...), OnHostName(...), OnFileExtension(...))  
This requires exporting a separate function for each matcher. Those extra functions could confuse the user. 

The callback passed to .any() could return an array of matchers:

cfg  
  .any(criteria => \[  
      criteria.onPath({values: ["/a*"]}),  
      criteria.onHostname({values: ["host"]}),  
      criteria.onFileExtension({values: [".js"]})  
  ])  
This succeeds in feeling different to the developer, but it's a bit awkward. It also requires more typing. 

# Inline Documentation

We will attempt to integrate documentation into the API.  
Documentation will come from internal YAML doc sources.  
Documentation will be inserted for  
Functions.  
Each option in the option list. (P2)  
Values in value lists. (P2)  
The default value of options will be noted. (P2)

# Examples

## General example

```javascript
export function onConfig(cfg : RuleBuilder) {
    cfg.setCaching({ behavior: "NO_STORE" });
 
    cfg.setModifyOutgoingResponseHeader({ action: "ADD", standardAddHeaderName: "OTHER", customHeaderName: "new-header", newHeaderValue: "unconditional" });
 
    cfg
        .onPath({ values: ["/p1*"] })
        .setConstructResponse({ body: "up in /p1" });
 
    cfg
        .onPath({ values: ["/p2"] })
        .setModifyOutgoingResponseHeader({ action: "ADD", standardAddHeaderName: "OTHER", customHeaderName: "my-header", newHeaderValue: "v" })
        .setConstructResponse({ body: "deep in /p2" });
}
```

## Using .setup()

The API will look very similar to the original proposal. 

```javascript
export function onConfig(config: RuleBuilder): void {
  config
    .onHost({values: ["my-subdomain.example.org"]})
    .setup((config) => {
      config
        .setCaching({ttl: "7d"});
 
      config
        .onFileExtension({values: [".png", ".jpg", ".svg", ".ico"]})
        .setPrefetchable();
    });
}
```

will generate

Example PAPI JS generated from .setup() Expand source

## Looping

You can generate PAPI JSON by using loops and function calls in your JavaScript. Revisiting the composition example from above, we could see:

```json
const MY_PATH_MAPPINGS = {
  '/products/*': {origin: "prod.customer.com", ttl: "10d"},
  '/services/*': {origin: "services.customer.com", ttl: "14d"},
  '/deals/*': {origin: "deals.customer.com", ttl: "5m"}
};
 
export function onConfig(config : RuleBuilder) {
  config.setCaching({ttl: "7d"});
 
  for (const key in MY_PATH_MAPPINGS) {
    let subTree: RuleBuilder = config.onPath({values: [key]});
 
    makeTreeForMapping(subTree, MY_PATH_MAPPINGS[key]);
  }
}
 
/** Receives a builder that is already scoped by path */
function makeTreeForMapping(subTree: RuleBuilder, subTreeInfo: {origin: string, ttl: string}) {
   subTree
      .setOrigin({originType: "CUSTOMER", hostname: subTreeInfo.origin})
      .setCaching({values: [subTreeInfo.ttl]});
}
```

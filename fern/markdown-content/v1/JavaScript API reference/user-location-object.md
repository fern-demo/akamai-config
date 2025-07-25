---
title: "User Location Object"
slug: "user-location-object"
excerpt: ""
hidden: false
createdAt: "Tue May 04 2021 22:11:13 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Feb 20 2025 16:39:54 GMT+0000 (Coordinated Universal Time)"
---
The `userLocation` request object contains properties that specify the geographic location of the client that initiated a given [request](request-object.md). The IP address of the requesting device determines the client's location. If the HTTP request contains an `X-Forwarded-For` header, this header will be used to provide the location. Otherwise the connecting IP address will be used. 

For more information, see the EdgeScape documentation available in the [Download Center](https://control.akamai.com/apps/download-center/).

# areaCodes

Returns a `userLocation` object that specifies the area codes of the incoming request. Multiple values are supported. This is a read-only Array.

```javascript
// Request originates in the city of Cambridge
request.userLocation.areaCodes;
// => [ "617" ]
```

# bandwidth

Returns a `userLocation` object that estimates the expected bandwidth of the incoming request. Refer to the [Bandwidth range](https://control.akamai.com/apps/download-center/?redirect=/artifacts/263;name=bw_codes.txt) file for syntax. This is a read-only string value.

```javascript
// Estimated bandwidth of the incoming request.
request.userLocation.bandwidth;
// => "257"
```

# city

Returns a `userLocation` object that specifies the city name, within a 50-mile radius, of the incoming request. For syntax, you can download the [Cities](https://control.akamai.com/apps/download-center/#/products/3;name=EdgeScape) ZIP file from the EdgeScape Datacodes. This is a read-only string value.

```javascript
// Request originates in the city of Cambridge
request.userLocation.city;
// => "CAMBRIDGE"
```

# continent

Returns a `userLocation` object that specifies the two letter code for the continent of the incoming request. Refer to the [Continent Code list](https://control.akamai.com/apps/download-center/?redirect=/artifacts/261;name=continentCodes.csv) for syntax. This is a read-only string value.

```javascript
// Request originates in North America
request.userLocation.continent;
// => "NA"
```

# country

Returns a `userLocation` object that specifies the ISO-3166, two letter code for the country of the incoming request. Refer to the [Country Code list](https://downloadcenter.akamai.com/CoreFeatures/Datacodes/ef08fa4d-25af-4861-ac93-4af34546487c/country_codes.csv?__DLC__=exp=1740066677~hmac=732c44df7eecdc3e8feb9077ba8c66ea673a602ac3a7ea346074baee8244e483) for syntax. This is a read-only string value.

```javascript
// Request originates in United States
request.userLocation.country;
// => "US"
```

# dma

Returns a `userLocation` object that specifies the DMA value of the incoming request. The DMA value is a mapping of major American metropolises to containing and neighboring states. Refer to the [DMA list](https://control.akamai.com/apps/download-center/?redirect=/artifacts/262;name=dma_list.txt) file for syntax. This is a read-only string value.

```javascript
// Request originates in Boston
request.userLocation.dma;
// => "506"
```

# fips

Returns a `userLocation` object that specifies a 5 digit numerical code for the incoming request. The FIPS code helps to map counties to states. Multiple values are supported. Refer to the [FIPS codes](https://transition.fcc.gov/oet/info/maps/census/fips/fips.txt) file for syntax. This is a read-only Array.

```javascript
// Request originates in Massachuseetts
request.userLocation.fips;
// => ["25"]
```

# latitude

Returns a `userLocation` object that specifies the latitude of the incoming request.  
This is a read-only string value.

```javascript
// Request originates from Akamai headquarters
request.userLocation.latitude;
// => "42.364948"
```

# longitude

Returns a `userLocation` object that  specifies the longitude of the incoming request.  
This is a read-only string value.

```javascript
// Request originates from Akamai headquarters
request.userLocation.longitude;
// => "-71.088783"
```

# networkType

Returns a `userLocation` object that specifies the network type of the incoming request. Refer to the [Network type codes](https://control.akamai.com/apps/download-center/?redirect=/artifacts/2831;name=network-type_codes.txt) for syntax. This is a read-only string value.

```javascript
// Request originates from a mobile network
request.userLocation.networkType;
// => "mobile"
```

# region

Returns an ISO-3166, two-letter code for the state, province, or region of the incoming request. Refer to the [State/Region Code list](https://control.akamai.com/dl/edgescape/region_codes.txt) for syntax. This is a read-only string value.

```javascript
// Request originates in the state of Massachusetts
request.userLocation.region;
// => "MA"
```

# timezone

Returns a `userLocation` object that specifies the timezone of the incoming request. Refer to the [Timezone list](https://control.akamai.com/apps/download-center/?redirect=/artifacts/276;name=timezone.txt) for syntax. This is a read-only string value.

```javascript
// Request originates from the Greenwich Mean Time time zone
request.userLocation.timezone;
// => "GMT"
```

# zipCode

Returns a `userLocation` object that specifies the zip code of the incoming request. Contiguous zip codes are represented as a range "FirstZipInRange-LastZipInRange". Multiple values are separated by the plus (+) character. For example, the following strings are all valid zipCode values:

- 10001

- 10001+10003

- 10001-10003+10005

- 10001-10003+10005-10008

 For country = US and country = PR, zip refers to the five digit zip code. For  
            country = CA, zip refers to the Forward Sortation Area (FSA). For more information on  
            FSA, go to [http://www.canadapost.ca](http://www.canadapost.ca) and search for FSA. Refer to the [Zip Code](https://control.akamai.com/dl/edgescape/zipcodes.txt) list for syntax. This is a read-only string value.

```javascript
// Request originates in a Cambridge zipcode
request.userLocation.zipCode;
// => "02114+02134+02138-02142+02163+02238"
```

node-red-contrib-nmea
=====================

A <a href="http://nodered.org" target="_new">Node-RED</a> node to decode NMEA format messages.

Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

    npm i node-red-contrib-nmea

Usage
-----
A node that parses NMEA sentences into a JavaScript objects containing the data.

Specify the input property containing an NMEA sentence (default `msg.payload`).

Latitude and longitude values will be parsed into decimal degrees. If the NMEA sentence contains a date and timestamp, the property `dateTime` will be a JavaScript `Date` object representation of the date and time.

Example output object for a RMC sentence (as JSON):
```
{
    "sentence":"RMC",
    "type":"nav-info",
    "timestamp":"163948.00",
    "status":"valid",
    "lat":44.617677,
    "latPole":"N",
    "lon":-87.93293367,
    "lonPole":"W",
    "speedKnots":7.143,
    "trackTrue":31.54,
    "date":"111020",
    "variation":0,
    "variationPole":"",
    "talker_id":"GP",
    "dateTime":"2020-10-11T16:39:48.000Z"
}
```

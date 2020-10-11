module.exports = function(RED) {
    "use strict";
    var nmea = require('nmea');
    var util = nmea.Helpers;

    function NMEANode(config) {
        RED.nodes.createNode(this,config);
        this.property = config.property || "payload";
        var node = this;
        node.on('input', function(msg, send, done) {
            var value = RED.util.getMessageProperty(msg, node.property);
            if (value !== undefined) {
                try {
                    msg.payload = nmea.parse(value);
                    if ((msg.payload.date) && (msg.payload.timestamp)) {
                        msg.payload.dateTime = util.parseDateTime(msg.payload.date, msg.payload.timestamp);
                    }
                    if ((msg.payload.lat) && (msg.payload.latPole)) {
                        msg.payload.lat = parseFloat(util.parseLatitude(msg.payload.lat, msg.payload.latPole));
                    }
                    if ((msg.payload.lon) && (msg.payload.lonPole)) {
                        msg.payload.lon = parseFloat(util.parseLongitude(msg.payload.lon, msg.payload.lonPole));
                    }
                } catch (err) {
                    if (done) {
                        // Node-RED 1.0 compatible
                        done(err);
                    } else {
                        // Node-RED 0.x compatible
                        node.error(err, msg);
                    }
                }
                send = send || function() { node.send.apply(node,arguments) }
                node.send(msg);
                if (done) {
                    done();
                }
            } else {
                node.warn("no data on property " + this.property);
            }
        });
    }
    RED.nodes.registerType("nmea", NMEANode);
}
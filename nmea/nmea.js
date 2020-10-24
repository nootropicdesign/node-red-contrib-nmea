module.exports = function(RED) {
    "use strict";
    var nmea = require('nmea');
    var util = nmea.Helpers;

    function NMEANode(config) {
        RED.nodes.createNode(this,config);
        this.property = config.property || "payload";
        this.outputProperty = config.outputProperty || "payload";
        var node = this;
        node.on('input', function(msg, send, done) {
            var value = RED.util.getMessageProperty(msg, node.property);
            if (value !== undefined) {
                try {
                    var output = nmea.parse(value);
                    if ((output.date) && (output.timestamp)) {
                        output.dateTime = util.parseDateTime(output.date, output.timestamp);
                    }
                    if ((output.lat) && (output.latPole)) {
                        output.lat = parseFloat(util.parseLatitude(output.lat, output.latPole));
                    }
                    if ((output.lon) && (output.lonPole)) {
                        output.lon = parseFloat(util.parseLongitude(output.lon, output.lonPole));
                    }
                    RED.util.setMessageProperty(msg, node.outputProperty, output, true);
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
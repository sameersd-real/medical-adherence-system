/**
 * ESP32 Espruino JavaScript Firmware
 * Flash this onto an ESP32 running Espruino firmware.
 */

var wifi = require("Wifi");
var http = require("http");

var WIFI_NAME = "YOUR_WIFI_SSID";
var WIFI_PASS = "YOUR_WIFI_PASSWORD";
var SERVER_HOST = "192.168.1.5"; // Your computer's IP running server.js
var SERVER_PORT = 3000;

var BUTTON_PIN = NodeMCU ? NodeMCU.D4 : D4; // Button on GPIO 4
var LED_PIN = D2; // Onboard LED

var clickCount = 0;
var clickTimer = null;
var DOUBLE_CLICK_WINDOW = 500; // ms

function connectWifi() {
  console.log("Connecting to Wi-Fi...");
  wifi.connect(WIFI_NAME, { password: WIFI_PASS }, function(err) {
    if (err) {
      console.log("Wi-Fi connection error: " + err);
      return;
    }
    console.log("Connected to Wi-Fi! IP: " + wifi.getIP().ip);
  });
}

function sendDoubleClickedEvent() {
  var postData = JSON.stringify({
    clicks: 2,
    action: "double_click"
  });

  var options = {
    host: SERVER_HOST,
    port: SERVER_PORT,
    path: "/api/esp/button-press",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": postData.length
    }
  };

  console.log("Sending dose-taken event to server...");
  var req = http.request(options, function(res) {
    var data = "";
    res.on("data", function(chunk) { data += chunk; });
    res.on("close", function() {
      console.log("Server Response: " + data);
      digitalWrite(LED_PIN, 1);
      setTimeout(function() { digitalWrite(LED_PIN, 0); }, 300);
    });
  });

  req.on("error", function(err) {
    console.log("HTTP Error: " + err.message);
  });

  req.end(postData);
}

// Watch button pin for falling edge (active LOW)
pinMode(BUTTON_PIN, "input_pullup");
setWatch(function(e) {
  clickCount++;
  if (clickTimer) clearTimeout(clickTimer);

  if (clickCount === 2) {
    clickCount = 0;
    console.log("Double click detected on ESP32 button!");
    sendDoubleClickedEvent();
  } else {
    clickTimer = setTimeout(function() {
      clickCount = 0;
    }, DOUBLE_CLICK_WINDOW);
  }
}, BUTTON_PIN, { repeat: true, edge: "falling", debounce: 50 });

connectWifi();

/*
 * ESP32 Smart Medicine Adherence Box - Firmware
 * ----------------------------------------------
 * Features:
 * 1. Double-click button detection (when clicked 2 times within 500ms):
 *    - Confirms medicine is taken
 *    - Sends HTTP POST request to Node.js backend: /api/esp/button-press
 *    - Server records taken dose with date & time in MongoDB 'medic'
 * 2. Visual / Audio Feedback:
 *    - LED and Buzzer confirmation on double click
 * 3. Wi-Fi reconnection handling
 */

#include <WiFi.h>
#include <HTTPClient.h>

// ==========================================
// CONFIGURATION - Update with your credentials
// ==========================================
const char* WIFI_SSID     = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// Server URL (Replace with your computer's local IP address, e.g., 192.168.1.5)
const char* SERVER_URL    = "http://192.168.1.5:3000/api/esp/button-press";

// Hardware Pin Definitions
const int BUTTON_PIN = 4;   // Pushbutton connected between GPIO 4 and GND (Active LOW)
const int LED_PIN    = 2;   // Onboard LED or external LED
const int BUZZER_PIN = 18;  // Buzzer pin

// ==========================================
// Button Double-Click Detection Variables
// ==========================================
const unsigned long DEBOUNCE_DELAY     = 50;   // 50ms debounce time
const unsigned long DOUBLE_CLICK_TIME  = 500;  // 500ms max window for 2 clicks

int clickCount              = 0;
unsigned long lastClickTime = 0;
int lastButtonState         = HIGH;
int buttonState             = HIGH;
unsigned long lastDebounceTime = 0;

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\n[ESP32] Initializing Smart Medicine Adherence Box...");

  // Configure Pins
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);

  // Connect to Wi-Fi
  connectToWiFi();
}

void loop() {
  // Ensure Wi-Fi remains connected
  if (WiFi.status() != WL_CONNECTED) {
    connectToWiFi();
  }

  handleButton();
}

// ==========================================
// Wi-Fi Connection Helper
// ==========================================
void connectToWiFi() {
  Serial.print("[ESP32] Connecting to Wi-Fi: ");
  Serial.println(WIFI_SSID);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n[ESP32] Wi-Fi Connected!");
    Serial.print("[ESP32] IP Address: ");
    Serial.println(WiFi.localIP());
    beepSuccess();
  } else {
    Serial.println("\n[ESP32] Failed to connect to Wi-Fi. Retrying in loop...");
  }
}

// ==========================================
// Double-Click Detection State Machine
// ==========================================
void handleButton() {
  int reading = digitalRead(BUTTON_PIN);

  // Debouncing
  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > DEBOUNCE_DELAY) {
    if (reading != buttonState) {
      buttonState = reading;

      // Button pressed (Active LOW)
      if (buttonState == LOW) {
        unsigned long now = millis();

        if (clickCount == 0) {
          // First click
          clickCount = 1;
          lastClickTime = now;
          Serial.println("[ESP32] Click 1 registered! Waiting for 2nd click...");
        } else if (clickCount == 1 && (now - lastClickTime <= DOUBLE_CLICK_TIME)) {
          // Second click within 500ms -> DOUBLE CLICK!
          clickCount = 0;
          Serial.println("\n[ESP32] *** DOUBLE CLICK DETECTED! ***");
          Serial.println("[ESP32] Medicine dose taken confirmed.");

          // Beep confirmation
          beepDouble();

          // Send POST request to backend
          sendDoseTakenEvent();
        }
      }
    }
  }

  // Reset click count if timeout exceeded without second click
  if (clickCount == 1 && (millis() - lastClickTime > DOUBLE_CLICK_TIME)) {
    Serial.println("[ESP32] Single click timeout. Resetting.");
    clickCount = 0;
  }

  lastButtonState = reading;
}

// ==========================================
// Send HTTP POST to Backend
// ==========================================
void sendDoseTakenEvent() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[ESP32] Cannot send event: Wi-Fi not connected!");
    return;
  }

  HTTPClient http;
  http.begin(SERVER_URL);
  http.addHeader("Content-Type", "application/json");

  // Send JSON payload indicating double click (clicks: 2)
  String jsonPayload = "{\"clicks\":2,\"action\":\"double_click\"}";

  Serial.print("[ESP32] Sending POST to: ");
  Serial.println(SERVER_URL);
  Serial.print("[ESP32] Payload: ");
  Serial.println(jsonPayload);

  int httpResponseCode = http.POST(jsonPayload);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.print("[ESP32] Response code: ");
    Serial.println(httpResponseCode);
    Serial.print("[ESP32] Response body: ");
    Serial.println(response);

    if (httpResponseCode == 200 || httpResponseCode == 201) {
      Serial.println("[ESP32] SUCCESS: Dose saved to MongoDB 'medic'!");
      beepSuccess();
    }
  } else {
    Serial.print("[ESP32] Error sending POST: ");
    Serial.println(http.errorToString(httpResponseCode));
  }

  http.end();
}

// ==========================================
// Audio / Visual Feedback
// ==========================================
void beepDouble() {
  for (int i = 0; i < 2; i++) {
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(BUZZER_PIN, HIGH);
    delay(100);
    digitalWrite(LED_PIN, LOW);
    digitalWrite(BUZZER_PIN, LOW);
    delay(100);
  }
}

void beepSuccess() {
  digitalWrite(LED_PIN, HIGH);
  digitalWrite(BUZZER_PIN, HIGH);
  delay(300);
  digitalWrite(LED_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);
}

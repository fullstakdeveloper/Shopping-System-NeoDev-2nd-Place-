#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h> // Include the appropriate library for your WiFi module

#define RST_PIN         5           // Configurable, see typical pin layout above
#define SS_PIN          10          // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance

String cardUID; // Variable to store the card UID as a string

// WiFi credentials
const char* ssid = "DEN1880"; // Your network SSID (name)
const char* password = "Den@14Erb!"; // Your network password
const char* server = "yourapi.com"; 

void setup() {
  Serial.begin(9600);                                           // Initialize serial communications with the PC
  SPI.begin();                                                  // Init SPI bus
  mfrc522.PCD_Init();                                           // Init MFRC522 card
  Serial.println(F("Read personal data on a MIFARE PICC:"));    // shows in serial that it is ready to read
  
  // Connect to WiFi
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);                                   // Connect to WiFi network
  
  // Wait for connection
  int attempts = 0; // Add a counter to limit attempts
  while (WiFi.status() != WL_CONNECTED && attempts < 100) { // Limit to 10 attempts
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println();
    Serial.println("Connected to WiFi!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.println();
  } else {
    Serial.println();
    Serial.println("Failed to connect to WiFi.");
  }
}

void loop() {
  // Prepare key - all keys are set to FFFFFFFFFFFFh at chip delivery from the factory.
  MFRC522::MIFARE_Key key;
  for (byte i = 0; i < 6; i++) key.keyByte[i] = 0xFF;

  // Some variables we need
  byte block;
  byte len;
  MFRC522::StatusCode status;

  // Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return;
  }

  // Select one of the cards
  if (!mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  Serial.println(F("**Card Detected:**"));

  // Store UID in a variable
  cardUID = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    // Add each byte to the cardUID string in hexadecimal format
    cardUID += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    cardUID += String(mfrc522.uid.uidByte[i], HEX);
  }

  // Print UID
  Serial.print(F("Card UID: "));
  Serial.println(cardUID);

  // Make an API request
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    
    // Connect to the server
    if (client.connect(server, 80)) { // Use port 80 for HTTP
      client.println("POST /item HTTP/1.1"); // Replace with your API endpoint
      client.println("Host: yourapi.com"); // Change to your API host
      client.println("{rfid_tag:\"" + cardUID + "\"}")
      client.println("Connection: close");
      client.println(); // End of header
      
      // Wait for the server response
      while (client.connected() || client.available()) {
        if (client.available()) {
          String line = client.readStringUntil('\n');
          Serial.println(line); // Print the server response
        }
      }
      client.stop(); // Disconnect
    } else {
      Serial.println("Connection failed");
    }
  } else {
    Serial.println("WiFi not connected");
  }

  Serial.println(F("\n**End Reading**\n"));

  delay(1000); // change value if you want to read cards faster

  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();
}

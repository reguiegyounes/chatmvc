import React from "react";
import { View, Button } from "react-native";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect } from "react";

let connection = new HubConnectionBuilder()
  .withUrl("http://192.168.43.195:5000/chatHub")
  .build();

// 				builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000").AllowCredentials();

function App() {
  const handleSendMessage = () => {
    connection
      .invoke("SendMessage", "user", "test message")
      .catch(function (err) {
        return console.error(err.toString());
      });
  };

  const Connect = async () => {
    if (connection) {
      try {
        const result = await connection.start();

        console.log("Connected!");

        connection.on("ReceiveMessage", (message) => {
          console.log(message);
        });
      } catch (e) {
        console.log("Connection failed: ", e);
      }
    }
  };

  useEffect(() => {
    Connect();
  }, []);

  return (
    <View className="App">
      <Button title="send Message" onPress={handleSendMessage} />
    </View>
  );
}

export default App;

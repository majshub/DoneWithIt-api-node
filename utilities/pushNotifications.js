const { Expo } = require("expo-server-sdk");

// Initialize the Expo SDK
const expo = new Expo();

const sendPushNotification = async (targetExpoPushToken, message) => {
  // Create a message object
  const messages = [
    { to: targetExpoPushToken, sound: "default", body: message },
  ];

  // Chunk messages to send in batches
  const chunks = expo.chunkPushNotifications(messages);

  // Function to send a chunk of notifications
  const sendChunk = async (chunk) => {
    try {
      const tickets = await expo.sendPushNotificationsAsync(chunk);
      console.log("Tickets:", tickets);

      // Check the response to identify failed tickets and handle them
      const failedTickets = tickets.filter(
        (ticket) => ticket.status === "error"
      );
      if (failedTickets.length > 0) {
        console.log("Failed tickets:", failedTickets);
      }
    } catch (error) {
      console.error("Error sending chunk", error);
    }
  };

  // Send all chunks in parallel
  try {
    await Promise.all(chunks.map((chunk) => sendChunk(chunk)));
    console.log("All chunks sent");
  } catch (error) {
    console.error("Error sending notifications", error);
  }
};

module.exports = sendPushNotification;

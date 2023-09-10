import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: "BraceMinder-channel-id", // A unique ID for the channel
    channelName: "Your Channel Name", // The name of the channel
    channelDescription: "notification channel for BraceMinder mobile application", // Description of the channel
    soundName: "default", // Sound to play when a notification is received
    importance: 4, // Importance level (0 - 4, where 4 is the highest)
    vibrate: true, // Vibration when a notification is received
  },
  (created) => console.log(`PushNotification channel created: ${created}`)
);

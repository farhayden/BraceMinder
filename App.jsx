/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import scheduleLocalNotification from './services/RemindersService';
import React, { useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { BottomTabNav } from './services/Navigation';

function App() {

  const checkPermission = async () => {
    const enabled = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    console.log("Permission granted: " + enabled);
    if (enabled) {
      console.log("Permission granted");
    } else {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(() => { console.log("Permission granted true"); }
    )};
  }
  const createNotificationChannel = async () => {
    PushNotification.createChannel(
      {
        channelId: "BraceMinder-channel-id", // A unique ID for the channel
        channelName: "BraceMinder", // The name of the channel
        channelDescription: "notification channel for BraceMinder mobile application", // Description of the channel
      },
      (created) => console.log(`PushNotification channel created: ${created}`)
    );
  };
  useEffect(() => {
    checkPermission();
    createNotificationChannel();
  }, []);
    

return <BottomTabNav/>;
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;

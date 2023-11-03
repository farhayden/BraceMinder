/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import {BottomTabNav} from './services/Navigation';
import {ImageProvider} from './services/ImageContext';
import {LogBox} from 'react-native';
import {ProfileProvider} from './services/ProfileLink';

LogBox.ignoreLogs([
  'Found screens with the same name nested inside one another.',
]);

function App() {
  const checkPermission = async () => {
    const enabled = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    console.log('Permission granted: ' + enabled);
    if (enabled) {
      console.log('Permission granted');
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ).then(() => {
        console.log('Permission granted true');
      });
    }
  };

  // const checkPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //       {
  //         title: 'Notification Permission',
  //         message: 'This app needs notification permissions to send you reminders.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       }
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Permission granted');
  //     } else {
  //       console.log('Permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  const createNotificationChannel = async () => {
    PushNotification.createChannel(
      {
        channelId: 'BraceMinder-channel-id', // A unique ID for the channel
        channelName: 'BraceMinder', // The name of the channel
        channelDescription:
          'notification channel for BraceMinder mobile application', // Description of the channel
        importance: Importance.HIGH,
      },
      created => console.log(`PushNotification channel created: ${created}`),
    );
  };
  useEffect(() => {
    checkPermission();
    createNotificationChannel();
  }, []);

  return (
    <>
      <ImageProvider>
        <ProfileProvider>
          <BottomTabNav />
        </ProfileProvider>
      </ImageProvider>
    </>
  );
}

export default App;

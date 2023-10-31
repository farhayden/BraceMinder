/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import scheduleLocalNotification from './services/RemindersService';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
  Button,
  TouchableOpacity,
} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { BottomTabNav } from './services/Navigation';
import ImageContext from './services/ImageContext';

import { ProfileProvider } from './services/ProfileLink';

function App() {
  const [images, setImages] = useState([]);

  const addImage = (image) => {
    console.log("Adding image:", image);
    setImages(prev => [...prev, image]);
  };

  const clearImages = () => {
    setImages([]);
  };

  const checkPermission = async () => {
    const enabled = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    console.log("Permission granted: " + enabled);
    if (enabled) {
      console.log("Permission granted");
    } else {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(() => { console.log("Permission granted true"); }
    )};
  }


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
        channelId: "BraceMinder-channel-id", // A unique ID for the channel
        channelName: "BraceMinder", // The name of the channel
        channelDescription: "notification channel for BraceMinder mobile application", // Description of the channel
        importance: Importance.HIGH,
      },
      (created) => console.log(`PushNotification channel created: ${created}`)
    );
  };
  useEffect(() => {
    checkPermission();
    createNotificationChannel();
  }, []);
    

return(<>
 <ProfileProvider>
  <View>
    {/* <Button title="Permissions" onPress={checkPermission}/> */}
  </View> 
  <ImageContext.Provider value={{ images, addImage, clearImages }}>
  <BottomTabNav/>
  </ImageContext.Provider>
  <BottomTabNav/></ProfileProvider>
</>);
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

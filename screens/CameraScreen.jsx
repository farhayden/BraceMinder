import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Button,
  Linking,
  Alert,
  useIsFocused, 
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCameraPermission,
} from 'react-native-vision-camera';

import { CameraRoll } from "@react-native-camera-roll/camera-roll";

import ImageContext from '../services/ImageContext';

export default function CameraScreen() {
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [images, setImages] = useState([]);

  const {hasPermission, requestPermission} = useCameraPermission();
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);
  const cameras = useCameraDevices(); // Handle camera devices
  const [selectedDevice, setSelectedDevice] = useState(
    cameras[1] || cameras[0]|| null,
  );



  useEffect(() => {
    (async () => {
      if (hasPermission === false) {
        const result = await requestPermission();
        if (!result) {
          setIsPermissionDenied(true);
        }
      }
    })();
  }, [hasPermission, requestPermission]);

  // useEffect(() => {
  //   if (cameras.BACK) {
  //     setSelectedDevice(cameras.BACK);
  //   } else if (cameras.FRONT) {
  //     setSelectedDevice(cameras.FRONT);
  //   }
  // }, [cameras]);

    if (!selectedDevice) {
     
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading camera...</Text>
        </View>
      );

    }
    const openSettings = () => {
      Linking.openSettings();
    };

    const flipCamera = () => {
      if (selectedDevice === cameras[1]) {
        setSelectedDevice(cameras[0]);
      } else {
        setSelectedDevice(cameras[1]);
      }
      console.log('actual camera :>> ', selectedDevice);
    };

    const takePicture = async () => {
      if (cameraRef.current && isCameraReady) {
        const file = await cameraRef.current.takePhoto()

Alert.alert(
  'Photo Taken',
  'Would you like to keep this photo?',
  [
    {
      text: 'Retake',
      onPress: retakePicture,
      style: 'cancel',
    },
    {
      text: 'Keep',
      onPress:  async () => {
        try {
          await CameraRoll.save(`file://${file.path}`, { type: 'photo' });
          // Update the context with the new image
          setImages(prevImages => {
            console.log("Adding new image to state:", `file://${file.path}`);
            console.log('Images :>> ', images);
            return [...prevImages, `file://${file.path}`];
          });
        } catch (error) {
          console.error("Failed to save the image", error);
        }
      },
    },
      //style: 'default',
  ],
  {
    cancelable: false, // user must select one of the options
  },
);
      } else {
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#FFFFFF'}}>You need to grant camera permissions to use this feature.</Text>
          </View>
        );
      }
  };

    const retakePicture = () => {
      setPhoto(null);
    };

    if (hasPermission === true) {
      return (
        <View style={{flex: 1}}>
          {photo === null ? (
            <View style={{flex: 1}}>
              <Camera
                style={{flex: 1}}
                ref={cameraRef}
                device={selectedDevice}
                photo = {true}
                isActive={true}
                onInitialized={() => setIsCameraReady(true)}
              />

              <TouchableOpacity
                onPress={flipCamera}
                style={{position: 'absolute', top: 10, right: 10,}}>
                <Text style={{color: '#FFFFFF'}}>Flip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={takePicture}
                style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
                <Text style={{color: '#FFFFFF'}}>Take photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <Image
                source={{uri: photo}}
                style={{flex: 1}}
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={retakePicture}
                style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
                <Text style={{color: '#FFFFFF'}}>Retake</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    } else if (isPermissionDenied) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#FFFFFF'}}>You need to grant camera permissions to use this feature.</Text>
          <Button title="Open App Settings" onPress={openSettings} />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#FFFFFF'}}>Requesting permissions...</Text>
        </View>
      );
    }
  }


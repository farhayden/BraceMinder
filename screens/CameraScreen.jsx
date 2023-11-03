/**
 * CameraScreen component - Provides functionality to take a photo, flip the camera, and handle camera permissions.
 * Allows users to preview, save or retake the photo after capturing. The taken photo can be saved to the device's gallery.
 *
 * @module CameraScreen
 */

import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Button,
  Linking,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCameraPermission,
} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import ImageContext from '../services/ImageContext';

import CameraButton from '../assets/CameraButton.png';
import FlipCamera from '../assets/FlipCamera.png';

export default function CameraScreen() {
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const {images, setImages, addImage} = useContext(ImageContext);
  const {hasPermission, requestPermission} = useCameraPermission();
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);
  const cameras = useCameraDevices(); // Handle camera devices
  const [selectedDevice, setSelectedDevice] = useState(
    cameras[1] || cameras[0] || null,
  );
  const [showCamera, setShowCamera] = useState(true);

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
      setShowCamera(false);
      const file = await cameraRef.current.takePhoto();

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
            onPress: async () => {
              try {
                await CameraRoll.save(`file://${file.path}`, {type: 'photo'});

                addImage(`file://${file.path}`);
                setShowCamera(true);
              } catch (error) {
                console.error('Failed to save the image', error);
              }
            },
          },
        ],
        {
          cancelable: false, // user must select one of the options
        },
      );
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#FFFFFF'}}>
            You need to grant camera permissions to use this feature.
          </Text>
        </View>
      );
    }
  };

  const retakePicture = () => {
    setPhoto(null);
    setShowCamera(true);
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
              photo={true}
              isActive={showCamera}
              onInitialized={() => setIsCameraReady(true)}
            />

            <TouchableOpacity onPress={flipCamera} style={styles.flipButton}>
              <Image source={FlipCamera} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={takePicture}
              style={styles.takePhotoButton}>
              <Image source={CameraButton} />
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
              style={styles.takePhotoButton}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  } else if (isPermissionDenied) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#FFFFFF'}}>
          You need to grant camera permissions to use this feature.
        </Text>
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

const styles = StyleSheet.create({
  flipButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  takePhotoButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    padding: 12,
    borderRadius: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

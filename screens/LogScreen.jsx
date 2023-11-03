/**
 * MyLogScreen component - Displays a gallery of the last 15 images taken.
 * Allows the user to view each image in a modal and provides navigation to the Camera screen.
 * 
 * @module MyLogScreen
 */
import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, View, Modal, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import logo from "../assets/logo.png";
import cameraIcon from "../assets/cameraIcon.png"
import { styles } from '../assets/style.jsx';
import ImageContext from '../services/ImageContext';
//import useProfileLink from "../components/ProfileLink.js";

const LOGO = logo;
const CAMERA = cameraIcon;
const screenWidth = Dimensions.get('window').width;  // Get the width of the device screen
const imageSize = screenWidth / 5;  // Calculate the image size based on screen width

const rowGapSize = 20;  // Space between each row in the image gallery

const MyLogScreen = () => {
  const navigation = useNavigation();
  useProfileLink(navigation);
  const { images, addImage } = useContext(ImageContext);  // Image context provides a list of images and method to add images

  const [isModalVisible, setIsModalVisible] = useState(false);  // Modal visibility state
  const [selectedImage, setSelectedImage] = useState(null);  // Currently selected image to show in the modal

  // Log when images change
  useEffect(() => {
    console.log("Images changed, rerendering MyLogScreen:", images);
  }, [images]);

  // Update navigation header buttons
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={PROFILE} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <Image source={CAMERA} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Get the last 15 images
  const last15Images = images.slice(-15).reverse();

  // Open image modal with the selected image
  const openImageModal = (imageUri) => {
    setSelectedImage(imageUri);
    setIsModalVisible(true);
  };

  // Close the image modal
  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.logContainer}>
      <Image source={LOGO} style={styles.logo} />
      
      {/* Display images in a grid */}
      <FlatList
        keyExtractor={(item) => item}  
        data={last15Images}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openImageModal(item)}
            style={{ marginBottom: rowGapSize }}
          >
            <Image source={{ uri: item }} style={{ width: imageSize, height: imageSize }} />
          </TouchableOpacity>
        )}
        numColumns={5}
      />

      {/* Image modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={closeImageModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeImageModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
        </View>
      </Modal>
    </View>
  );
};

export default MyLogScreen;

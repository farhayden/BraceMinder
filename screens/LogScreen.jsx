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
import useProfileLink from "../services/ProfileLink";
import profileIcon from "../assets/profileIcon.png";

const PROFILE = profileIcon;
const LOGO = logo;
const CAMERA = cameraIcon
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / 5;

const rowGapSize = 20; // Adjust this value to set the desired gap size between rows

const MyLogScreen = () => {
  const navigation = useNavigation();
  useProfileLink(navigation);
  const { images } = useContext(ImageContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    console.log("Images changed, rerendering MyLogScreen:", images);
  }, [images]);
  

  useLayoutEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={PROFILE}/> 
            {/* style={styles.icon} */}
          </TouchableOpacity>
        ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <Image source={CAMERA}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Get the last 15 images
  const last15Images = images.slice(-15).reverse();

  const openImageModal = (imageUri) => {
    setSelectedImage(imageUri);
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.logContainer}>
      <Image source={LOGO} style={styles.logo} />
      
      <FlatList
       keyExtractor={(item) => item}  
        data={last15Images} // Use the last 15 images
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openImageModal(item)}
            style={{ marginBottom: rowGapSize }} // Add marginBottom to create a gap between rows
          >
            <Image source={{ uri: item }} style={{ width: imageSize, height: imageSize }} />
          </TouchableOpacity>
        )}
        numColumns={5}
      />

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

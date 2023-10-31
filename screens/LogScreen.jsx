import React, { useState, useContext, useLayoutEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, View, Modal, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import logo from "../assets/logo.png";
import { styles } from '../assets/style.jsx';
import ImageContext from '../services/ImageContext';
//import useProfileLink from "../components/ProfileLink.js";

const LOGO = logo;
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / 5;

const rowGapSize = 20; // Adjust this value to set the desired gap size between rows

const MyLogScreen = () => {
  const navigation = useNavigation();
  const { images } = useContext(ImageContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <TouchableOpacity onPress={() => navigation.navigate('Camera')} style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <MaterialCommunityIcons name="camera" size={40} color="#FFFFFF"/>
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

  // Get the last 15 images
  const last15Images = images.slice(-15);

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

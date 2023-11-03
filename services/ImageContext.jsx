/**
 * @module ImageContext
 * @description Provides a React context for managing images.
 * @requires react
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useState, useEffect } from 'react';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  
  const saveImages = async (newImages) => {
    try {
      await AsyncStorage.setItem('@images', JSON.stringify(newImages));
    } catch (e) {
      console.error("Failed to save images", e);
    }
  };

  const loadImages = async () => {
    try {
      const savedImages = await AsyncStorage.getItem('@images');
      if (savedImages !== null) {
        setImages(JSON.parse(savedImages));
      }
    } catch (e) {
      console.error("Failed to load images", e);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const addImage = (image) => {
    const updatedImages = [...images, image];
    setImages(updatedImages);
    saveImages(updatedImages);
  };

return (
  <ImageContext.Provider value={{ images, addImage }}>
    {children}
  </ImageContext.Provider>
);

}

export default ImageContext;

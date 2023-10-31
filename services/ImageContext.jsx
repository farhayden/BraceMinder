/**
 * @module ImageContext
 * @description Provides a React context for managing images.
 * @requires react
 */
import { createContext } from 'react';

const ImageContext = createContext({
  images: [],
  addImage: (image) => {},
  clearImages: () => {},
});

export default ImageContext;

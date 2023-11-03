/**
 * HowToScreen component - Displays a list of "how-to" items.
 * Allows the user to select a "how-to" item which then directs the user to a linked URL.
 * 
 * @module HowToScreen
 */

// Importing necessary modules
import { Image, FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';  // For opening external links
import {howToMenu} from "../data/menus";  // Importing the menu data
import { styles } from '../assets/style.jsx';  // Importing shared styles
import logo from "../assets/logo.png";  // Logo for the screen
import useProfileLink from "../services/ProfileLink";  // Service to manage profile link

const LOGO = logo;

// HowToScreen component definition
const HowToScreen = () => {
  const navigation = useNavigation();  // Get the navigation prop to navigate between screens

  // Service function to link the profile 
  useProfileLink(navigation);

  // Function to handle the press of an item
  const handlePress = (item) => {
    // Check if the item has a link
    if (item.link) {
      // Open the link in a browser
      Linking.openURL(item.link).catch((err) => console.error('Failed to open URL:', err));
    }
  };

  // Render the HowToScreen component
  return (
    <View style={styles.container}>
      <Image source={LOGO} style={styles.logo} />
      {/* Display list of items from the howToMenu */}
      <FlatList
        data={howToMenu}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Text style={styles.item}>{item.key}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Export the HowToScreen component
export default HowToScreen;

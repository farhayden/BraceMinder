/**
 * ProfileScreen Component
 * 
 * @file This file defines the ProfileScreen component. This component displays
 * the user's profile details and provides a button to navigate to the profile
 * editing screen.
 * 
 * @requires react
 * @requires react-native
 * @requires @react-navigation/native
 * @requires '../services/ProfileLink'
 */

import React, {useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from '../services/ProfileLink';

const ProfileScreen = () => {
  // Obtain the navigation prop from the Navigation context
  const navigation = useNavigation();
  
  // Destructure profileData from ProfileContext for displaying user information
  const { profileData } = useContext(ProfileContext);

  return (
    <View style={styles.container}>
      {/* Displaying user's name */}
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{profileData.name}</Text>

      {/* Displaying user's surname */}
      <Text style={styles.label}>Surname:</Text>
      <Text style={styles.value}>{profileData.surname}</Text>

      {/* Displaying user's email */}
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{profileData.email}</Text>

      {/* Displaying user's date of birth */}
      <Text style={styles.label}>DOB:</Text>
      <Text style={styles.value}>{profileData.dob}</Text>

      {/* Displaying user's sex */}
      <Text style={styles.label}>Sex:</Text>
      <Text style={styles.value}>{profileData.sex}</Text>

      {/* Button to navigate to profile editing screen */}
      <Button 
        title="Edit Profile" 
        onPress={() => navigation.navigate('Edit Profile')}
        style={styles.editButton}
      />
    </View>
  );
};

// Styling for the ProfileScreen component elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginTop: 5,
  },
  editButton: {
    marginTop: 20,
  }
});

export default ProfileScreen;

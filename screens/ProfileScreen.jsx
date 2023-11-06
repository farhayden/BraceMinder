import React, {useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { ProfileContext } from '../services/ProfileLink';

const ProfileScreen = () => {
  const navigation = useNavigation(); // Get the navigation prop
  const { profileData } = useContext(ProfileContext);


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{profileData.name}</Text>

      <Text style={styles.label}>Surname:</Text>
      <Text style={styles.value}>{profileData.surname}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{profileData.email}</Text>

      <Text style={styles.label}>DOB:</Text>
      <Text style={styles.value}>{profileData.dob}</Text>

      <Text style={styles.label}>Sex:</Text>
      <Text style={styles.value}>{profileData.sex}</Text>

      <Button 
        title="Edit Profile" 
        onPress={() => navigation.navigate('Edit Profile')} // Navigate to the editing screen
        style={styles.editButton}
      />
    </View>
  );
};

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

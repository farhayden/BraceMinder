/**
 * EditProfileScreen component - Allows the user to edit their profile information.
 * Provides input fields for editing name, surname, email, date of birth, and sex.
 * Once saved, updates the profile data in the ProfileContext.
 * 
 * @module EditProfileScreen
 */

// Importing necessary modules and components
import React, { useState , useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from '../services/ProfileLink';

const EditProfileScreen = () => {
    // Fetching the current profile data and the function to update it from ProfileContext
    const { profileData, setProfileData } = useContext(ProfileContext);

    // Navigation prop for screen navigation
    const navigation = useNavigation();

    // Local state to manage form data while editing
    const [formData, setFormData] = useState(profileData);

    // Function to handle the submission of edited profile data
    const handleSubmit = () => {
        setProfileData(formData); // Update the global profile data
        console.log('Updated profile:', profileData);
        navigation.goBack(); // Navigate back to the previous screen
    };

    // Rendering the component UI
    return (
        <View style={styles.container}>
            {/* Input field for Name */}
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
            />

            {/* Input field for Surname */}
            <Text style={styles.label}>Surname</Text>
            <TextInput
                style={styles.input}
                value={formData.surname}
                onChangeText={(text) => setFormData({ ...formData, surname: text })}
            />

            {/* Input field for Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
            />

            {/* Input field for Date of Birth */}
            <Text style={styles.label}>DOB</Text>
            <TextInput
                style={styles.input}
                value={formData.dob}
                onChangeText={(text) => setFormData({ ...formData, dob: text })}
            />

            {/* Input field for Sex */}
            <Text style={styles.label}>Sex</Text>
            <TextInput
                style={styles.input}
                value={formData.sex}
                onChangeText={(text) => setFormData({ ...formData, sex: text })}
            />

            {/* Button to save edited profile data */}
            <Button title="Save Profile" onPress={handleSubmit} />
        </View>
    );
};

// Styles for the EditProfileScreen component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        marginTop: 15,
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 4,
        padding: 10,
        fontSize: 16,
    },
});

// Export the EditProfileScreen component
export default EditProfileScreen;

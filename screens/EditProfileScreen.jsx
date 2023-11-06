import React, { useState , useContext} from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from '../services/ProfileLink';


const EditProfileScreen = () => {
    const { profileData, setProfileData } = useContext(ProfileContext);
    const navigation = useNavigation();
    const [formData, setFormData] = useState(profileData);

  const handleSubmit = () => {
    setProfileData(formData);
        console.log('Updated profile:', profileData);
        navigation.goBack();
      };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />

      <Text style={styles.label}>Surname</Text>
      <TextInput
        style={styles.input}
        value={formData.surname}
        onChangeText={(text) => setFormData({ ...formData, surname: text })}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />

      <Text style={styles.label}>DOB</Text>
      <TextInput
        style={styles.input}
        value={formData.dob}
        onChangeText={(text) => setFormData({ ...formData, dob: text })}
      />

      <Text style={styles.label}>Sex</Text>
      <TextInput
        style={styles.input}
        value={formData.sex}
        onChangeText={(text) => setFormData({ ...formData, sex: text })}
      />

      <Button title="Save Profile" onPress={handleSubmit} />
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

export default EditProfileScreen;
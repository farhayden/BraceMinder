import React, { useLayoutEffect, useState, useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import styles from "../assets/style.jsx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileIcon from "../assets/profileIcon.png"

const PROFILE = profileIcon;


export const ProfileContext = React.createContext({
  profileData: {
    name: '',
    surname: '',
    email: '',
    dob: '',
    sex: '',
  },
  setProfileData: () => {}
});
export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    name: "John",
    surname: "Doe",
    email: "johndoe@example.com",
    dob: "01/01/2000",
    sex: "Male",
  });

  const saveProfileData = async (data) => {
    try {
      await AsyncStorage.setItem('@profileData', JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save profile data", e);
    }
  };

  const loadProfileData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('@profileData');
      if (savedData !== null) {
        setProfileData(JSON.parse(savedData));
      }
    } catch (e) {
      console.error("Failed to load profile data", e);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const updateProfileData = (data) => {
    setProfileData(data);
    saveProfileData(data);
  };

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData: updateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

// --- useProfileLink Hook ---
function useProfileLink(navigation) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={PROFILE}/>
           {/* style={styles.icon} */}
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
}


// const styles = StyleSheet.create({
//     icon: {
//       flex: 1,
//       padding: 24,
      
//     }
// });
export default useProfileLink;
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from "../assets/style.jsx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileIcon from "../assets/profileIcon.png"

const PROFILE = profileIcon;

/**
 * Context for storing and managing user profile data.
 */
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

/**
 * Provider component to handle state and functions related to user profile data.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 */
export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    name: "John",
    surname: "Doe",
    email: "johndoe@example.com",
    dob: "01/01/2000",
    sex: "Male",
  });

  /**
   * Save profile data to AsyncStorage.
   * @param {object} data - Profile data to save.
   */
  const saveProfileData = async (data) => {
    try {
      await AsyncStorage.setItem('@profileData', JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save profile data", e);
    }
  };

  /**
   * Load profile data from AsyncStorage and set it to state.
   */
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

  /**
   * Update profile data and save it to AsyncStorage.
   * @param {object} data - New profile data.
   */
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

/**
 * Hook that sets the header left navigation option to a profile icon.
 * Clicking the icon navigates the user to the 'Profile' screen.
 * @param {object} navigation - Navigation object from react-navigation.
 */
function useProfileLink(navigation) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={PROFILE} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
}

export default useProfileLink;

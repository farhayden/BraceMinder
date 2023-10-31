import React, { useLayoutEffect, useState } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import profileIcon from "../assets/profileIcon.png"

const PROFILE = profileIcon;

// --- Profile Context ---
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

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
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
          <Image source={PROFILE} style={styles.icon}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
}


const styles = StyleSheet.create({
    icon: {
      flex: 1,
      padding: 24,
      
    }
});
export default useProfileLink;
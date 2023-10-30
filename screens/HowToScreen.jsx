import { Image, FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import {howToMenu} from "../data/menus";
import { styles } from '../assets/style.js';
import logo from "../assets/logo.png";
//import useProfileLink from "../components/ProfileLink";

const LOGO = logo;

const HowToScreen = () => {
  const navigation = useNavigation();

  //useProfileLink(navigation);

  const handlePress = (item) => {
    if (item.link) {
      Linking.openURL(item.link).catch((err) => console.error('Failed to open URL:', err));
    }
  };

  return (
    <View style={styles.container}>
        <Image source={LOGO} style={styles.logo} />
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


export default HowToScreen;
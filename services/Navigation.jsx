import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import HomeScreen from "../screens/HomeScreen";
import Reminders from "../screens/Reminders";
import ToothBrushing from "../screens/ToothBrushing";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import HowToScreen from "../screens/HowToScreen";
import MyLogScreen from "../screens/LogScreen";
import CameraScreen from "../screens/CameraScreen";
import RubberBands from "../screens/RubberBands";

import MyLogIcon from "../assets/MyLogIcon.png";
import HomeIcon from "../assets/HomeIcon.png";
import AlarmIcon from "../assets/AlarmIcon.png";
import HowToIcon from "../assets/HowToIcon.png";

import useProfileLink from "./ProfileLink";



const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HOMESCREENICON = "";
const REMINDERSCREENICON = "";

// const navigation = useNavigation();
//   useProfileLink(navigation);

function HomeStackScreen({ initialScreen }) {
    return (
      <HomeStack.Navigator
        initialRouteName={initialScreen}
        screenOptions={defaultScreenOptions}
      >
        <HomeStack.Screen name="Braceminder" component={HomeScreen} />
        <HomeStack.Screen name="Reminders" component={Reminders} />
        <HomeStack.Screen name="ToothBrushing" component={ToothBrushing} />
        <HomeStack.Screen name="Profile" component={ProfileScreen} />
        <HomeStack.Screen name="Edit Profile" component={EditProfileScreen} />
        <HomeStack.Screen name="How To" component={HowToScreen} />
        <HomeStack.Screen name="My Progress" component={MyLogScreen} />
        <HomeStack.Screen name="Camera" component={CameraScreen} />
        <HomeStack.Screen name="RubberBands" component={RubberBands} />
      </HomeStack.Navigator>
    );
}

function BottomTabNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="TabBraceminder"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
              source={HomeIcon}
              style={{ width: size, height: size }}
            />
            ),
            tabBarLabel: 'BraceMinder' // <-- Display name remains the same
          }}
        >
          {(props) => (
            <HomeStackScreen {...props} initialScreen="BraceMinder" />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Tab My Reminders"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
              source={AlarmIcon}
              style={{ width: size, height: size }}
            />
            ),
             tabBarLabel: 'Reminders' // <-- Display name remains the same 
          }}
        >
          {(props) => <HomeStackScreen {...props} initialScreen="Reminders" />}
        </Tab.Screen>

        <Tab.Screen
          name="Tab How To"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
              source={HowToIcon}
              style={{ width: size, height: size }}
            />
            ),
            tabBarLabel: 'How To' // <-- Display name remains the same
          }}
        >
          {(props) => <HomeStackScreen {...props} initialScreen="How To" />}
        </Tab.Screen>

        <Tab.Screen
          name="TabMy Log"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
              source={MyLogIcon}
              style={{ width: size, height: size }}
            />
            ),
            tabBarLabel: 'My Log' // <-- Display name remains the same
          }}
        >
          {(props) => <HomeStackScreen {...props} initialScreen="My Progress" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

  
  const defaultScreenOptions = {
    headerStyle: {
      backgroundColor: "rgb(65, 115, 222)",
    },
    headerTintColor: "white",
    headerTitleAlign: 'center',  
    headerTitleStyle: {
      fontWeight: "bold",
      flexGrow: 1,
  
    },
  };
  
  export { BottomTabNav };

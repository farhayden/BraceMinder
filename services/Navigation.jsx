import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import HomeScreen from "../screens/HomeScreen";
import Reminders from "../screens/Reminders";
import ToothBrushing from "../screens/ToothBrushing";
import HowToScreen from "../screens/HowToScreen";
import MyLogScreen from "../screens/LogScreen";

//Import icons
import HomeIcon from "../assets/HomeIcon.png";
import AlarmIcon from "../assets/AlarmIcon.png";
import HowToIcon from "../assets/HowToIcon.png";
import MyLogIcon from "../assets/MyLogIcon.png";

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HOMESCREENICON = "";
const REMINDERSCREENICON = "";

function HomeStackScreen({ initialScreen }) {
    return (
      <HomeStack.Navigator
        initialRouteName={initialScreen}
        screenOptions={defaultScreenOptions}
      >
        <HomeStack.Screen name="BraceMinder" component={HomeScreen} />
        <HomeStack.Screen name="Reminders" component={Reminders} />
        <HomeStack.Screen name="ToothBrushing" component={ToothBrushing} />
        <HomeStack.Screen name="How To" component={HowToScreen} />
        <HomeStack.Screen name="My Progress" component={MyLogScreen} />
      </HomeStack.Navigator>
    );
}

function BottomTabNav() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="BraceMinder"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Image
                source={HomeIcon}
                style={{ width: size, height: size }}
              />
              ),
            }}
          >
            {(props) => (
              <HomeStackScreen {...props} initialScreen="BraceMinder" />
            )}
          </Tab.Screen>
  
          <Tab.Screen
            name="My Reminders"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Image
                source={AlarmIcon}
                style={{ width: size, height: size }}
              />
              ),
            }}
          >
            {(props) => <HomeStackScreen {...props} initialScreen="Reminders" />}
          </Tab.Screen>
          <Tab.Screen
            name="How To"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Image
              source={HowToIcon}
              style={{ width: size, height: size }}
            />
              ),
            }}
          >
            {(props) => (
              <HomeStackScreen {...props} initialScreen="How To" />
            )}
          </Tab.Screen>
          <Tab.Screen
          name="My Progress"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
              source={MyLogIcon}
              style={{ width: size, height: size }}
            />
            ),
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

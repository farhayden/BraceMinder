import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


//Import screens
import HomeScreen from "../screens/HomeScreen";
import Reminders from "../screens/Reminders";
import ToothBrushing from "../screens/ToothBrushing";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import HowToScreen from "../screens/HowToScreen";
import MyLogScreen from "../screens/LogScreen";
import CameraScreen from "../screens/CameraScreen";

//Import icons
import HomeIcon from "../assets/HomeIcon.png";
import AlarmIcon from "../assets/AlarmIcon.png";
import HowToIcon from "../assets/HowToIcon.png";
import MyLogIcon from "../assets/MyLogIcon.png";

//Import services
import useProfileLink from "./ProfileLink";


const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen({ initialScreen }) {

  const navigation = useNavigation();
  useProfileLink(navigation);

    return (
      <HomeStack.Navigator
        initialRouteName={initialScreen}
        screenOptions={defaultScreenOptions}
      >
        <HomeStack.Screen name="BraceMinder" component={HomeScreen} />
        <HomeStack.Screen name="Reminders" component={Reminders} />
        <HomeStack.Screen name="ToothBrushing" component={ToothBrushing} />
        <HomeStack.Screen name="Profile" component={ProfileScreen} />
        <HomeStack.Screen name="Edit Profile" component={EditProfileScreen} />
        <HomeStack.Screen name="How To" component={HowToScreen} />
        <HomeStack.Screen name="My Progress" component={MyLogScreen} />
        <HomeStack.Screen name="Camera" component={CameraScreen} />
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

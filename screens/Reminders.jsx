import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet, Image, FlatList, Switch } from "react-native";
import ToothBrushing from "./ToothBrushing";
import RubberBands from "./RubberBands";
import { useNavigation } from "@react-navigation/native";
import scheduleLocalNotification from "../services/RemindersService";
import logo from "../assets/logo.png";
import tasks from "../data/tasks";

const LOGO = logo;

function RemindersScreen() {
    const navigation = useNavigation();
    const [taskSwitches, setTaskSwitches] = useState({});

    const handleSwitch = (taskId, value) => {
        setTaskSwitches(prevSwitches => ({
          ...prevSwitches,
          [taskId]: value // Using the task ID as the key to store each task's switch state
        }));
    };
  
    const handlePress = (screenName) => {
        navigation.navigate(screenName); // Navigate to the screen with the specified screenName
    };
      
    return (<>
        
        <View style={styles.container}>
            <Image source={LOGO} style={styles.logo} />
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePress(item.key)} style={styles.listItem}>
                        <Text style={styles.item}>{item.key}</Text>
                        <Switch
                            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                            trackColor={{ false: "#ffa500", true: "#50C878" }}
                            thumbColor={taskSwitches[item.id] ? "#ffffff" : "#fffffff"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => handleSwitch(item.id, value)}
                            value={taskSwitches[item.id] || false}  // This line makes sure each switch has its own unique state
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    </>);
}
const styles = StyleSheet.create({
    container: {
        flex: 0,
        height: "100%",
        flexDirection: "column",
        backgroundColor: '#ffffff',
        justifyContent: "space-around", // Center the content vertically
        alignItems: "center", // Center the content horizontally
    },
    logo: {
        width: 100, // Set a width for the logo
        height: 100, // Set a height for the logo (you can adjust as needed)
        resizeMode: "contain", // Keep the logo's aspect ratio
        marginBottom: 80
    },
    
    button: {
        borderRadius: 15,
        color: 'white',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        width: 200,
        backgroundColor: "#f7f7f7",
        color: 'black', 
        borderWidth: 1,   
        borderColor: 'black',
        borderRadius: 25, // Rounded edges
        marginBottom: 10, // Gap between items
        textAlign: 'center',
    
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around', // This already makes sure there's space between items
        padding: 5,
        width: '100%', // Use full width of the container
    },
}); 
export default RemindersScreen;

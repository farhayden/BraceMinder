/**
 * RemindersScreen Component
 * 
 * @file This file defines the RemindersScreen component. The component displays 
 * a list of tasks, each with a switch to enable or disable reminders. The list 
 * items are also clickable to navigate to a corresponding detail screen.
 * 
 * @requires react
 * @requires react-native
 * @requires @react-navigation/native
 * @requires "../services/RemindersService"
 * @requires "../assets/logo.png"
 * @requires "../data/tasks"
 * @requires "../services/ProfileLink"
 */

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/logo.png";
import tasks from "../data/tasks";
import useProfileLink from "../services/ProfileLink";

const LOGO = logo;

function RemindersScreen() {
    const navigation = useNavigation();
    useProfileLink(navigation);
    const [taskSwitches, setTaskSwitches] = useState({});

    /**
     * Toggle the state of the switch for a given task.
     * @param {number} taskId - The ID of the task.
     * @param {boolean} value - The new switch value.
     */
    const handleSwitch = (taskId, value) => {
        setTaskSwitches(prevSwitches => ({
            ...prevSwitches,
            [taskId]: value
        }));
    };

    /**
     * Navigate to the specified screen.
     * @param {Object} screenName - The name of the screen to navigate to.
     */
    const handlePress = (screenName) => {
        navigation.navigate(screenName.key);
    };

    return (
        <View style={styles.container}>
            <Image source={LOGO} style={styles.logo} />
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePress(item)} style={styles.listItem}>
                        <Text style={styles.item}>{item.key}</Text>
                        <Switch
                            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                            trackColor={{ false: "#ffa500", true: "#50C878" }}
                            thumbColor={taskSwitches[item.id] ? "#ffffff" : "#fffffff"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => handleSwitch(item.id, value)}
                            value={taskSwitches[item.id] || false}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

// Styling for the RemindersScreen component elements
const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#ffffff',
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
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
        borderRadius: 25,
        marginBottom: 10,
        textAlign: 'center',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 5,
        width: '100%',
    },
});

export default RemindersScreen;

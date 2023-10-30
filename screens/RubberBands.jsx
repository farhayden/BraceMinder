//
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Button, RadioButton } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';
import logo from "../assets/logo.png";

const LOGO = logo;

function RubberBands() {

    // Declaration of the state variables
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [timeFrame, setTimeFrame] = useState(1); // Default time frame is 1 hour
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false); 

    const openStartDatePicker = () => {
        setShowStartDatePicker(true);
    };

    const openEndDatePicker = () => {
        setShowEndDatePicker(true);
    };

    const closeStartDatePicker = () => {
        setShowStartDatePicker(false);
    };

    const closeEndDatePicker = () => {
        setShowEndDatePicker(false);
    };

    const handleEndDateChange = (selectedDate) => {
        if (selectedDate !== undefined) {
            setEndDate(selectedDate);
            closeEndDatePicker(); // Close the date picker after selecting a date
        }
    };

    const handleStartDateChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            setStartDate(selectedDate);
            closeStartDatePicker(); // Close the date picker after selecting a date
        }
    };

    // function to schedule a local notification
    const handleRubberBandNotifications = () => {
        const currentTime = new Date();
        const timeFrameInMinutes = timeFrame * 60;
        const notifications = [];

        while (startDate <= endDate) {
            const randomTime = new Date(startDate.getTime() + Math.random() * timeFrameInMinutes * 60 * 1000);
            if (randomTime <= endDate && randomTime > currentTime) {
                const notificationData = {
                    title: "Rubber Bands",
                    message: "Remember to change your rubber bands!",
                    time: randomTime,
                };
                scheduleLocalNotification(notificationData);
                notifications.push(notificationData);
            }
            startDate.setMinutes(startDate.getMinutes() + timeFrameInMinutes);
        }

        if (notifications.length === 0) {
            alert("No valid notifications were scheduled within the selected time frame.");
        }
    };

    function scheduleLocalNotification(reminderData) {
        PushNotification.localNotificationSchedule({
            channelId: "BraceMinder-channel-id",
            title: reminderData.title,
            message: reminderData.message,
            color: "blue",
            vibrate: true,
            vibration: 300,
            foreground: true,
            date: reminderData.time,
        });
    };

    return (
        <View style={styles.container}>
            <Image source={LOGO} style={styles.logo} />
            <TouchableOpacity onPress={openStartDatePicker}>
            	<View style={styles.button}>
                    <Button title="Set Start Date" />
                </View>
            </TouchableOpacity>
            {showStartDatePicker && (
                <DateTimePicker
                value={startDate}
                mode="date"
                is24Hour={false}
                display="spinner"
                onChange={handleStartDateChange}
            />
        )}
        <TouchableOpacity onPress={openEndDatePicker}>
            <View style={styles.button}>
                <Button title="Set End Date" />
            </View>
        </TouchableOpacity>
        {showEndDatePicker && (
            <DateTimePicker
                value={endDate}
                mode="date"
                is24Hour={false}
                display="spinner"
                onChange={handleEndDateChange}
            />
        )}
        <Text style={{ marginTop: 20 }}>Select Time Frame (hours):</Text>
            {/* <View style={styles.radioButtons}>
                <View style={styles.radioButton}>
                    <RadioButton
                        value={1}
                        status={timeFrame === 1 ? 'checked' : 'unchecked'}
                        onPress={() => handleTimeFrameChange(1)}
                    />
                    <Text>1 hour</Text>
                </View>
                <View style={styles.radioButton}>
                    <RadioButton
                        value={2}
                        status={timeFrame === 2 ? 'checked' : 'unchecked'}
                        onPress={() => handleTimeFrameChange(2)}
                    />
                    <Text>2 hours</Text>
                </View>
                <View style={styles.radioButton}>
                    <RadioButton
                        value={4}
                        status={timeFrame === 4 ? 'checked' : 'unchecked'}
                        onPress={() => handleTimeFrameChange(4)}
                    />
                    <Text>4 hours</Text>
                </View>
            </View> */}
            <TouchableOpacity onPress={handleRubberBandNotifications}>
                <View style={styles.button}>
                    <Button title="Schedule Custom Notifications" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

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
        width: 100,
        height: 100,
        resizeMode: "contain",
        marginBottom: 5,
    },
    button: {
        borderRadius: 15,
        color: 'white',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    radioButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
    },
    radioButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default RubberBands;
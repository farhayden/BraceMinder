//
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Button, Picker } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';
import logo from "../assets/logo.png";

const LOGO = logo;

function RubberBands() {

    // Declaration of the state variables
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [timeFrame, setTimeFrame] = useState(1); // Default time frame is 1 hour

    // State to control the visibility of the date picker for start date
    const handleStartDateChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            setStartDate(selectedDate);
        }
    };

    // State to control the visibility of the date picker for end date
    const handleEndDateChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            setEndDate(selectedDate);
        }
    };

    // State to control the visibility of the time frame selector
    const handleTimeFrameChange = (value) => {
        setTimeFrame(value);
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
            channelId: "CustomNotification-channel-id",
            title: reminderData.title,
            message: reminderData.message,
            color: "blue",
            vibrate: true,
            vibration: 300,
            foreground: true,
            date: reminderData.time,
        });
    }

    return (
        <View style={styles.container}>
            <Image source={LOGO} style={styles.logo} />
            <TouchableOpacity>
                <View style={styles.button}>
                    <Button style={styles.button} title="Set Start Date" onPress={() => setShowStartDatePicker(true)}/>
                </View>
            </TouchableOpacity>
            <DateTimePicker
                value={startDate}
                mode="datetime"
                is24Hour={false}
                display="spinner"
                onChange={handleStartDateChange}
            />
            <TouchableOpacity>
                <View style={styles.button}>
                    <Button style={styles.button} title="Set End Date" onPress={() => setShowEndDatePicker(true)}/>
                </View>
            </TouchableOpacity>
            <DateTimePicker
                value={endDate}
                mode="datetime"
                is24Hour={false}
                display="spinner"
                onChange={handleEndDateChange}
            />
            <Text style={{ marginTop: 20 }}>Select Time Frame (hours):</Text>
            <Picker
                selectedValue={timeFrame}
                onValueChange={(itemValue) => handleTimeFrameChange(itemValue)}
            >
                <Picker.Item label="1 hour" value={1} />
                <Picker.Item label="2 hours" value={2} />
                <Picker.Item label="4 hours" value={4} />
            </Picker>
            <TouchableOpacity onPress={handleRubberBandNotifications}>
                <View style={styles.button}>
                    <Button title="Schedule Custom Notifications" />
                </View>
            </TouchableOpacity>
        </View>
    );
}
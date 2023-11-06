//
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Button, RadioButton } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';
import RadioGroup from 'react-native-radio-buttons-group';
import logo from "../assets/logo.png";

const LOGO = logo;

function RubberBands() {

    // Declaration of the state variables
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [timeFrame, setTimeFrame] = useState(1); // Default time frame is 1 hour
    //const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    //const [showEndDatePicker, setShowEndDatePicker] = useState(false); 
    const [selectedId, setSelectedId] = useState();
    // New state variables for the selected times
    const [pmTime, setPmTime] = useState(new Date());
    // State to control the visibility of the time picker for PM reminder
    const [showPmTimePicker, setShowPmTimePicker] = useState(false);

    const defaultPmTime = new Date();
    defaultPmTime.setHours(20); // Set PM hour (e.g., 8 PM)
    defaultPmTime.setMinutes(0); // Set PM minute (e.g., 0 minutes)

    const [pmReminder, setPmReminder] = useState({
        title: "RubberBands (Bedtime)",
        message: "Please remember to check your rubber bands",
        time: defaultPmTime, // Default time for the PM reminder
        repeatTime: 1, // Default repeat time (you can change this)
        repeatType: "day",
        ongoing: false,
    });

    const handlePmTimeChange = (event, selectedTime) => {
        if (selectedTime !== undefined) {
            setPmTime(selectedTime);
            
            const updatedPmReminder = { ...pmReminder, time: selectedTime };
            setPmReminder(updatedPmReminder);
        }
        setShowPmTimePicker(false);
    };

    const handleScheduleReminders = () => {
        
        const currentTime = new Date();
        console.log("Current time 2: " + currentTime);

        // Calculate the PM times for the next day if the selected time has passed
        const nextPmTime = pmTime < currentTime ? new Date(pmTime.getTime() + 24 * 60 * 60 * 1000) : pmTime;

        // Set the PM time for the next day
        setPmTime(nextPmTime);

        const updatedPmReminder = { ...pmReminder, time: nextPmTime };

        scheduleLocalNotification(updatedPmReminder);
    };


    // useEffect(() => {
    //     alert("Startdate changed!")
    // }, [startDate])

    // const openStartDatePicker = () => {
        
    //     setShowStartDatePicker(true);
    // };

    // const openEndDatePicker = () => {
        
    //     setShowEndDatePicker(true);
    // };

    // const closeStartDatePicker = () => {

    //     setShowStartDatePicker(false);
    // };

    // const closeEndDatePicker = () => {
    //     setShowEndDatePicker(false);
    // };

    // const handleStartDateChange = (event, selectedDate) => {
        
    //     if (selectedDate) {
    //         if(endDate && selectedDate >= endDate) {
    //             alert("Start date cannot be on or after the end date.");
    //         } else {
    //             setStartDate(selectedDate);
    //         }
    //     }
    //     closeStartDatePicker();
    // };

    // const handleEndDateChange = (event, selectedDate) => {
        
    //     if (selectedDate){
    //         if (startDate && selectedDate <= startDate) {
    //             alert("End date cannot be on or before the start date.");
    //         } else {
    //             setEndDate(selectedDate);
    //         }
    //     }
    //     closeEndDatePicker();
    // };

    const handleRubberBandNotifications = () => {
        // if (!startDate) {
        //     alert("Please select a start date.");
        //     return;
        // }
        // if (!endDate) {
        //     alert("Please select an end date.");
        //     return;
        // }

        // const currentTime = new Date();
        // const timeFrameInMinutes = timeFrame * 60;
        // const notifications = [];
        // console.log("startDate <= endDate", startDate, "<=", endDate, "==", startDate <= endDate)
        // while (startDate <= endDate) {
        //     console.log("Iterating while startDate <= endDate.");
        //     console.log(startDate, "<=", endDate, "==", startDate <= endDate)
        //     const randomTime = new Date(startDate.getTime() + Math.random() * timeFrameInMinutes * 60 * 1000);
        //     console.log('randomTime :>> ', randomTime);

        //     console.log("randomTime <= endDate && randomTime > currentTime", randomTime, "<=", endDate, "&&", randomTime, ">", currentTime);
        //     if (randomTime <= endDate && randomTime > currentTime) {
        //         const notificationData = {
        //             title: "Rubber Bands",
        //             message: "Remember to change your rubber bands!",
        //             time: randomTime,
        //         };
        //         scheduleLocalNotification(notificationData);
        //         notifications.push(notificationData);
        //     }
        //     startDate.setMinutes(startDate.getMinutes() + timeFrameInMinutes);
        // }
        const timeZone = 'Pacific/Auckland';
        const options = { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3, hour12: false };
        const formatter = new Intl.DateTimeFormat('en-NZ', options);
        const currentTimeInNZ = formatter.format(new Date());

        console.log("nz time:",currentTimeInNZ);

        const currentTime = new Date();
        const timeFrameInMinutes = timeFrame * 60;
        const notifications = [];

        // Set the times for notifications for the next day in case the current time is after 8 pm
        const startOfDay = new Date(currentTimeInNZ);
        startOfDay.setHours(0, 0, 0, 0);
        const startOfNextDay = new Date(startOfDay);
        startOfNextDay.setDate(startOfDay.getDate() + 1);

        // Set the start and end times to 8 am and 8 pm respectively
        const startTime = new Date(currentTimeInNZ);
        startTime.setHours(8, 0, 0, 0);
        const endTime = new Date(currentTimeInNZ);
        endTime.setHours(20, 0, 0, 0);

        console.log(startTime)
        console.log(currentTimeInNZ)

        // If it's after 10 pm, schedule for the next day
        // if (currentTime.getHours() >= 20) {
        //     startTime.setDate(startOfDay.getDate() + 1);
        //     endTime.setDate(startOfDay.getDate() + 1);
        // }

        for (let i = 0; i < 12; i += timeFrame) { // Generate notifications for 12 hours (8 am to 8 pm)
            const randomMinutes = Math.floor(Math.random() * timeFrameInMinutes);
            const randomTime = new Date(startTime.getTime() + (randomMinutes * 60 * 1000));
            if (randomTime >= startTime && randomTime <= endTime) { // Check if the random time is within the specified time frame
                const notificationData = {
                    title: "Rubber Bands",
                    message: "Remember to change your rubber bands!",
                    time: randomTime,
                };
                scheduleLocalNotification(notificationData);
                notifications.push(notificationData);
            }
        }

        alert("Notifications have been scheduled!");

        if (notifications.length === 0) {
            alert("No valid notifications were scheduled within the selected time frame.");
            console.log(notifications.length)
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
            repeatType: 'day',
            ongoing: false,
        });
    }

    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: 'every 1 hour',
            value: timeFrame === 1,
        },
        {
            id: '2',
            label: 'every 2 hours',
            value: timeFrame === 2,
        },
        {
            id: '4',
            label: 'every 4 hours',
            value: timeFrame === 4,
        }
    ]), []);

    return (
        <View style={styles.container}>
            <Image source={LOGO} style={styles.logo} />
        <Text>Select Time Frame for Random Notifications:</Text>
        
            <View>
                <RadioGroup style={styles.radioGroup}
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    layout="column"
                    
                />
            </View>
            <Text>*Scheduled between 8am and 8pm only.</Text>
            <TouchableOpacity >
                <View style={styles.button}>
                    <Button title="Schedule Random Notifications" onPress={handleRubberBandNotifications} />
                </View>
            </TouchableOpacity>
            {showPmTimePicker && (
                <DateTimePicker
                    value={pmTime || new Date()}
                    color="blue"
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    onChange={handlePmTimeChange}
                />
            )}
            <TouchableOpacity >
                <View style={styles.button}>
                    <Button style={styles.button} title='Set Bedtime Reminder' onPress={() => setShowPmTimePicker(true)}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleScheduleReminders(true)}>
                <View
                    style={{
                        backgroundColor: "blue",
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 50,
                    }}
                >
                    <Text style={{ color: "white" }}>Schedule Bedtime Reminder</Text>
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
        //flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
    },
    radioGroup: {
        justifyContent: "center",
    },
    radioButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default RubberBands;
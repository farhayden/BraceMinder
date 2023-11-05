//
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Button, RadioButton } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';
import RadioGroup from 'react-native-radio-buttons-group';
import logo from "../assets/logo.png";

const LOGO = logo;

function Retainers() {

    // Declaration of the state variables
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [timeFrame, setTimeFrame] = useState(1); // Default time frame is 1 hour
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false); 
    const [selectedId, setSelectedId] = useState();

    useEffect(() => {
        alert("Startdate changed!")
    }, [startDate])

    const openStartDatePicker = () => {
        // DateTimePicker.open({
        //     value: startDate,
        //     onChange: handleStartDateChange,
        //     mode: "date",
        //     is24Hour: false,
        // });
        setShowStartDatePicker(true);
    };

    const openEndDatePicker = () => {
        // DateTimePicker.open({
        //     value: endDate,
        //     onChange: handleEndDateChange,
        //     mode: "date",
        //     is24Hour: false,
        // });
        setShowEndDatePicker(true);
    };

    const closeStartDatePicker = () => {

        setShowStartDatePicker(false);
    };

    const closeEndDatePicker = () => {
        setShowEndDatePicker(false);
    };

    const handleStartDateChange = (event, selectedDate) => {
        // console.log(selectedDate);
        // if (event.type === 'set') {
        //     if (endDate && selectedDate >= endDate) {
        //         alert("Start date cannot be on or after the end date.");
        //     } else {
        //         setStartDate(selectedDate);
        //     }
        // } else if (event.type === 'dismissed') {
        //     setStartDate(undefined);
        // } else {
        //     setStartDate(selectedDate);
        // }
        if (selectedDate) {
            if(endDate && selectedDate >= endDate) {
                alert("Start date cannot be on or after the end date.");
            } else {
                setStartDate(selectedDate);
            }
        }
        closeStartDatePicker();
    };

    const handleEndDateChange = (event, selectedDate) => {
        // if (event.type === 'set') {
        //     if (startDate && selectedDate <= startDate) {
        //         alert("End date cannot be on or before the start date.");
        //     } else {
        //         setEndDate(selectedDate);
        //     }
        // } else if (event.type === 'dismissed') {
        //     setEndDate(undefined);
        // }
        if (selectedDate){
            if (startDate && selectedDate <= startDate) {
                alert("End date cannot be on or before the start date.");
            } else {
                setEndDate(selectedDate);
            }
        }
        closeEndDatePicker();
    };

    // const handleDateChange = (event, selectedDate, isStartDate) => {
    //     const currentDate = selectedDate || (isStartDate ? startDate : endDate);
    
    //     if (event.type === 'set') {
    //         if (isStartDate) {
    //             if (currentDate >= endDate) {
    //                 alert("Start date cannot be on or after the end date.");
    //             } else {
    //                 setStartDate(currentDate);
    //             }
    //         } else {
    //             if (currentDate <= startDate) {
    //                 alert("End date cannot be on or before the start date.");
    //             } else {
    //                 setEndDate(currentDate);
    //             }
    //         }
    //     } else if (event.type === 'dismissed') {
    //         isStartDate ? closeStartDatePicker() : closeEndDatePicker();
    //     }
    // };

    // function to schedule a local notification
    const handleRetainerNotifications = () => {
        if (!startDate) {
            alert("Please select a start date.");
            return;
        }
        if (!endDate) {
            alert("Please select an end date.");
            return;
        }

        const currentTime = new Date();
        const timeFrameInMinutes = timeFrame * 60;
        const notifications = [];
        console.log("startDate <= endDate", startDate, "<=", endDate, "==", startDate <= endDate)
        while (startDate <= endDate) {
            console.log("Iterating while startDate <= endDate.");
            console.log(startDate, "<=", endDate, "==", startDate <= endDate)
            const randomTime = new Date(startDate.getTime() + Math.random() * timeFrameInMinutes * 60 * 1000);
            console.log('randomTime :>> ', randomTime);

            console.log("randomTime <= endDate && randomTime > currentTime", randomTime, "<=", endDate, "&&", randomTime, ">", currentTime);
            if (randomTime <= endDate && randomTime > currentTime) {
                const notificationData = {
                    title: "Rubber Bands",
                    message: "Remember to check your retainer!",
                    time: randomTime,
                };
                scheduleLocalNotification(notificationData);
                notifications.push(notificationData);
            }
            startDate.setMinutes(startDate.getMinutes() + timeFrameInMinutes);
        }

        alert("Notifications have been scheduled!");

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
            repeatType: 'day',
        });
    };

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
            <TouchableOpacity>
            	<View style={styles.button}>
                    <Button title="Set Start Date" onPress={openStartDatePicker} />
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
        <TouchableOpacity >
            <View style={styles.button}>
                <Button title="Set End Date" onPress= {openEndDatePicker} />
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
        <Text>Select Time Frame for Random Notifications:</Text>
            <View>
                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    layout="column"
                    
                />
                {/* <View style={styles.radioButton}>
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
                </RadioGroup> */}
            </View>
            <TouchableOpacity >
                <View style={styles.button}>
                    <Button title="Schedule Custom Notifications" onPress={handleRetainerNotifications} />
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
    radioButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Retainers;
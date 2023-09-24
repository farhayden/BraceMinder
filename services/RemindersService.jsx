import PushNotification from 'react-native-push-notification';

function scheduleLocalNotification() {

    const amTime = new Date();
    amTime.setHours(8); // Set AM hour (e.g., 8 AM)
    amTime.setMinutes(0); // Set AM minute (e.g., 0 minutes)

    const pmTime = new Date();
    pmTime.setHours(20); // Set PM hour (e.g., 8 PM)
    pmTime.setMinutes(0); // Set PM minute (e.g., 0 minutes)

    PushNotification.localNotificationSchedule({
        channelId: "BraceMinder-channel-id",
        title: "Tooth Brushing", // (optional)
        message: "My Notification Message", // (required)
        color: "blue",
        vibrate: true,
        vibration: 300,
        subtext: "This is a subtext",
        bigText: "",
        date: amTime,
        repeatTime: 'daily',
    });

    PushNotification.localNotificationSchedule({
        channelId: "BraceMinder-channel-id",
        title: "Tooth Brushing", // (optional)
        message: "My Notification Message", // (required)
        color: "blue",
        vibrate: true,
        vibration: 300,
        subtext: "This is a subtext",
        bigText: "",
        date: pmTime,
        repeatTime: 'daily',
    });
} export default scheduleLocalNotification;
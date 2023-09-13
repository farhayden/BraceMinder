

function scheduleLocalNotification() {

    PushNotification.localNotificationSchedule({
        channelId: "BraceMinder-channel-id",
        title: "Tooth Brushing", // (optional)
        message: "My Notification Message", // (required)
        color: "red",
        vibrate: true,
        vibration: 300,
        subtext: "This is a subtext",
        bigText: "This is a place holder for tooth brushing reminder",
        date: new Date(Date.now() + 5 * 1000), // in 60 secs
        repeatTime: 1,
    });
} export default scheduleLocalNotification;
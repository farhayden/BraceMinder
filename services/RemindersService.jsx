import PushNotification from 'react-native-push-notification';

/**
 * Schedules two local notifications for AM and PM times.
 * The first notification is set at 8 AM and the second one at 8 PM.
 * Both notifications repeat daily.
 */
function scheduleLocalNotification() {
  const amTime = new Date();
  amTime.setHours(8); // Set AM hour (e.g., 8 AM)
  amTime.setMinutes(0); // Set AM minute (e.g., 0 minutes)

  const pmTime = new Date();
  pmTime.setHours(20); // Set PM hour (e.g., 8 PM)
  pmTime.setMinutes(0); // Set PM minute (e.g., 0 minutes)

  // Schedule 8 AM notification
  PushNotification.localNotificationSchedule({
    channelId: 'BraceMinder-channel-id',
    title: 'Tooth Brushing',
    message: 'My Notification Message',
    color: 'blue',
    vibrate: true,
    vibration: 300,
    subtext: 'This is a subtext',
    bigText: '',
    date: amTime,
    repeatTime: 'daily',
  });

  // Schedule 8 PM notification
  PushNotification.localNotificationSchedule({
    channelId: 'BraceMinder-channel-id',
    title: 'Tooth Brushing',
    message: 'My Notification Message',
    color: 'blue',
    vibrate: true,
    vibration: 300,
    subtext: 'This is a subtext',
    bigText: '',
    date: pmTime,
    repeatTime: 'daily',
  });
}

export default scheduleLocalNotification;

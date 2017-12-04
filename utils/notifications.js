import { AsyncStorage } from "react-native";
import { Permissions, Notifications } from "expo";

const NOTIFICATION_KEY = 'mobileFlashCards:notifications';

function createStudyNotification () {
  return {
    title: 'Hey study today!',
    body: "👋 Don't forget to study today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function getDailyReminderValue() {
  return {
    today: "👋 Don't forget to study today!"
  }
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(22);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createStudyNotification(),
                {
                  time: tomorrow,
                  repeat: 'hour'
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }
    })
}
import { notifications } from '@mantine/notifications';
export const successMsg = (message) => {
    notifications.show({
        title: "Success!",
        message,
        color:"green"
      })
};
export const errorMsg = (message) => {
    notifications.show({
        title: "Error!",
        message,        
        color:"red"
      })
};

import moment from 'moment';

export const dateFormat = (timestamp) => {
    return moment(timestamp).format('DD/MM/YYYY, h:mm:ss A');
};

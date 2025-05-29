'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import style from './date-time.module.scss';
import Image from 'next/image';
import { Tooltip } from '@mantine/core';

const timeOptions = {
    timeZone: 'Asia/Jerusalem',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
};
const dateOptions = {
    timeZone: 'Asia/Jerusalem',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
};

const getIsraelTime = () => {
    return new Intl.DateTimeFormat('en-GB', timeOptions).format(new Date());
};

const getIsraelDate = () => {
    return new Intl.DateTimeFormat('en-GB', dateOptions).format(new Date());
};

const DateTime = () => {
    const [time, setTime] = useState(null);
    const [currentDate, setCurrentDate] = useState(null);

    useEffect(() => {
        setTime(getIsraelTime());
        setCurrentDate(getIsraelDate());

        const timeInterval = setInterval(() => {
            setTime(getIsraelTime());
        }, 1000);

        const dateInterval = setInterval(() => {
            setCurrentDate(getIsraelDate());
        }, 1000 * 60);

        return () => {
            clearInterval(timeInterval);
            clearInterval(dateInterval);
        };
    }, []);

    if (time === null || currentDate === null) {
        return null;
    }

    //     const formattedTime = time.toLocaleTimeString('en-US', {
    //         hour12: false,
    //         hour: '2-digit',
    //         minute: '2-digit',
    //         second: '2-digit',
    //     });

    //     const formatDate = (date) => {
    //         const options = { year: 'numeric', month: 'short', day: 'numeric' };
    //         return date.toLocaleDateString(undefined, options);
    //     };

    return (
        <div className={style.date_time}>
            <ul>
                <li>
                    <div className={clsx(style.time, style.item)}>
                        <Image src="/images/icons/time.svg" height="20" width="20" alt="time icon" />
                        <span>{time}</span>
                    </div>
                </li>

                <li>
                    <div className={clsx(style.date, style.item)}>
                        <Image src="/images/icons/date.svg" height="20" width="20" alt="date icon" />
                        <span>{currentDate}</span>
                    </div>
                </li>

                <li>
                    <Tooltip label={'Online'} arrowOffset={50} arrowSize={10} withArrow position="bottom">
                        <div className={clsx(style.status)}></div>
                    </Tooltip>
                </li>
            </ul>
        </div>
    );
};

export default DateTime;

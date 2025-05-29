'use client';
import clsx from 'clsx';
import style from './date-filter.module.scss';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const calendarIcon = <Icon icon="material-symbols:calendar-month-outline-rounded" width="22" height="22" className="date_filter_icon" />;

const clockIcon = <Icon icon="material-symbols:nest-clock-farsight-analog-outline-rounded" width="22" height="22" className="date_filter_icon" />;
export const DateFrom = ({ setFromDate, fromDate, error }) => {
    const setFromDateValue = (value) => {
        setFromDate((prev) => {
            const newDate = new Date(value);
            if (prev?.time) {
                const [hours, minutes] = prev.time.split(':');
                newDate.setHours(hours);
                newDate.setMinutes(minutes);
            }
            return { ...prev, date: newDate };
        });
    };

    const setFromTimeValue = (value) => {
        setFromDate((prev) => {
            const newDate = new Date(prev?.date);
            const [hours, minutes] = value.split(':');
            newDate.setHours(hours);
            newDate.setMinutes(minutes);
            return { ...prev, time: value, date: newDate };
        });
    };
    return (
        <div className={clsx(style.date_filter, style.date_from)}>
            <span className={style.label}>From:</span>
            <DatePickerInput
                className={clsx(style.date_picker, 'theme_date_picker')}
                placeholder="Pick date"
                value={fromDate?.date}
                onChange={setFromDateValue}
                valueFormat="MMM DD, YYYY"
                rightSectionPointerEvents="none"
                rightSection={calendarIcon}
            />
            <TimeInput
                value={fromDate?.time}
                onChange={(event) => setFromTimeValue(event.currentTarget.value)}
                className={clsx(style.time_input, 'theme_time_input')}
                rightSectionPointerEvents="none"
                placeholder="Pick a time"
                rightSection={clockIcon}
            />
            {error && <span className="error_msg">{error}</span>}
        </div>
    );
};

export const DateTo = ({ setToDate, toDate, error }) => {
    const setToDateValue = (value) => {
		setToDate((prev) => {
			const newDate = new Date(value);
			if (prev?.time) {
				const [hours, minutes] = prev.time.split(":");
				newDate.setHours(hours);
				newDate.setMinutes(minutes);
			}
			return { ...prev, date: newDate };
		});
	};

	const setToTimeValue = (value) => {
		setToDate((prev) => {
			const newDate = new Date(prev?.date);
			const [hours, minutes] = value.split(":");
			newDate.setHours(hours);
			newDate.setMinutes(minutes);
			return { ...prev, time: value, date: newDate };
		});
	};
    return (
        <div className={clsx(style.date_filter, style.date_to)}>
            <span className={style.label}>To:</span>
            <DatePickerInput
						className={clsx(style.date_picker, "theme_date_picker")}
						placeholder="Pick date"
						value={toDate?.date}
						onChange={setToDateValue}
						valueFormat="MMM DD, YYYY"
						rightSectionPointerEvents="none"
						rightSection={calendarIcon}
					/>
					<TimeInput
						value={toDate?.time}
						onChange={(event) => setToTimeValue(event.currentTarget.value)}
						className={clsx(style.time_input, "theme_time_input")}
						rightSectionPointerEvents="none"
						rightSection={clockIcon}
					/>
                    {error && <span className="error_msg">{error}</span>}
        </div>
    );
};

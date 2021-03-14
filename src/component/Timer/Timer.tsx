import React, { useEffect, useState } from 'react';
import './Timer.css';

interface Props {
    start: boolean,
    minutes: number,
    seconds: number,
    handleStart: (value: boolean) => void,
    setMinutes: (minutes: number) => void,
    setSeconds: (seconds: number) => void
}

export const Timer = ({ start, minutes, seconds, handleStart, setMinutes, setSeconds }: Props) => {

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        handleStart(!start);
                    } else {
                        setSeconds(59);
                        setMinutes(minutes - 1);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }
    }, [start, seconds]);

    return (
        <div>
            { minutes === 0 && seconds === 0
                ? <h1>Time End: <span style={{ color: 'red' }}>{minutes}:{`0${seconds}`}</span></h1>
                : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
        </div>
    );
};
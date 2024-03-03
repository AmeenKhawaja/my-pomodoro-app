"use client"
import React, {useState, useEffect} from 'react'

const Timer:React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<number>(25*60)
    const [isActive, setIsActive] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(10); // initial countdown value is 10 
    useEffect(() => {
        const startCountdown = () => {
            const interval = setInterval(() => {
                setCountdown((prevCountdown) => (prevCountdown-1)); // decerement countdown every second
            },1000);

            // clear interval when countdown reaches 0
            setTimeout(() => {
                clearInterval(interval);
            }, countdown * 1000);
        };

        let interval:NodeJS.Timeout | null = null;
        if(isActive){
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft -1 )
            }, 1000); // calls function every 1 second and decrements time by 1 second
        } else if(!isActive && timeLeft !==0) {
            clearInterval(interval!) // ! since we defined interval as null initally, so we're saying interval definitely has a value and is not null
        }

        return () => {
            if(interval){
                clearInterval(interval);
            };
        }
    }, [isActive,timeLeft]);

    // toggle the function to start or pause the timer
    const toggle = () => {
        setIsActive(!isActive); // This will flip the value of isActive
    }
    
    // resets the function to set timer back to 25 mins
    const reset = () => {
        setIsActive(false)
        setTimeLeft(25*60)
    }

    return (
        <div>
            <h2>Timer</h2>
            <div>
            <p>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
            </div>
            <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
            <button onClick={reset}>Reset</button>

        </div>
    )
}

export default Timer
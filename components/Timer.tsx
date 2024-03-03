"use client"
import React, {useState, useEffect} from 'react'
import styles from './Timer.module.css'; // Import the CSS module


const MODES = {
    POMODORO: { time: 25 * 60, color: 'tomato' },
    SHORT_BREAK: { time: 5 * 60, color: 'lightblue' },
    LONG_BREAK: { time: 15 * 60, color: 'lightgreen' },
  };

  const Timer:React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<number>(MODES.POMODORO.time);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [mode, setMode] = useState<'POMODORO' | 'SHORT_BREAK' | 'LONG_BREAK'>('POMODORO');
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
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => {
                    if (timeLeft - 1 <= 0) {
                        setIsActive(false); // Automatically stop the timer
                        setTimeLeft(25*60)
                        return 0; // Prevent timeLeft from going below 0
                    }
                    return timeLeft - 1;
                });
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
        const changeMode = (newMode: 'POMODORO' | 'SHORT_BREAK' | 'LONG_BREAK') => {
            setMode(newMode)
            setIsActive(false);
            setTimeLeft(MODES[newMode].time);
        };

        const currentMode = MODES[mode];
        const pageStyle = {
            backgroundColor: currentMode.color
            // other styles here
        }
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
        <div className={styles.timerContainer} style={{ backgroundColor: currentMode.color }}>
          <h1>PomoWHATEVER</h1>
          <div className={styles.modeButtons}>
            <button className={styles.button} onClick={() => changeMode('POMODORO')}>Pomodoro</button>
            <button className={styles.button} onClick={() => changeMode('SHORT_BREAK')}>Short Break</button>
            <button className={styles.button} onClick={() => changeMode('LONG_BREAK')}>Long Break</button>
          </div>
          <div className={styles.timerDisplay}>
            <p>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
          </div>
          <div className={styles.controlButtons}>
            <button className={styles.button} onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
            <button className={styles.button} onClick={reset}>Reset</button>
          </div>
        </div> 
      );
};


export default Timer
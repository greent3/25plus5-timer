import './App.css';
import React, {useState, useEffect} from "react";
import SessionTimer from "./sessionTimer"
import SessionAdjuster from "./sessionAdjuster"
import BreakAdjuster from "./breakAdjuster";

function App() {
    const [min, setMin] = useState(25);
    const [sec, setSec] = useState(0);
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [paused, setPaused] = useState(true);
    const [onBreak, setBreak] = useState(false);
    const [intervalId, setId] = useState(0);



    useEffect(() =>{
        const counter = () => {
            if (sec === 0 && min === 0 && !onBreak) {
                setBreak(true)
                setMin(breakLength)
            } else if (sec === 0 && min === 0 && onBreak) {
                setBreak(false)
                setMin(sessionLength)
            } else if (sec === 0) {
                setSec(59)
                setMin(prevState => prevState - 1)
            } else {
                setSec(prevState => prevState - 1)
            }
        }
        if(paused){
            return;
        }
        const intId = setInterval(() =>{
            counter()}, 1000);
        setId(intId)
        return() => clearInterval(intId);

    }, [paused, breakLength, min, sec, sessionLength, onBreak], )


    const handleBreakIncrement = () => {
        const belowSixty = breakLength + 1 <= 59;
        if (paused && belowSixty) {
            setBreakLength(prevState => prevState + 1)
            if(onBreak){
                setMin(prevState => prevState + 1)
            }
        }
    }

    const handleBreakDecrement = () => {
        const aboveZero = breakLength - 1 >= 0;
        if (paused && aboveZero) {
            setBreakLength(prevState => prevState - 1)
            if(onBreak){
                setMin(prevState => prevState - 1)
            }
        }
    }

    const handleSessionIncrement = () => {
        const belowSixty = sessionLength + 1 <= 59;
        if (paused && belowSixty) {
            setSessionLength(prevState => prevState + 1)
            if(!onBreak){
                setMin(prevState => prevState + 1)
            }
        }
    }
    const handleSessionDecrement = () => {
        const aboveZero = sessionLength - 1 >= 0;
        if (paused && aboveZero) {
            setSessionLength(prevState => prevState - 1)
            if(!onBreak){
                setMin(prevState => prevState - 1)
            }
        }
    }


    const pausePlay = () => {
        if (paused) {
            /*const newIntervalId = setInterval(counter, 1000); */
            setPaused(false);
            /*setId(newIntervalId) */

        } else {
            clearInterval(intervalId)
            setPaused(true);
        }
    }

    const reset = () => {
        /* stop timer */
        if (!paused) {
            clearInterval(intervalId)
        }
        /* restore timer to default value */
        setMin(25);
        setSec(0);
        setBreakLength(5);
        setSessionLength(25);
        setPaused(true);
        setBreak(false);
        setId(0);
    }



    const currState = {onBreak, min, sec}
        return (
            <div className="main-container">
                <div id="clock-title"><h1>25 + 5 Clock</h1></div>
                <SessionAdjuster  handleIncrement={handleSessionIncrement} handleDecrement={handleSessionDecrement} sessionLength={sessionLength}/>
                <BreakAdjuster handleIncrement={handleBreakIncrement} handleDecrement={handleBreakDecrement} breakLength={breakLength}/>
                <SessionTimer currState={currState} pausePlay={pausePlay} reset={reset}/>
            </div>
        );

}

export default App;

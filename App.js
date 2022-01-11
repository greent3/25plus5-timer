import './App.css';
import React from "react";
import SessionTimer from "./sessionTimer"
import SessionAdjuster from "./sessionAdjuster"
import BreakAdjuster from "./breakAdjuster";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            min: 25,
            sec: 0,
            breakLength: 5,
            sessionLength: 25,
            paused: true,
            onBreak: false,
            intervalId: 0
        }
        this.handleIncrement = this.handleIncrement.bind(this)
        this.handleDecrement = this.handleDecrement.bind(this)
        this.reset = this.reset.bind(this)
        this.counter = this.counter.bind(this)
        this.pausePlay = this.pausePlay.bind(this)
        this.updateTimer = this.updateTimer.bind(this)
    }

    handleIncrement(selectedTimer) {
        const belowSixty = this.state[selectedTimer] + 1 <= 59;
        if (this.state.paused && belowSixty) {
            this.setState(prevState => ({
                [selectedTimer]: prevState[selectedTimer] + 1,
            }))
            this.updateTimer();
        }
    }

    handleDecrement(selectedTimer) {
        const aboveZero = this.state[selectedTimer] - 1 >= 0;
        if (this.state.paused && aboveZero) {
            this.setState(prevState => ({
                [selectedTimer]: prevState[selectedTimer] - 1,
            }))
            this.updateTimer();
        }
    }

    updateTimer() {
        if (this.state.onBreak) {
            this.setState(prevState => ({
                min: prevState.breakLength,
                sec: 0
            }))
        } else {
            this.setState(prevState => ({
                min: prevState.sessionLength,
                sec: 0
            }))
        }
    }

    pausePlay() {
        if (this.state.paused) {
            const newIntervalId = setInterval(this.counter, 1000);
            this.setState({
                paused: false,
                intervalId: newIntervalId
            })
        } else {
            clearInterval(this.state.intervalId)
            this.setState({
                paused: true
            })
        }
    }

    reset() {
        if (!this.state.paused) {
            clearInterval(this.state.intervalId)
        }
        this.setState({
            min: 25,
            sec: 0,
            breakLength: 5,
            sessionLength: 25,
            paused: true,
            onBreak: false,
            intervalId: 0
        })
    }

    counter() {
        if (this.state.sec === 0 && this.state.min === 0 && !this.state.onBreak) {
            this.setState({
                onBreak: true,
                min: this.state.breakLength
            })
        } else if (this.state.sec === 0 && this.state.min === 0 && this.state.onBreak) {
            this.setState({
                onBreak: false,
                min: this.state.sessionLength
            })
        } else if (this.state.sec === 0) {
            this.setState(prevState => ({
                min: prevState.min - 1,
                sec: 59
            }))
        } else {
            this.setState(prevState => ({
                sec: prevState.sec - 1
            }))
        }
    }

    render() {
        return (
            <div className="main-container">
                <div id="clock-title"><h1>25 + 5 Clock</h1></div>
                <SessionAdjuster state={this.state} handleIncrement={this.handleIncrement} handleDecrement={this.handleDecrement}/>
                <BreakAdjuster state={this.state} handleIncrement={this.handleIncrement} handleDecrement={this.handleDecrement}/>
                <SessionTimer state={this.state} pausePlay={this.pausePlay} reset={this.reset}/>
            </div>
        );
    }

}

export default App;

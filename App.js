import './App.css';
import React from "react";

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

    /*increment session/break timer variable if below 60*/
    handleIncrement(eventName) {
        const belowSixty = this.state[eventName] + 1 <= 59;
        if (this.state.paused && belowSixty) {
            this.setState(prevState => ({
                [eventName]: prevState[eventName] + 1,
            }))
            this.updateTimer();
        }
    }

    /*decrement session/break timer variable if above -1*/
    handleDecrement(eventName) {
        const aboveZero = this.state[eventName] - 1 >= 0;
        if (this.state.paused && aboveZero) {
            this.setState(prevState => ({
                [eventName]: prevState[eventName] - 1,
            }))
            this.updateTimer();
        }
    }

    /*ensure timer matches user-defined break/session times*/
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

    /*handles timer countdown functionality and switching between break & session*/
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
                {/*Box containing break count and break's length selectors*/}
                <div id="break-box" className="box">
                    <div id="break-label" className="label">Break Length</div>
                    <div className="button-container">
                        <button id="break-decrement" name="break-decrement"
                                onClick={() => (this.handleDecrement("breakLength"))}>
                            <span className="down-arrow">
                                <ion-icon name="arrow-down-outline"></ion-icon>
                            </span>
                        </button>
                        <span id="break-length" className="number">{this.state.breakLength}</span>
                        <button id="break-increment" name="break-increment"
                                onClick={() => this.handleIncrement("breakLength")}>
                            <span>
                                <ion-icon name="arrow-up-outline"></ion-icon>
                            </span>
                        </button>
                    </div>
                </div>
                {/*Box containing session count and session's length selectors*/}
                <div id="session-box" className="box">
                    <div id="session-label" className="label">Session Length</div>
                    <div className="button-container">
                        <button id="session-decrement" onClick={() => this.handleDecrement("sessionLength")}>
                            <span className="down-arrow">
                                <ion-icon name="arrow-down-outline"></ion-icon>
                            </span>
                        </button>
                        <span id="session-length" className="number">{this.state.sessionLength}</span>
                        <button id="session-increment" onClick={() => this.handleIncrement("sessionLength")}>
                            <span>
                                <ion-icon name="arrow-up-outline"></ion-icon>
                            </span>
                        </button>
                    </div>
                </div>
                {/*Box containing timer, play/pause button, and reset button*/}
                <div id="timer" className="box">
                    <div id="timer-label" className="label">{this.state.onBreak ? "Break" : "Session"}</div>
                    <div id="time-left" className="number">
                        {this.state.min < 10 ? "0" + this.state.min : this.state.min}:{this.state.sec < 10 ? "0" + this.state.sec : this.state.sec}</div>
                    <div className="button-container">
                        <button id="start-stop" onClick={() => this.pausePlay()}>
                            <span>
                                <ion-icon name="pause-outline"></ion-icon>
                                <ion-icon name="play-outline"></ion-icon>
                            </span>
                        </button>
                        <button id="reset" onClick={() => this.reset()}>
                            <span>
                                <ion-icon name="refresh-outline"></ion-icon>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;

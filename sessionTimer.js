import React from "react"

class SessionTimer extends React.Component{
    constructor(props) {
        super(props);
    }

    pausePlay(){
        this.props.pausePlay()
    }
    reset(){
        this.props.reset()
    }

    render(){
        return (
                <div id="timer" className="box">
                    <div id="timer-label" className="label">{this.props.state.onBreak ? "Break" : "Session"}</div>
                    <div id="time-left" className="number">
                        {this.props.state.min < 10 ? "0" + this.props.state.min : this.props.state.min}:{this.props.state.sec < 10 ? "0" + this.props.state.sec : this.props.state.sec}</div>
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
        )
    }

}

export default SessionTimer
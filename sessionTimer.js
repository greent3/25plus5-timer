import React from "react"

function SessionTimer(props) {

    const pausePlay = () => {
        props.pausePlay()
    }
    const reset = () => {
        props.reset()
    }

        return (
                <div id="timer" className="box">
                    <div id="timer-label" className="label">{props.currState.onBreak ? "Break" : "Session"}</div>
                    <div id="time-left" className="number">
                        {props.currState.min < 10 ? "0" + props.currState.min : props.currState.min}:{props.currState.sec < 10 ? "0" + props.currState.sec : props.currState.sec}</div>
                    <div className="button-container">
                        <button id="start-stop" onClick={pausePlay}>
                            <span>
                                <ion-icon name="pause-outline"></ion-icon>
                                <ion-icon name="play-outline"></ion-icon>
                            </span>
                        </button>

                        <button id="reset" onClick={reset}>
                            <span>
                                <ion-icon name="refresh-outline"></ion-icon>
                            </span>
                        </button>
                    </div>
                </div>
        )
}

export default SessionTimer
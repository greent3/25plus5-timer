import React from "react"

function SessionAdjuster(props) {


    const handleIncrement = () => {
        props.handleIncrement()
    }
    const handleDecrement = () => {
        props.handleDecrement()
    }

        return (
            <div id="session-box" className="box">
                <div id="session-label" className="label">Session Length</div>
                <div className="button-container">
                    <button id="session-decrement" onClick={handleDecrement}>
              <span className="down-arrow">
                  <ion-icon name="arrow-down-outline"></ion-icon>
              </span>
                    </button>
                    <span id="session-length" className="number">{props.sessionLength}</span>
                    <button id="session-increment" onClick={handleIncrement}>
              <span>
                  <ion-icon name="arrow-up-outline"></ion-icon>
              </span>
                    </button>
                </div>
            </div>
        )
}

export default SessionAdjuster
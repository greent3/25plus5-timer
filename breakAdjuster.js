import React from "react"

function BreakAdjuster(props) {

    const handleIncrement = () => {
        props.handleIncrement()
    }

    const handleDecrement = () => {
        props.handleDecrement()
    }

        return (
            <div id="break-box" className="box">
                <div id="break-label" className="label">Break Length</div>
                <div className="button-container">
                    <button id="break-decrement" name="break-decrement"
                            onClick={handleDecrement}>
              <span className="down-arrow">
                  <ion-icon name="arrow-down-outline"></ion-icon>
              </span>
                    </button>
                    <span id="break-length" className="number">{props.breakLength}</span>
                    <button id="break-increment" name="break-increment"
                            onClick={handleIncrement}>
              <span>
                  <ion-icon name="arrow-up-outline"></ion-icon>
              </span>
                    </button>
                </div>
            </div>
        )
}

export default BreakAdjuster
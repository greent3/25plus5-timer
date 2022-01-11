import React from "react"

class BreakAdjuster extends React.Component {
    constructor(props) {
        super(props);
    }

    handleIncrement(selectedTimer) {
        this.props.handleIncrement(selectedTimer)
    }

    handleDecrement(selectedTimer) {
        this.props.handleDecrement(selectedTimer)
    }

    render() {
        return (
            <div id="break-box" className="box">
                <div id="break-label" className="label">Break Length</div>
                <div className="button-container">
                    <button id="break-decrement" name="break-decrement"
                            onClick={() => this.handleDecrement("breakLength")}>
              <span className="down-arrow">
                  <ion-icon name="arrow-down-outline"></ion-icon>
              </span>
                    </button>
                    <span id="break-length" className="number">{this.props.state.breakLength}</span>
                    <button id="break-increment" name="break-increment"
                            onClick={() => this.handleIncrement("breakLength")}>
              <span>
                  <ion-icon name="arrow-up-outline"></ion-icon>
              </span>
                    </button>
                </div>
            </div>
        )
    }

}

export default BreakAdjuster
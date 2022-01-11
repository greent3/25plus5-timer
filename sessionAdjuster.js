import React from "react"

class SessionAdjuster extends React.Component{
    constructor(props) {
        super(props);
    }

    handleIncrement(selectedTimer){
        this.props.handleIncrement(selectedTimer)
    }
    handleDecrement(selectedTimer){
        this.props.handleDecrement(selectedTimer)
    }
    render(){
        return (
            <div id="session-box" className="box">
                <div id="session-label" className="label">Session Length</div>
                <div className="button-container">
                    <button id="session-decrement" onClick={() => this.handleDecrement("sessionLength")}>
              <span className="down-arrow">
                  <ion-icon name="arrow-down-outline"></ion-icon>
              </span>
                    </button>
                    <span id="session-length" className="number">{this.props.state.sessionLength}</span>
                    <button id="session-increment" onClick={() => this.handleIncrement("sessionLength")}>
              <span>
                  <ion-icon name="arrow-up-outline"></ion-icon>
              </span>
                    </button>
                </div>
            </div>
        )
    }

}

export default SessionAdjuster
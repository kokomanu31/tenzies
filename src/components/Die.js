import React from "react";

export default function Die(props) {
    return (
        <div className={props.isHeld ? "dice held" : "dice"} onClick={props.holdDice}>
            <h2 className="dice-value">{props.value}</h2>
        </div>
    )
}
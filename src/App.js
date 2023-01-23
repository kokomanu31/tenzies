import React from "react";
import Die from "./components/Die";

export default function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [isTenzies, setIsTenzies] = React.useState(false);

    React.useEffect(() => {
        let areAllHeld = dice.every(die => die.isHeld);
        let firstValue = dice[0].value;
        let areSameValue = dice.every(die => die.value === firstValue);
        if (areAllHeld && areSameValue) {
            setIsTenzies(true);
        }
    }, [dice]);

    function allNewDice() {
        const dice = [];
        for (let i = 0; i < 10; i++) {
            dice.push({
                id: i,
                value: Math.ceil(Math.random() * 6),
                isHeld: false
            });
        }

        return dice;
    }

    function rollDice() {
        if (!isTenzies) {
            setDice(oldDice => oldDice.map(die => {
                if (!die.isHeld)
                    die.value = Math.ceil(Math.random() * 6);

                return die
            }));
        }
        else {
            setIsTenzies(false);
            setDice(allNewDice());
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            if (die.id === id)
                die.isHeld = !die.isHeld;
            return die;
        }));
    }

    return (
        <main className="container">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
                Click each die to freeze it atits current value between rolls.</p>
            <div className="dice-container">
                {dice.map(die => (
                    <Die
                        key={die.id}
                        value={die.value}
                        isHeld={die.isHeld}
                        holdDice={() => holdDice(die.id)}
                    />
                ))}
            </div>
            <button
                className="roll-button"
                onClick={rollDice}
            >
                {isTenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}
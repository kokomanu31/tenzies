import React from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Die from "./components/Die";

const languages = [
    {
        code: 'fr',
        json: 'language_fr'
    },
    {
        code: 'en',
        json: 'language_en'
    }
];

export default function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [isTenzies, setIsTenzies] = React.useState(false);

    const { t } = useTranslation();

    React.useEffect(() => {
        let areAllHeld = dice.every(die => die.isHeld);
        let firstValue = dice[0].value;
        let areSameValue = dice.every(die => die.value === firstValue);
        if (areAllHeld && areSameValue) {
            setIsTenzies(true);
            alert(t("win"));
        }
    }, [dice, t]);

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
            <div>
                {languages.map(language => (
                    <button
                        key={language.code}
                        onClick={() => i18next.changeLanguage(language.code)}
                    >
                        {t(language.json)}
                    </button>
                ))}
            </div>
            <h1 className="title">{t('app_name')}</h1>
            <p className="instructions">{t('instructions')}</p>
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
                {isTenzies ? t('new_game') : t('roll')}
            </button>
        </main>
    )
}
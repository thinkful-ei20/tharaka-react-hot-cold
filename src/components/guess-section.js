import React from 'react';

import GuessForm from './guess-form';

import './guess-section.css';

export default function GuessSection(props) {
    return (
        <section>
            <h2 id="feedback">{!props.feedback ? "Make your guess!" : props.feedback}</h2>
            <GuessForm onGuess={guess => props.onGuess(guess)} won={props.won} />
        </section>
    );
}


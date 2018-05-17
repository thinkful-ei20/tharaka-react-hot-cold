import React from 'react';

import './guess-form.css';


export default class GuessForm extends React.Component {
    constructor(props) {
        super(props)
    }

    processForm(event) {
		event.preventDefault();
        const value = this.input.value;
    
		if(value){
            if(value > 100) {
                alert('Enter a Number between 0 and 100');
            } else if(isNaN(value)){
                alert('Please enter a number');
            } else {
                this.props.onGuess(value);
            }
		}
		this.input.value = '';
	}

    render() {

        return (
            <form onSubmit={(e) =>  this.processForm(e)}>
                <input ref={value => this.input = value} type="text" name="userGuess" id="userGuess"
                    className="text" maxLength="3" autoComplete="off"
                    placeholder="Enter your Guess" required />
                <input type="submit" id="guessButton" className="button" name="submit" value="Guess"/>
            </form>
        );
    }
}


import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import GuessCount  from './guess-count';
import GuessList from './guess-list';


export default class Game extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            possibleFeedback: ["Hot", "Warm", "Cold", "Ice Cold", "You Won!", "Make your guess!"],
            currentFeedback: '',
            guessList: [],
            currentGuess: '',
            correctNum: Math.floor(Math.random() * 100 + 1)
        }
    }

    setCurrentGuess(currentGuess) {

        this.setState({currentGuess});
        this.setState({guessList:[...this.state.guessList, currentGuess]});


        if(currentGuess === this.state.correctNum){
            this.setCurretFeedback(this.state.possibleFeedback[4]);
        } else if((this.state.correctNum <= currentGuess + 20) && (this.state.correctNum >= currentGuess - 20)) {
            if((this.state.correctNum <= currentGuess + 10) && (this.state.correctNum >= currentGuess - 10)) {
                this.setCurretFeedback(this.state.possibleFeedback[0]);
            } else {
                this.setCurretFeedback(this.state.possibleFeedback[1]);
            }
        } else if((this.state.correctNum > currentGuess + 20) || (this.state.correctNum < currentGuess -20)) {
            if((this.state.correctNum > currentGuess + 30) || (this.state.correctNum < currentGuess - 30)) {
                this.setCurretFeedback(this.state.possibleFeedback[3]);
            } else {
                this.setCurretFeedback(this.state.possibleFeedback[2]);
            }
        } 
        
    }

    setCurretFeedback(currentFeedback) {
        this.setState({currentFeedback})
    } 

    render() {

        const guessCount = this.state.guessList.length;

        return(
            <div>
                <Header />
                <GuessSection feedback={this.state.currentFeedback} onGuess={guess => this.setCurrentGuess(guess)} />
                <GuessCount count={guessCount} />
                <GuessList guesses={this.state.guessList} />
            </div> 
        )
    }
}


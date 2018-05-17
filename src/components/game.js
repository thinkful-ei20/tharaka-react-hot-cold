import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import GuessCount  from './guess-count';
import GuessList from './guess-list';


export default class Game extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            possibleFeedback: ["Hot", "Warm", "Cold", "Ice Cold", "You Won! Click New Game to play again", "Make your guess!"],
            currentFeedback: '',
            guessList: [],
            currentGuess: '',
            correctNum: Math.floor(Math.random() * 100 + 1),
            newGame: false
        }
    }

    setCurrentGuess(currentGuess) {

        this.setState({currentGuess});
        this.setState({guessList:[...this.state.guessList, currentGuess]});
        
        const realNum = parseInt(this.state.correctNum);
        const userNum = parseInt(currentGuess);

        console.log(realNum);
  
        if(userNum === realNum){
            this.setCurretFeedback(this.state.possibleFeedback[4]);
        } else if((realNum <= userNum + 20) && (realNum >= userNum - 20)) {
            if((realNum <= userNum + 10) && (realNum >= userNum - 10)) {
                this.setCurretFeedback(this.state.possibleFeedback[0]);
            } else {
                this.setCurretFeedback(this.state.possibleFeedback[1]);
            }
        } else if((realNum > userNum + 20) || (realNum < userNum -20)) {
            if((realNum > userNum + 30) || (realNum < userNum - 30)) {
                this.setCurretFeedback(this.state.possibleFeedback[3]);
            } else {
                this.setCurretFeedback(this.state.possibleFeedback[2]);
            }
        } 
        
    }

    setCurretFeedback(currentFeedback) {
        this.setState({currentFeedback})
    }

    setNewGame() {
        const newState = Object.assign({}, this.state);

        newState.newGame = true;
        newState.correctNum = Math.floor(Math.random() * 100 + 1);
        newState.currentFeedback = "Make your guess!";
        newState.guessList = [];

        this.setState(newState);
    }

    render() {

        const guessCount = this.state.guessList.length;

        return(
            <div>
                <Header newGame={() => {this.setNewGame()}}/>
                <GuessSection feedback={this.state.currentFeedback} onGuess={guess => this.setCurrentGuess(guess)} />
                <GuessCount count={guessCount} />
                <GuessList guesses={this.state.guessList} />
            </div> 
        )
    }
}


import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import GuessCount  from './guess-count';
import GuessList from './guess-list';

const possibleFeedback = ["Hot", "Warm", "Cold", "Ice Cold", "You Won! Click New Game to play again", "Make your guess!"];

export default class Game extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            currentFeedback: '',
            guessList: [],
            correctNum: Math.floor(Math.random() * 100 + 1),
            newGame: false,
            showModel: false,
            showMain: true,
            won: false
        }
    }
    

    setCurrentGuess(currentGuess) {

        if(!this.state.guessList.includes(currentGuess)) {
            this.setState({guessList:[...this.state.guessList, currentGuess]});
            
            const realNum = parseInt(this.state.correctNum);
            const userNum = parseInt(currentGuess);
    
            console.log(realNum);
      
            if(userNum === realNum){
                this.setCurrentFeedback(possibleFeedback[4]);
                this.setState({won: true})
            } else if((realNum <= userNum + 20) && (realNum >= userNum - 20)) {
                if((realNum <= userNum + 10) && (realNum >= userNum - 10)) {
                    this.setCurrentFeedback(possibleFeedback[0]);
                } else {
                    this.setCurrentFeedback(possibleFeedback[1]);
                }
            } else if((realNum > userNum + 20) || (realNum < userNum -20)) {
                if((realNum > userNum + 30) || (realNum < userNum - 30)) {
                    this.setCurrentFeedback(possibleFeedback[3]);
                } else {
                    this.setCurrentFeedback(possibleFeedback[2]);
                }
            } 
        } else {
            alert('You guessed this number already')
        }
        
    }

    setCurrentFeedback(currentFeedback) {
        this.setState({currentFeedback})
    }

    showModelUpdate() {
        this.setState({showModel: !this.state.showModel});
    }

    showMainUpdate() {
        this.setState({showMain: !this.state.showMain});
        this.setState({showModel: !this.state.showModel});
    }

    setNewGame() {
        const newState = Object.assign({}, this.state);

        newState.won = false;
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
                <Header newGame={() => {this.setNewGame()}} showModel={() => {this.showModelUpdate()}} showMainButton={() => {this.showMainUpdate()}} show={this.state.showModel}/>
                <GuessSection feedback={this.state.currentFeedback} onGuess={guess => this.setCurrentGuess(guess)} won={this.state.won}/>
                <GuessCount count={guessCount} />
                <GuessList guesses={this.state.guessList} />
            </div> 
        )
    }
}


import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionPlay from 'material-ui/svg-icons/av/play-arrow';
import ActionPause from 'material-ui/svg-icons/av/pause';
import ActionReset from 'material-ui/svg-icons/av/replay';
import './Timer.css';

const TIMER_25 = 1 * 5 * 1000;

export default class Timer extends Component {

  constructor(props){
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      time: TIMER_25
    }
  }

  start(){
    if(!this._interval){
      this._interval = setInterval(() => {
        if(this.state.time !== 0){
          this.setState({
            time: this.state.time - 1000,
          });
        } else {
          let audio = new Audio('BikeHorn.mp3');
          audio.play();
          this.clear();
        }
      }, 1000);
    }
  }

  stop(){
    this.clear();
  }

  clear(){
    if(this._interval){
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  reset(){
    this.clear();
    this.setState({
      time: TIMER_25
    })
  }

  addZero(number){
    return number < 10 ? '0' + number : number;
  }

  render (){
    let time = this.state.time;
    let seconds = Math.floor( (time/1000) % 60 );
    let minutes = Math.floor( (time/1000/60) % 60 );
    let completed = 100 * (time / TIMER_25);

    return (
      <div className="Timer">
        <div className="clock-wrapper">
          <CircularProgress
            mode="determinate"
            value={completed}
            size={250}
            thickness={10}
            color="#A12B12"
          />
          <div className="time-wrapper">
            <p>{this.addZero(minutes)}:{this.addZero(seconds)}</p>
          </div>
        </div>
        <footer>
        <FloatingActionButton onClick={this.start} className="action-button" backgroundColor="#A12B12">
          <ActionPlay />
        </FloatingActionButton>
        <FloatingActionButton onClick={this.stop} className="action-button" backgroundColor="#A12B12">
          <ActionPause />
        </FloatingActionButton>
        <FloatingActionButton onClick={this.reset} className="action-button" backgroundColor="#A12B12">
          <ActionReset />
        </FloatingActionButton>
        </footer>
      </div>
    )
  }
}

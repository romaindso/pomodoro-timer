import React, { Component } from 'react';

const TIMER_25 = 25 * 60 * 1000;

export default class Timer extends Component {

  constructor(props){
    super(props);
    this.state = {
      time: TIMER_25
    }
  }

  start(){
    if(!this._interval){
      this._interval = setInterval(() => {
        this.setState({
          time: this.state.time - 1000,
        });
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

    return (
      <div>
        <p>{this.addZero(minutes)}:{this.addZero(seconds)}</p>
        <button onClick={() => this.start()}>start</button>
        <button onClick={() => this.stop()}>stop</button>
        <button onClick={() => this.reset()}>reset</button>
      </div>
    )
  }
}

import React, { Component } from "react";
import "./PokeFetch.css";
// import CountDownTimer from '../Timer/Timer'

class PokeFetch extends Component {
  constructor() {
    super();
    this.state = {
      pokeInfo: "",
      pokeSprite: "",
      pokeName: "",
    };
  }

  fetchPokemon = () => {
    let min = Math.ceil(1);
    let max = Math.floor(500);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className={"wrapper"}>
        <Timer pokeFetch={this.fetchPokemon} img={this.state.pokeSprite} name={this.state.pokeName}/>
        <div className={"pokeWrap"}>
        </div>
      </div>
    );
  }
}

export default PokeFetch;

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 10,
      answers: 0,
    };
  }

  startTimer = () => {
    this.timer = setInterval(this.countDown, 1000);
    this.props.pokeFetch();
  };

  countDown = () => {
    const { seconds } = this.state;
    let c_seconds = seconds;

    if (c_seconds) {
      // seconds change
      seconds
        ? this.setState({ seconds: seconds - 1 })
        : this.setState({ seconds: 10 });
    } else {
      clearInterval(this.timer);
    }
  };

  correct = () => {
    this.setState({
      seconds: 10,
      answers: this.state.answers + 1,
    });
  };

  wrong = () => {
    this.setState({
      seconds: 10,
      answers: this.state.answers - 1,
    });
  };

  render() {
    const { seconds, answers } = this.state;

    return (
      <div className="timer">
        <div >
          <button onClick={this.startTimer} className="start">
            Start
          </button>
        <h1> You have {seconds} seconds <br/><br/> left to guess!! </h1>
        {(!this.props.img) ? <> </> : 
        <>
        <img className={"pokeImg"} src={this.props.img} />
        <h1 className={"pokeName"}>{this.props.name}</h1>
        </>
        }
        <div>
        <h3> You currently have guessed {answers} correctly</h3>
          <div className='after'>
          <h1>Did you get it </h1>
          <button onClick={this.correct} className="answers">
            Right!!!
          </button>
          <span> OR </span>
          <button onClick={this.wrong} className="answers">
            Wrong....
          </button>
        </div>
          </div>
        </div>
      </div>
    );
  }
}

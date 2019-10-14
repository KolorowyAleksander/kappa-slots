import React from 'react';

import { API, graphqlOperation } from 'aws-amplify';
import { runSlotmachine } from '../graphql/mutations';

import './Slotmachine.css';

const IconHeight = 188;


const possibleResults = [
  'cherry',
  'dollar',
  'mellon',
  'warek', 
  'fish', 
  'rolex',
  'five-o', 
  'billberry', 
  'kappa'
];

const alertMessage = `
GRATULACJE UŻYTKOWNIKU!\n
You has become a winner our our lottery. You have
gotten the elusive prestigouius THREE GOLDEN KAPPAS!

OF IMPORTANCE!
To retrieve the reward of 50.00.00¥ you must contact
the administrators on this e-mail address: c4210797@urhen.com
with you credit card details so payment can be made.
`

function getNumberForElement(element) {
  return possibleResults.indexOf(element);
}

export default class SlotMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = { running: false };
    this.roll = this.roll.bind(this);
    this.rollEnded = this.rollEnded.bind(this);
  }

  rollEnded() {
    this.setState({...this.state, running: false});
  }

  async roll() {
    try {
        if (this.state.running) {
          return;
        }
        const { data } = await API.graphql(graphqlOperation(runSlotmachine));
        console.log(data);
        this.setState({...this.state, ...data.runSlotmachine, running: true});

        if (data.runSlotmachine.winner === "true") {
          setTimeout(function() {
            alert(alertMessage);
          }, 2500);
        }
    } catch (e) {
        console.log('Exception caught when retrieving user data', e);
    }
  };

  render() {
    return <>
      <div className={`spinner-container`}>
        <Spinner onEnd={this.rollEnded} 
                 running={this.state.running}
                 endElement={getNumberForElement(this.state.first)}
                 timer="900" />
        <Spinner onEnd={this.rollEnded} 
                 running={this.state.running} 
                 endElement={getNumberForElement(this.state.second)}
                 timer="1400" />
        <Spinner onEnd={this.rollEnded} 
                 running={this.state.running} 
                 endElement={getNumberForElement(this.state.third)}
                 timer="2200" />
      </div>
      <div className="button-container">
        <button className="reroll-button" onClick={this.roll}>LET'S ROLL</button>
      </div>
      <div className="broken-image" />
    </>;
  }
}

class Spinner extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { position: 0 };
  };   

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.running) {
      this.reset();
    }
  }

  reset() {
    if (this.timer) { 
      clearInterval(this.timer); 
    }  

    const startPosition = this.props.endElement * IconHeight *-1;
    this.setState({
      position: startPosition,
      timeRemaining: this.props.timer        
    });

    this.timer = setInterval(() => { this.tick() }, 100);      
  }

  tick() {      
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);        
      this.props.onEnd();
    } else {
      this.setState({ 
        position: this.state.position - IconHeight * 900/this.props.timer,
        timeRemaining: this.state.timeRemaining - 100
      })
    }      
  }

  render() {
    const { position } = this.state;   
    return (            
      <div 
        style={{backgroundPosition: '0px ' + position + 'px'}}
        className={`icons`}          
      />
    )
  }
}
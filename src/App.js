import React, { Component, Fragment } from 'react';
import './App.css';
import * as _ from 'lodash';

// This shouldn't be hardcoded. Need a dumb backend to generate random words and maybe an admin console to upload new ones.
// Can get more complex with this by having an admin "announce" terms as they're said I guess..
const WORDS = [
  'Noisy Press/Crew', 'Coughing', 'Low Risk', 'Phone Notification', 'Solidarity', 'Late Start',
  'Hydrate Hydrate Hydrate', 'Praise China', 'Time is the essence', 'French is spoken', 'Ryan man-splaining',
  'No speculation', 'Video feed cuts out', 'Audio issues', 'Handling', 'No stigmatism/racism', 'super-spreader',
  'Tedros needs translator', 'Common enemy', 'Dodged Question', 'Mo Money Mo Problems', 'Taiwan', 'Transparent',
  'Tough reporter question', 'Guy plays with his phone', 'Random zooming/panning', 'Nokia ring tone', 'Tedros gets angry'
]

const BingoTile = (props) => {
  // yes, isCenter is a disgusting hack but I was lazy
  const { onClick, text, selected, isCenter } = props;
  let className = 'card';
  if(selected)
    className += ' selected';      
  return ( 
    <div className={className} onClick={onClick}>
      {!isCenter ? text : <img src='who-logo.png' />} 
    </div>      
  );
}

const rcid = (row, col) => {
  return 'r' + row + 'c' + col;
}

class Bingo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      selectedTiles: {}
    };
  }  

  componentDidMount() {
    let W = _.shuffle(WORDS)
    this.setState({words: _.range(25).map(i => W[i])});
  }

  tileCallback(row, col) {    
    return () => {
      debugger;
      const s = {...this.state.selectedTiles};
      s[rcid(row,col)] = !s[rcid(row, col)];
      this.setState({selectedTiles: {...s}});      
    } 
  }

  render() {
      const { words, selectedTiles } = this.state;
      return (
        <div style={{display: 'table', width: '100%', height: '80vh'}}>
          {_.chunk(words, 5).map((words, ridx) => (
            <div class='row'>
              {words.map((word, cidx) => <BingoTile isCenter={ridx===2 && cidx===2}
                text={word} onClick={this.tileCallback(ridx,cidx)} selected={selectedTiles[rcid(ridx,cidx)]}/>)}          
              <br />        
            </div>              
          ))} 
        </div>
      );          
  }
}

export default Bingo;

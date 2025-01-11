import './App.css';

import Popup from './components/Popup';
import React from 'react';
import lets from  './images/lets.png'
import paper from './images/paper.png'
import paperR from './images/paperR.png'
import play from './images/play.png'
import scissors from './images/scissors.png'
import scissorsL from './images/scissorsL.png'
import stone from './images/stone.png'
import stoneL from './images/stoneL.png'
import { useState } from 'react'

function App() {
  const [user,setScore] = useState(0);
  const [cmp,setcmpScore] = useState(0);
  const [draw,setdrawScore] = useState(0);
  const [cmpChoice, setcmpChoice] = useState(play);
  const [first, setfirst] = useState(lets);
  const [popupContent, setPopupContent] = useState('');

  const[open , setOpen] = useState(false);
  const togglePopup = () => {
    setOpen(!open);
  }
  const winner = ()=>{
    if(user === 5 ){
      setPopupContent(
        <>
          <b>You Won the Game!!</b>
          <p>Congrats</p>
        </>
      );
      setOpen(true);
      restGame();
      }
    else if(cmp === 5){
      setPopupContent(
        <>
          <b>You Lost the Game!!</b>
          <p>Better Luck Next Time!!</p>
        </>
      );
      setOpen(true);
      restGame();
    }
    
    } 
    const restGame= ()=>{
    setcmpChoice(play);
    setfirst(lets);
    setScore(0);
    setcmpScore(0);
    setdrawScore(0);
  }
  
  const genCmpRes = () => {
    let res = Math.floor(Math.random() * (9)+1);
    let choice = '';
    if (res <= 3) {
      choice = 'paper';
      setcmpChoice(paperR);  
    }
    else if(res>=4 && res<=6){
      choice = 'stone';
      setcmpChoice(stone);
    }
    else{
      choice = 'scissors';
      setcmpChoice(scissors);
    }
    return choice;
  }


  


  return (
    <div className="App">
      <div className="container">
        <h1 className='title'>Rock - Paper - Scissors</h1>
        <div className="game">
          <div className='icons'>
            <img src={first} width={164} height={160} alt='images' />
            <img src={cmpChoice} width={164} height={160} alt='computer' />
          </div>

          <div className='buttons'>
            <button onClick={() => {
              
              setfirst(stoneL);
              let val = genCmpRes();
              if (val === 'scissors' && first === stoneL) {
                setScore(user + 1);
              }
              else if(val === 'stone'){
                      setdrawScore(draw + 1);
              }
              else {
                setcmpScore(cmp + 1);
              }
              

              winner();
              console.log(val);
  
            }} className='rock' >Rock</button>

            <button  onClick={() => {
              setfirst(paper);
              let val = genCmpRes();
              if (val === 'paper' && first === paper) {
                setdrawScore(draw+1);
              }
              else if(val === 'scissors'){
                  setcmpScore(cmp +1);
              }
              else{
                setScore(user+1);
              }
              winner();
              console.log(val);
            }} className='paper'>Paper</button>

            <button onClick={() => {
              setfirst(scissorsL);
              let val = genCmpRes();
              if(val === 'paper'){
                setScore(user +1);
              }
              else if(val === 'stone'){
                setcmpScore(cmp+1);
              }
              else{
                setdrawScore(draw+1);
              }
              winner();
              console.log(val);
            }}
             className='scissors'>Scissors</button>
          </div>


        </div>
         <div className='scorecard'>
          <h2>Score</h2>
          </div>
          <div className='score'>
            <p>Player : {user}</p>
            <p>Computer : {cmp}</p>
            <p>Draw : {draw}</p>
          </div>
          {open && (
          <Popup content={popupContent} handleClose={togglePopup} />
        )}
      </div>
    </div>
  );
}


export default App;

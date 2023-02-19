import './App.css';
import { useState, useEffect } from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {

  const generateNewDie = () => {
    return {
      value: (Math.floor(Math.random() * 6)) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  const allNewDice = () => {
    const randomNums = [];
    for(let i = 0; i < 10; i++){
      randomNums.push(generateNewDie());
    }
    return randomNums;
  }

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  const rollDice = () => {
    if(!tenzies){
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }else{
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  const holdDice = id => {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id === id ? 
          { ...die, isHeld: !die.isHeld} : die
      })
    })
  }

  useEffect(() => {
    // winning conditions: all dice are held and have the same value
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if(allHeld && allSameValue){
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice])
  
  return (
    <main className="bg-[#F5F5F5] h-[40vh] max-w-[800px] mx-auto rounded-xl p-5 flex flex-col items-center justify-between">
      {tenzies && <Confetti />}
      <div className="text-center">
        <h1 className="text-2xl font-extrabold uppercase text-sky-900 my-4">Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {dice.map(die => (
          <Die 
            {...die} 
            key={die.id} 
            holdDice={holdDice}
          />
          ))}
      </div>
      <button className="px-4 py-2 text-white uppercase rounded-md text-md bg-sky-900" onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}

export default App;

//this project is for 25+5 clock ,,,for RandomQuote plz check in project.js file
import React from 'react';
import  {useState ,useEffect} from 'react'; 
import './App.css';

function Clock(){
  const [breaklength,setBreakLength]=useState(5);
  const [sessionlength,setSessionLength]=useState(25);
  const [titlename, setTitleName] =useState("Session ");
  const [timeleft,setTimeleft]=useState(25*60);
  const [play,setPlay]=useState(false);
  const timeoutID  =()=> setTimeout(() => {
    if(timeleft && play){
      setTimeleft(timeleft - 1)
    }
  }, 1000);
  const headings= titlename==="Session" ? "Session":"Break";
  
  const clock=()=>{
    if(play){
      timeoutID()
      resetTiming() 
    }
      clearTimeout(timeoutID)

  }
  const resetTiming =()=>{
    const audio=document.getElementById("beep");
    if(!timeleft && titlename==="Session"){
      setTimeleft(breaklength*60)
      setTitleName("Break")
      audio.play()
    }
    if(!timeleft && titlename==="Break"){
      setTimeleft(sessionlength*60)
      setTitleName("Session")
      audio.play()
    
    }
  }
 

  const getReset=()=>{
    clearTimeout(timeoutID);
    setPlay(false);
    setTitleName("Session");
    setBreakLength(5);
    setSessionLength(25);
    setTimeleft(25*60);
    const audio=document.getElementById("beep");
    audio.pause();
    audio.currentTime=0;
}
 const getPlay=()=>{
  clearTimeout(timeoutID);
  setPlay(!play);
}
 
  useEffect(()=>{
    clock()
  },[play,timeleft,timeoutID])

 
  const timeBending =()=>{
         const min= Math.floor(timeleft/60);
         const sec=timeleft-min*60;
         const requiredMinutes= min<10?'0'+min : min;
         const requiredSeconds= sec<10?'0'+sec: sec;

         return (`${requiredMinutes}:${requiredSeconds}`)

  }
  
  const breakLengthIncrease=()=>{
    if(breaklength<=59){ setBreakLength(breaklength+1)}
  } 
  const breakLengthDecrease=()=>{
    if(breaklength>1){ setBreakLength(breaklength-1)}
  }
  const sessionLabelIncrease=()=>{
    if(sessionlength<60){ 
      setSessionLength(sessionlength+1)
      setTimeleft(timeleft+60)
     }
  } 
  const sessionLabelDecrease=()=>{
    if(sessionlength>1){ 
      setSessionLength(sessionlength-1)
      setTimeleft(timeleft-60)
    }
  }

 

  return(
   <div className='wrapper'>
   <div><h3 id='name'> 25+5 Clock</h3>
   <div ><strong id='break-label'>Break Length</strong>
     <div>
     <button disabled={play} onClick={breakLengthIncrease} id=' break-increment'  >increase</button>
     <b id='break-label'>{breaklength}</b>
     <button disabled={play} onClick={breakLengthDecrease} id='break-decrement'>decrease</button>
     </div>
   </div>
   <div><strong id='session-label'>Session Length</strong>
     <div>
     <button disabled={play} onClick={sessionLabelIncrease}  id='session-increment' >increase</button>
     <b id='session-label'>{sessionlength}</b>
     <button disabled={play} onClick={sessionLabelDecrease} id='session-decrement' >decrease</button>
     </div>
   </div> 
   </div>
   <div>
   <div id='wrapper2'>
   <h2 id='time-label'>{headings}</h2>
   <h2 id='time-left'>{timeBending()}</h2> </div>
    <button onClick={getPlay} id='start_stop' >start / stop</button>
    <button onClick={getReset} id='reset'>reset</button>
   </div>
   <audio id='beep' preload="auto" src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'/>



   </div>   
  );
  
}

export default Clock;

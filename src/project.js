import React, { useEffect , useRef} from 'react';
import  Button from '@mui/material/Button';
import './pro.css';
import { FaTwitter } from 'react-icons/fa';
import {BsQuote} from 'react-icons/bs';
import {AiOutlineLine} from 'react-icons/ai';
import Header from './header';
import Footer from './footer';

function QuoteBox({quote,handleQuote}){
 
 let colours=["#b4e7ec","#2596be","#be4d25","white","#b4e7ec"];
 const textRef=useRef();

 useEffect(()=>{
  textRef.current.style.color=colours[Math.round(Math.random()*(colours.length-1))];
 },[quote]);

  return(
    <div>
    <Header/>

    <div id='quote-box'  style={{marginBottom:123,marginTop:123,position:'sticky'}}>
    <div id="innerBox">

    <p style={{paddingLeft:120, color:"orange"}}><BsQuote/></p>
  
    <p id='text' ref={textRef}> {quote.text}<br/>
    <p style={{color:"orange",paddingLeft:110}}>
    <AiOutlineLine  /><AiOutlineLine/></p>
    <h3 id='author'   style={{textAlign:"center",paddingBottom:25}}>{quote.author}</h3>
     </p>
     
    <div>
    <Button id='new-quote' variant="contained" onClick={handleQuote} sx={{marginBottom:3}}>New-Quote</Button>
  
    <a target="_blank" rel="noopener noreferrer" 
    href= {"https://twitter.com/intent/tweet?hashtags=RandomQuotesProject&hashtags=quotes&text=" +
     encodeURI(quote.text + " -- " + quote.author)
    }
    id='tweet-quote' ><FaTwitter style={{fontSize:30}}/></a>
    </div>
    </div>
    </div>
    <Footer/>
  </div>
  )
}


function Rand(){

 const [quote,setText]=React.useState('');
 
 const getQuotes=()=>{
   fetch("https://type.fit/api/quotes")

   .then((res)=>res.json())
   .then((data)=>{
    let randomNumber =Math.round(Math.random()*(data.length-1))
    setText(data[randomNumber]);
   })
 }

 useEffect(()=>{
  getQuotes();
 },[]);
 
  return(
    
    <div id='header'>
    
    <QuoteBox quote={quote}  handleQuote={getQuotes} ></QuoteBox>
    </div>
  
  )
}
export default Rand;

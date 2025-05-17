import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import './pro.css';
import { FaTwitter } from 'react-icons/fa';
import { BsQuote } from 'react-icons/bs';
import { AiOutlineLine } from 'react-icons/ai';
import Header from './header';
import Footer from './footer';

function QuoteBox({ quote, handleQuote }) {
  const colours = ["#b4e7ec", "#2596be", "#be4d25", "white", "#b4e7ec"];
  const textRef = useRef();

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.color = colours[Math.floor(Math.random() * colours.length)];
    }
  }, [quote]);

  return (
    <div>
      <Header />
      <div id='quote-box' style={{ marginBottom: 123, marginTop: 123, position: 'sticky' }}>
        <div id="innerBox">
          <p style={{ paddingLeft: 120, color: "orange" }}><BsQuote /></p>
          <p id='text' ref={textRef}>
            {quote.text}<br />
            <p style={{ color: "orange", paddingLeft: 110 }}>
              <AiOutlineLine /><AiOutlineLine />
            </p>
           
          </p>
          <div>
            <Button
              id='new-quote'
              variant="contained"
              onClick={handleQuote}
              sx={{ marginBottom: 3 }}
            >
              New Quote
            </Button>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/intent/tweet?hashtags=RandomQuotesProject,quotes&text=${encodeURI(quote.text + " -- " + (quote.author || "Anonymous"))}`}
              id='tweet-quote'
            >
              <FaTwitter style={{ fontSize: 30 }} />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

async function getRandomQuote(setQuote) {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setQuote({ text: data.slip.advice, author: '' });
  } catch (error) {
    console.error('Error fetching the quote:', error.message);
    setQuote({
      text: 'Failed to fetch a quote. Please try again later.',
      author: '',
    });
  }
}

function Rand() {
  const [quote, setQuote] = useState({ text: '', author: '' });

  const handleQuote = () => getRandomQuote(setQuote);

  useEffect(() => {
    handleQuote();
  }, []);

  return (
    <div id='header'>
      <QuoteBox quote={quote} handleQuote={handleQuote} />
    </div>
  );
}

export default Rand;

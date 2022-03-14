import React, {useState, useEffect} from 'react';
import './App.scss';
import COLOR_ARRAY from './colorsArray'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'




let quoteDBurl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("There is only one way to avoid criticism: do nothing, say nothing, and be nothing.")
  const [author, setAuthor] = useState('Aristotle')

  const [randomNumber, setRandomNumber] = useState(0)
  const generateRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randomInteger)
    setAccentColor(COLOR_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }

  const [quotesArray, setQuotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }


  useEffect(() => {
    fetchQuotes(quoteDBurl)
  }, [quoteDBurl])
  // const quotes = [{quote: "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.", author: 'Aristotle'}, {quote: "We must balance conspicuous consumption with conscious capitalism.", author: 'Kevin Kruse'}, {quote: "There are no traffic jams along the extra mile.", author: 'Roger Staubach'}]

 
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        <div id='quote-box'style={{color: accentColor}}>
        <p id='text'>
        "{quote}"
        </p>
       <p id='author'>
       - {author}
       </p>
       <div className='button'>
        <a style={{backgroundColor: accentColor}} id="tweet-quote" href={ encodeURI('http://www.twitter.com/intent/tweet?text=${quote} -${author}')}><FontAwesomeIcon icon={faTwitter} /></a>
        <button style={{backgroundColor: accentColor}} id='new-quote' onClick={() => generateRandomQuote()}>Generate new random quote</button>
       </div>
        </div>
     </header>
    </div>
  );
}

export default App;



import { Container } from '@material-ui/core';
import { waitForDomChange } from '@testing-library/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Header from "./component/Header/Header";
import Definitions from './component/Definitions/Definitions';


function App() {
  const [word, setWord] = useState([""]);
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");

  const dictionaryApi = async() =>{
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
        );
        
        setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  console.log(meanings);
  
  useEffect(()=>{
    dictionaryApi();
  }, [word, category])

  return <div 
  className="App"
  style={{height: "100vh", backgroundColor: "#2f4f4f", color: "white" }}
  >
    <Container maxWidth="La" 
    style={{display: "flex", flexDirection: "collumn", height: '100vh' }}
    >
      <Header 
      category={category}
      setCategory= {setCategory}
      word={word}
      setWord={setWord}
      />
      {meanings.length > 0 && (<Definitions word = {word} meanings = {meanings} category={category} />)}
    </Container>
  </div>
  
}


export default App;

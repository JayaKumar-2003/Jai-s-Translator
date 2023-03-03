import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css'
function App () {
  const [options , Setoptions] = useState([]);
  const [to,Setto]= useState("en");
  const [from,setfrom]= useState("en");
  const [input,Setinput] = useState("");
  const [output,setOutput] = useState("");

  const translate=() =>{
    const params = new URLSearchParams();
  params.append('q',input);
  params.append('source',from);
  params.append('target',to);
  params.append('api_key','xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx');


  Axios.post("https://libretranslate.de/translate",params,{
    headers :{'accept' : 'application/json',
    'Content-Type':'application/x-www-form-urlencoded'},
  }).then(res => {
    console.log(res.data);
    setOutput(res.data.translatedText);
});
}
  useEffect(()=>{
    Axios.get("https://libretranslate.de/languages").then(res => {
      console.log(res.data);
      Setoptions(res.data);
    })
  })
  return (
    <div className='body'>
      <span className='brand'> Jai's Translator</span>
      <div> <span> From {from}</span>
      <select onChange={(e)=>setfrom(e.target.value)}>
      {options.map(opt=><option key={opt.code} value={opt.code}> {opt.name}</option>)}
      
      </select>
      </div>

      <div><span>To {to} </span>
      <select onChange={(e)=>Setto(e.target.value)}>
      {options.map(opt=><option key={opt.code} value={opt.code}> {opt.name}</option>)}
      </select>
      </div>
      <div >
      <input type='text' onInput={(e)=>Setinput(e.target.value)}></input>
      </div>
      <div>
      <input type='text' value={output}></input>
      </div>
      <div>
        <button onClick={e=>translate()}>Translate</button>
      </div>
    </div>
  );
};

export default App;

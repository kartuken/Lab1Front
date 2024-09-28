import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [ data, setData ] = useState("");
  const [ responseData, setResponseData ] = useState("");
  const [info, setInfo] = useState("");

  const submitFunc = async () => {
    const response = await fetch('/api/dido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "text": data }),
    });


    if(!response.ok){
      console.log("Doesn't response")
      console.log("Sending: " + JSON.stringify({ "text": data }))
      return;
    }
    try {
      setInfo(await response.json());
      console.log(info);
    }
    catch{
      console.log("Empty")
    }
  }
  const takeDataFromServer = async () => {
      console.log("Before sending")
      const response = await fetch("/api/dido",{
          method: "GET"
      })
      if(!response.ok){
          console.log("Error sending")
          return;
      }
      console.log("Sending")
      let responseDataFromServer = await response.json();
      console.log(responseDataFromServer)
      setResponseData(responseDataFromServer.text)
  }



  return (
    <div>
    <form onSubmit={(e) => {
      e.preventDefault();
      submitFunc(data);
    }}>
      <input type="text" value={data} onChange={e => setData(e.target.value)} />
      <button type="submit">Submit</button>
      <span>{info.text}</span><br />
    </form>
    <form onSubmit={(e) => {
                e.preventDefault();
                takeDataFromServer();
            }}>
              <input type="text" name="text" />
                <button type="submit">Принять с сервера</button>
                {responseData}
          </form>

    </div>
  );
}


export default App

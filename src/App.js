import React, {Component, useState, useEffect} from 'react'
import Scanner from './Components/Scanner'
import Buttons from './Components/Buttons'
import './App.css';

const MODE_SCANNER = 'scanner';
const MODE_ACTIONS = 'actions';
const MODE_MESSAGE = 'message';

function App() {

    const [result, setResult] = useState(null)
    const [responseSuccess, setResponseSuccess] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [actions, setActions] = useState([])

    const [mode, setMode] = useState(MODE_SCANNER);


    useEffect(() => {
        if (result === '' || result === null) {
            return;
        }
        const options = {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result),
            cors: 'no-cors'
        };
        fetch(`http://magazyn.cart-pack.pl/order/codes/status`, options)
            .then(response => response.json())
            .then(json => {
                setActions(json.actions)
                setMode(MODE_ACTIONS)
            })


    }, [result])
    const reset = () => {
        setResult(null);
        setActions([]);
        setMode(MODE_SCANNER)
    }

    const send = data => {

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch("http://magazyn.cart-pack.pl/order/codes/action", options)
            .then(response => response.json())
            .then(json => {
            const {msg,success} = json;
            setResponseSuccess(success);
            setResponseMessage(msg);
            setMode(MODE_MESSAGE)
            // console.log(json)
        })
    }


    return (
        <div className="wrapper-qr">
            {mode === MODE_SCANNER && <Scanner onScan={val => setResult(val)}/>}
            {mode === MODE_ACTIONS && actions && actions.length > 0 && <Buttons items={actions} reset={reset} onClick={send} />}
            {mode === MODE_MESSAGE && <>
                <p className="msg">{responseMessage}</p>
                {responseSuccess === true &&<><i className="far fa-check-circle"></i>  <button className="btn-result" onClick={() => reset()}>Skanuj kolejny</button> </>}
                {responseSuccess !== true && <><i class="far fa-times-circle"></i> <button className="btn-result err" onClick={() => setMode(MODE_ACTIONS)}>Spróbuj jeszcze raz</button></>}
            </>}
        </div>
    )
}

export default App;
 
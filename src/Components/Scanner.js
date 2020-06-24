import React, {Component, useState,useEffect} from 'react'
import QrReader from 'react-qr-reader'
import Buttons from '../Components/Buttons';

function Scanner({onScan}){
 
  const handleError = er => console.log(er)

    return (
      <div className="wrapper-qr">
        <h1 className="heading-1">Zeskanuj kod QR</h1>
        <QrReader className="scaner" onScan={onScan}
          delay={300}
          onError={handleError}
          />
      </div>
    )
}
export default Scanner;
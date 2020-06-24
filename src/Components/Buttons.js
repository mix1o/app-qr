import React from 'react'
import Button from './Button';

function Buttons({items, reset, onClick}) {

    return (
        <div className="buttons-ctr">
            {items.map(action => <Button variant={`btn btn-${action.variant}`} key={action.id} name={action.name} onClick={() => onClick(action)}/>)}
            <button className="btn-back" onClick={reset}>Powrót</button>
        </div>
    )

}

export default Buttons;

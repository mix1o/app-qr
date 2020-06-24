import React from 'react'

const Button = ({name, variant, onClick}) => <button className={variant} onClick={onClick}>{name}</button>

export default Button;

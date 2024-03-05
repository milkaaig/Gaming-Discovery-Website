import React from 'react'
interface props{
    cartItems: string[]
    onClear: () => void,
}

function Cart({cartItems, onClear}: props) {
  return (
    <>
    <div>Cart</div>
    <ul>
        {cartItems.map(item => <li key={item}>{item}</li>)}
        <button onClick={onClear}>Clear</button>
    </ul>
    </>
  )
}

export default Cart
import React from 'react'
interface props{
    cartItemsCount: number;
}

function NavBar({cartItemsCount}:props) {
  return (
    <div>
        NavBar: {cartItemsCount}
    </div>
  )
}

export default NavBar
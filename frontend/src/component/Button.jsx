import React from 'react'

function Button({lable,onClick}) {
  return (
    <button onClick={onClick} className='hover:bg-zinc-800 active:scale-96 bg-black w-fit rounded-xl text-white py-2 px-4'>{lable}</button>
  )
}

export default Button
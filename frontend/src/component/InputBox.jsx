import React from 'react'

function InputBox({onChange,lable,type,placeholder}) {
  return (
    <>
    <div className='font-semibold text-xl'>{lable}</div>
    <input type={type||"text"} placeholder={placeholder||"type here . . ."} className='w-full bg-zinc-300 p-2 rounded text-lg font-normal' onChange={onChange} />
    </>
  )
}

export default InputBox
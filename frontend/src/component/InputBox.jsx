import React from 'react'

function InputBox({onChange,lable}) {
  return (
    <>
    <div className='font-semibold text-xl'>{lable}</div>
    <input placeholder={"type here . . ."} className='w-full bg-zinc-300 p-2 rounded text-lg font-normal' onChange={onChange} type="text" />
    </>
  )
}

export default InputBox
import React, { useState } from 'react'
import InputBox from '../component/InputBox'
import Button from '../component/Button'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

function Send() {
  const [amount,setAmount]=useState(0)
  const [searchParam] = useSearchParams()
  const id = searchParam.get("id")
  const name = searchParam.get("name")
  const handleSendMoney=async()=>{
    await axios.post(`http://localhost:3030/api/v1/account/transaction`,{
      to:id,
      amount:amount
    },{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
  })
}
  return (
    <div className='h-screen w-full flex justify-center items-center bg-zinc-400'>
      <div className='signupbox  w-1/4 rounded-xl py-10 px-4 bg-zinc-200'>
        <h1 className='text-4xl font-semibold'>Send Money to:</h1>
        <div className='w-full flex flex-col gap-4 py-10'>
              <InputBox type={"Number"} placeholder={"amount"} lable={name} onChange={(e)=>setAmount(e.target.value)} />
              <Button onClick={handleSendMoney} lable={'Send ->'} />
        </div>
      </div>
    </div>
  )
}

export default Send
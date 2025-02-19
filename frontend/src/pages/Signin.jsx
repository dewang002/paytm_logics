import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../component/Button'
import InputBox from '../component/InputBox'
import axios from 'axios'

function Signin() {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const handleSign = async()=>{
    const res = await axios.post('http://localhost:3030/api/v1/user/signin',{
      password,
      email
    })
    console.log(res)
    localStorage.setItem("token", res.data.token)
    navigate("/dashboard")
  }
  return (
    <div className='h-screen w-full flex justify-center items-center bg-zinc-400'>
      <div className='signupbox  w-1/4 rounded-xl py-10 px-4 bg-zinc-200'>
        <h1 className='text-4xl font-semibold'>signIn</h1>
        <div className='w-full flex flex-col gap-4 py-10'>
              <InputBox lable={'Email'} onChange={(e)=>setEmail(e.target.value)} />
              <InputBox lable={'Password'} onChange={(e)=>setPassword(e.target.value)} />
              <Button onClick={handleSign} lable={'signIn'} />
        </div>
        <div className='text-lg'>have'nt registered?<span className='font-semibold border-b-2' onClick={()=>navigate("/signup")}>SignUp</span></div>
      </div>
    </div>
  )
}

export default Signin
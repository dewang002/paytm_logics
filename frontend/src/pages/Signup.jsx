import React, { useState } from 'react'
import InputBox from '../component/InputBox'
import Button from '../component/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Signup() {
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] =useState('')
  const handleSignup =async()=>{
   const res = await axios.post(`http://localhost:3030/api/v1/user/signup`,{
      name,
      email,
      password
    }) 
    localStorage.setItem("token",res.data.token)
  }
  return (
    <div className='h-screen w-full flex justify-center items-center bg-zinc-400'>
      <div className='signupbox w-1/4 rounded-xl py-10 px-4 bg-zinc-200'>
        <h1 className='text-4xl font-semibold'>signUp</h1>
        <div className='w-full flex flex-col gap-4 py-10'>
              <InputBox lable={'Full Name'} onChange={(e)=>setName(e.target.value)} />
              <InputBox lable={'Email'} onChange={(e)=>setEmail(e.target.value)} />
              <InputBox lable={'Password'} onChange={(e)=>setPassword(e.target.value)} />
              <Button onClick={handleSignup} lable={'signUp'} />
        </div>
        <div className='text-lg'>alredy a user?<span className='font-bold border-b-2' onClick={()=>navigate("/signin")}>SignIn</span></div>
      </div>
    </div>
  )
}

export default Signup
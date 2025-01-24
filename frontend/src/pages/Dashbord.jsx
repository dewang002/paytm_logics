import React, { useEffect, useState } from "react";
import InputBox from "../component/InputBox";
import Button from "../component/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashbord() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/v1/user/bulk?filter="+ name);
        setUsers(response.data.user); // Changed from 'user' to 'users'
      } catch (error) {
        console.error("Error fetching users");
      }
    };

    fetchUsers();
  }, [name]);

  return (
    <div>
      <div className="w-full py-4 px-4 border-b-[1px] flex justify-between ">
        <h1 className="font-semibold text-3xl">Paytm</h1>
        <div className="flex justify-center items-center gap-4 text-xl font-semibold">
          Hello
          <div className="h-10 w-10 flex justify-center items-center rounded-full bg-zinc-400 text-black">
            U
          </div>
        </div>
      </div>

      <div className="w-full px-4">
        <h1>current balace: 10000000000000000000</h1>
        <h1>Users</h1>
        <div>
          <InputBox
            onChange={(e) => setName(e.target.value)}
            lable={"find user"}
          />
        </div>
        <div className="w-full flex flex-col gap-4 py-4">
          {users &&
            users.map((elem) => (
              <div className="w-full flex justify-between" key={elem._id}>
                <div className="text-xl font-semibold">
                  {elem.name}
                </div>
                <Button lable={"send"} onClick={()=>
                  navigate(`/send ?name=${elem.name}&id=${elem._id}`)
                } />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashbord;

import React, {useEffect, useState } from 'react'
import'./update.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const Update = () => {
    const users = {
        name: "",
        address: "",
        email: "",
    };
    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const { id } = useParams(); 

    const inputHandler = (e) =>{
        const {name, value} = e.target;
        console.log(name, value);

 
        setUser({...user, [name]:value});
    }

    useEffect(() =>{
        axios.get(`http://localhost:4000/api/user/${id}`)
        .then((response)=>{
            setUser(response.data);
        });
    },[id]);

    const submitForm = async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:4000/api/update/user/${id}`, user)
            .then((response) =>{
                //console.log("User created successfully");
                toast.success(response.data.message, {position: "top-right" });
                navigate("/");
            })
            .catch((error) =>{
                console.log(error);
            })
    }
    return(
        <div className='addUser'>
            <Link to="/" type='button' className='btn btn-secondary'>
                <i className="fa-solid fa-backward"></i> Back
            </Link>
            <h3>Add New User</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        id='name'
                        onChange={inputHandler}
                        name='name'
                        value={user.name}
                        autoComplete='off'
                        placeholder = 'Enter your Name'
                    />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='address'>Address:</label>
                    <input
                        type='text'
                        id='address'
                        onChange={inputHandler}
                        name='address'
                        value={user.address}
                        autoComplete='off'
                        placeholder = 'Enter your Address'
                    />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        onChange={inputHandler}
                        name='email'
                        value={user.email}
                        autoComplete='off'
                        placeholder = 'Enter your Email'
                    />
                </div>
                <div className='inputGroup'>
                    <button type='submit' className='btn btn-primary'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Update;
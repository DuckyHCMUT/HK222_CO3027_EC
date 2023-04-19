import axios from 'axios';

import Swal from 'sweetalert2';

import { apiKey } from '../api/ApiKey';


import styled from 'styled-components';

import { useNavigate } from "react-router-dom";

import { useState } from 'react';


const Container = styled.div`
width: 50%;
    height: 80%;
    padding : 20px;
    position: absolute;
    border-radius : 20px;
    box-shadow: 0 0 0 2px #5a01a7;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid black;
    margin: auto;
`;


const Title = styled.h2`
	font-size: 25px;
	font-weight: 700;
	margin-bottom: 5%;
	color: black;
	letter-spacing: 1px;
	text-align: center;
`;

const Label = styled.h6`
	font-size: 20px;
	font-weight: 500;
	pointer-events: none;
	display: block;
	font-weight: 600;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	flex: 1;
	width: 100%;
	
	font-size: 20px;
`;

const InputContainer = styled.div`
	margin: 5px 0px;
	min-width: 40%;
	width: 100%;
`;

const Button = styled.button`
	border: 1px solid black;
	border-radius: 5px;
	font-size: 16px;
	letter-spacing: 1px;
	cursor: pointer;
	text-transform: uppercase;
	padding: 10px;
	font-weight: bold;
	width: 100%;
	background-image: linear-gradient(to right, rgb(225 50 50) 0%, rgb(218 154 38 / 58%) 51%, #e51f2b 100%);
`;
const ForgotPassword = styled.a`
	font-size: 14px;
	text-decoration: none;
	cursor: pointer;
	color: rgba(255, 255, 255, 1);
	font-weight: bold;
	display: block;
	float: right;
	margin-top: 5px;
`;


const Register = () => {

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        gender : "male",
        bday : "Wed Nov 14 2001 12:34:56 GMT+0000 (Coordinated Universal Time)"
    }); 

    const handleRegister = async (e) => {
        e.preventDefault();     

        await axios.post(apiKey + 'register', userInfo)
			.then((res) => {
				// Fire a success notification and save token, user info on success
				if (res.status === 200 && res.data.msg === 'New account has been successfully created.') {
					// Save token and user info
					sessionStorage.setItem('user', JSON.stringify(res.data.user));
					sessionStorage.setItem('token', res.data.token);

					Swal.fire({
						title: 'Login success!',
						html: 'Logged in as <b>' + res.data.user.name + '</b>. Redirect you back to the home page shortly, or click to process.',
						timer: 3000,
						icon: 'success',
						confirmButtonColor: '#3085d6',
						confirmButtonText: 'Redirect'
					}).then(() => {
						window.location = "/";
					});
				}
                else if (res.data.msg){
                    Swal.fire({
						title: "Error",
						html: res.data.msg,
						timer: 3000,
						icon: 'error',

					})
                }
			}).catch((error) => {
				Swal.fire({
					title: 'Login failed!',
					text: error.response.data.msg,
					icon: 'error',
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'Let me try again'
				});
			});
    }


  return (
    <Container>
        <Title>Register</Title>
        <Form >
            <InputContainer>
                <Label>Full name</Label>
                <Input
                    type="text"
                    placeholder="Enter fullname"
                    required
                    autoFocus
                    onChange={(e) => {
                        setUserInfo({...userInfo, name : e.target.value});
                    }}
                />
            </InputContainer>
            <InputContainer>
                <Label>Email address</Label>
                <Input
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => {
                        setUserInfo({...userInfo, email : e.target.value});
                    }}
                    autoFocus
                    required
                />
            </InputContainer>
            <InputContainer>
                <Label>Password</Label>
                <Input
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => {
                        setUserInfo({...userInfo, password : e.target.value});
                    }}
                    required

                />
                <ForgotPassword>Forgot password?</ForgotPassword>
            </InputContainer>
            <Button onClick={handleRegister}>Register</Button>
            <div
                style={{
                    marginTop : "20px",
                    cursor : "pointer",
                    color : "blue",
                    textDecoration: "underline"
                }} 
                
                onClick={() => {
                    navigate("/login")
                }}
            >
                Already have the account ? Login here
            </div>
        </Form>
    </Container>
  );
};



export default Register;
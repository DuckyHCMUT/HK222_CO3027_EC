import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useState } from 'react';

import { apiKey } from '../api/ApiKey';
import Header from '../components/Header';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-shadow: 0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15);
	width: 40vw;
	border-radius: 10px;
	margin-top: 3vw;
	margin-left: auto;
	margin-right: auto;
	padding: 10px;
`;

const Title = styled.h2`
	font-size: 25px;
	color: #d51010;
	letter-spacing: 0.5	px;
	text-align: center;
`;

const Label = styled.div`
	font-size: 16px;
	font-weight: 500;
	margin-bottom: 10px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	margin-top: 10px;
	font-size: 16px;
	border-radius: 5px;
	width: 20vw;
`;

const InputContainer = styled.div`
	margin: 10px;
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

const Hr = styled.hr`
	background-color: black;
	height: 0.02vh;
	width: 35vw;
`;

const BottomText = styled.span``;

const Register = () => {
    const [userInfo, setUserInfo] = useState({
        gender: "male",
        bday: "Wed Nov 14 2001 12:34:56 GMT+0000 (Coordinated Universal Time)"
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
                else if (res.data.msg) {
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
        <div>
            <Header user={sessionStorage['user']} />
            <Container>
                <Title>Register</Title>
                <Hr />
                <Form >
                    <InputContainer>
                        <Label>Full name</Label>
                        <Input
                            type="text"
                            placeholder="Enter fullname"
                            required
                            autoFocus
                            onChange={(e) => {
                                setUserInfo({ ...userInfo, name: e.target.value });
                            }}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label>Email address</Label>
                        <Input
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => {
                                setUserInfo({ ...userInfo, email: e.target.value });
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
                                setUserInfo({ ...userInfo, password: e.target.value });
                            }}
                            required

                        />
                    </InputContainer>
                    <Button onClick={handleRegister}>Register</Button>
                </Form>
                <Hr />
                <BottomText>
                    Already have the account? <Link to={"/login"} style={{ color: "blue", textDecoration: "inherit", marginTop: "20px", fontStyle: "italic" }}>
                        Login here.
                    </Link>
                </BottomText>
            </Container>
        </div>
    );
};



export default Register;
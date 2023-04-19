import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { apiKey } from '../api/ApiKey';
import { useState } from 'react';
import { isLoggedIn } from '../utility/utility';


const Container = styled.div`
	background-size: cover;
	align-items: center;
	border: 1px solid black;
	margin: 50px;
	padding: 30px;
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
	font-size: 16px;
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
	margin-top: 10px;
	font-size: 16px;
`;

const InputContainer = styled.div`
	margin: 20px 0px;
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


const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userInfo = { email, password };

		await axios.post(apiKey + 'login', userInfo)
			.then((res) => {
				// Fire a success notification and save token, user info on success
				if (res.status === 200 && res.data.msg === 'Successful') {
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
			}).catch((error) => {
				Swal.fire({
					title: 'Login failed!',
					text: error.response.data.msg,
					icon: 'error',
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'Let me try again'
				});
			});
	};


	if (isLoggedIn(sessionStorage['user'])) {
		window.location = "/";
	} else {
		return (
			<Container>
				<Title>Sign in</Title>
				<Form onSubmit={handleSubmit}>
					<InputContainer>
						<Label>Email address</Label>
						<Input
							type="email"
							placeholder="Enter email"
							onChange={(e) => setEmail(e.target.value)}
							autoFocus
						/>
					</InputContainer>
					<InputContainer>
						<Label>Password</Label>
						<Input
							type="password"
							placeholder="Enter password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<ForgotPassword>Forgot password?</ForgotPassword>
					</InputContainer>
					<Button>Sign in</Button>
				</Form>
			</Container>
		);
	}
}

export default Login;
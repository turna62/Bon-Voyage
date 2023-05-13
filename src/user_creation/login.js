

import React, { useState, useEffect } from 'react';
import './ucstyles.css';

export default function LogIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    fetch('http://localhost:5000/login_user', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json()) // convert data into JSON
      .then((data) => {
        console.log(data, 'userRegister');
        if (data.status === 'OK!') {
          alert('Logged In Successfully!');
          window.localStorage.setItem('token', data.data); // storing token in data
          window.localStorage.setItem('loggedIn', true);
          window.localStorage.setItem('userId', data.userId);
          
          window.location.href = "./mytrip?userId=" + data.userId;
        } else {
          alert('Error! Something went wrong!');
        }
      });
  }

  useEffect(() => {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');

    togglePassword.addEventListener('click', function () {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      this.classList.toggle('bi-eye');
    });

    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  }, []);

  return (
    <body class="signinbody">
      <div class="main-w3layouts wrapper">
        <div class="main-agileinfo">
          <div class="agileits-top">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
              <input
                class="text inputmail"
                type="email"
                name="email"
                placeholder="Email" 
                required=""
                onInput={(e) => setEmail(e.target.value)}
              />
              <input
                class="text inputp"
                type="password"
                name="password"
                placeholder="Password"
                required=""
                id="password"
                onInput={(e) => setPassword(e.target.value)}
              />
              <i class="bi bi-eye-slash" id="togglePassword"></i>
              <input class="inputsubmit" type="submit" value="LOGIN" />
            </form>
            <p>
              Don't have an account? Sign Up{' '}
              <a href="http://localhost:3000/sign-up">here.</a> Forgot Password? Reset{' '}
              <a href="http://localhost:3000/reset">here.</a>
            </p>
          </div>
        </div>
      </div>
    </body> 
  );
}
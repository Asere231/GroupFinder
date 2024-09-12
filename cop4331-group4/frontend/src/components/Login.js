import React, { useState } from 'react';
import { TEInput, TERipple } from "tw-elements-react";
import { Link } from "react-router-dom";

function Login()
{

  const app_name = 'cop4331-group4-31270b548dd6'
  function buildPath(route)
  {
      if (process.env.NODE_ENV === 'production') 
      {
          return 'https://' + app_name +  '.herokuapp.com/' + route;
      }
      else
      {        
          return 'http://localhost:5001/' + route;
      }
  }

  var loginName;
  var loginPassword;

  const [message,setMessage] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const handleUsernameChange = (e) => {
    setUsernameValue(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const doLogin = async event => {
    console.log('User Value:', usernameValue);
    console.log('Pass Value:', passwordValue);
    event.preventDefault();

    const obj = { username: usernameValue, password: passwordValue };
    const js = JSON.stringify(obj);

    try {    
        const response = await fetch(buildPath('api/login'), {
            method: 'POST',
            body: js,
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
           console.log('Failed to fetch: ' + response.statusText);
        }

        const res = await response.json();

        if (res.id <= 0) {
            setMessage('User/Password combination incorrect');
        } else {
            const user = { firstName: res.firstName, lastName: res.lastName, id: res.id };
            localStorage.setItem('user_data', JSON.stringify(user));

            setMessage('');
            window.location.href = '/map';
        }
    } catch(e) {
        alert('Error: ' + e.message);
    }    
};


return (
  <section className="h-full bg-neutral-200 dark:bg-neutral-700">
    <div className="container h-screen p-10">
      <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
        <div className="w-full">
          <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
            <div className="g-0 lg:flex lg:flex-wrap">
              {/* <!-- Left column container--> */}
              <div className="px-4 md:px-0 lg:w-6/12">
                <div className="md:mx-6 md:p-12">
                  {/* <!--Logo--> */}
                  <div className="text-center">
                    <img
                      className="mx-auto w-48"
                      src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      alt="logo"
                    />
                    <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                      We are The Lotus Team
                    </h4>
                  </div>

                  <form>
                    <p className="mb-4">Please login to your account</p>
                    {/* <!--Username input--> */}
                    <div>
                      <label htmlFor="loginName">Username: </label>
                      <input
                        type="text"
                        id="loginName"
                        value={usernameValue}
                        onChange={handleUsernameChange}
                        placeholder="Username"
                        className="mb-4 text-black"
                      />
                    </div>

                    <div>
                      <label htmlFor="loginPassword">Password: </label>
                      <input
                        type="password"
                        id="loginPassword"
                        value={passwordValue}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        className="mb-4 text-black"
                      />
                    </div>

                    {/* <!--Submit button--> */}
                    <div className="mb-12 pb-1 pt-1 text-center">
                      <button
                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                        type="button"
                        style={{
                          background:
                            "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                        }}
                        onClick={doLogin}
                        id="loginButton"
                      >
                        Log in
                      </button>
                    </div>

                    {/* <!--Forgot password link--> */}
                    <a href="#!">Forgot password?</a>

                    {/* <!--Register button--> */}
                    <div className="flex items-center justify-between pb-6">
                      <p className="mb-0 mr-2">Don't have an account?</p>
                      <Link to="/Register">
                        <button
                          type="button"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                          Register
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>

              {/* <!-- Right column container with background and description--> */}
              <div
                className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                style={{
                  background:
                    "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                }}
              >
                <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                  <h4 className="mb-6 text-xl font-semibold">
                    We are more than just a company
                  </h4>
                  <p className="text-sm">
                    THIS UPDATE WORKED
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);


  /*return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> }
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> }
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are The Lotus Team
                      </h4>
                    </div>

                    <form>
                      <p className="mb-4">Please login to your account</p>
                      {/* <!--Username input--> }
                      <TEInput
                        value = {usernameValue}
                        onChange={handleUsernameChange}
                        id ="loginName"
                        placeholder = "Username"
                        type="text"
                        label="Username"
                        className="mb-4"
                        
                      ></TEInput>
                  

                      {/* <!--Password input--> }
                      <TEInput
                        value = {passwordValue}
                        onChange={handlePasswordChange}
                        placeholder = "Password"
                        id ="loginPassword"
                        type="password"
                        label="Password"
                        className="mb-4"
                      ></TEInput>

                      {/* <!--Submit button--> }
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                            onClick={doLogin}
                            id = "loginButton"
                          >
                            Log in
                          </button>
                        </TERipple>

                        {/* <!--Forgot password link--> }
                        <a href="#!">Forgot password?</a>
                      </div>

                      {/* <!--Register button--> }
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        {/* <TERipple rippleColor="light"> }
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            Register
                          </button>
                        {/* </TERipple> }
                      </div>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> }
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );*/
    // return(
    //   <div className="flex justify-center items-center h-screen">
        
    //     <div id="loginDiv">
    //       <h1 className='font-semibold text-5xl'> Study Group Finder </h1>
    //       <form onSubmit={doLogin}>
    //      <div className="flex">
    //       {/* <span id="inner-title">PLEASE LOG IN, SIR</span><br /> */}
    //       <input type="text" id="loginName" placeholder="Username" 
    //         ref={(c) => loginName = c} /><br />
    //       <input type="password" id="loginPassword" placeholder="Password" 
    //         ref={(c) => loginPassword = c} />
    //       <input type="submit" id="loginButton" class="buttons" value = "Do It"
    //         onClick={doLogin} />
    //       </div>
    //       </form>
    //       <span id="loginResult">{message}</span>
    //   </div>
    //  </div>
    // );
};

export default Login;

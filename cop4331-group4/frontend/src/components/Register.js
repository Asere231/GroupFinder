import React, { useState } from "react";
//import { TEInput } from "tw-elements-react";
import { Link } from "react-router-dom";

const app_name = 'cop4331-group4-31270b548dd6';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name +  '.herokuapp.com/' + route;
  } else {        
    return 'http://localhost:5001/' + route;
  }
}

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRegister = async () => {
    const registrationData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      email: email,
    };
  
    try {
      const response = await fetch(buildPath('api/register'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });
      // const responseObject = JSON.parse(response);
     
    
  
      const result = await response.json();
    if (!response.ok) {
        console.error("Failed to register: " + response.statusText);
        let errorMessage = (JSON.stringify(result[0].msg)).replace(/['"]+/g, '')
        setError(errorMessage);
        return;
      }


      if (result.error) {
        setError("ERROR: " + result.body.message);
      } else {
        // Set user data in local storage
        const user = { firstName: result.firstName, lastName: result.lastName, id: result.id };
        localStorage.setItem('user_data', JSON.stringify(user));
  
        // Redirect to home page
        setError("");
        window.location.href = '/cards';
      }
    } catch (error) {
      // console.error("Error during registration:", error.message);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
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
                      <p className="mb-4">Please register an account</p>

                      {/* First Name input */}
                      <div className="mb-4">
                        <label htmlFor="firstName">First Name: </label>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={handleFirstNameChange}
                          placeholder="First Name"
                          className="w-full p-2 border border-neutral-300 rounded text-black"
                        />
                      </div>

                      {/* Last Name input */}
                      <div className="mb-4">
                        <label htmlFor="lastName">Last Name: </label>
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={handleLastNameChange}
                          placeholder="Last Name"
                          className="w-full p-2 border border-neutral-300 rounded text-black"
                        />
                      </div>

                      {/* Username input */}
                      <div className="mb-4">
                        <label htmlFor="username">Username: </label>
                        <input
                          type="text"
                          id="username"
                          value={username}
                          onChange={handleUsernameChange}
                          placeholder="Username"
                          className="w-full p-2 border border-neutral-300 rounded text-black"
                        />
                      </div>

                      {/* Password input */}
                      <div className="mb-4">
                        <label htmlFor="password">Password: </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={handlePasswordChange}
                          placeholder="Password"
                          className="w-full p-2 border border-neutral-300 rounded text-black"
                        />
                      </div>

                      {/* Email input */}
                      <div className="mb-4">
                        <label htmlFor="email">Email: </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={handleEmailChange}
                          placeholder="Email"
                          className="w-full p-2 border border-neutral-300 rounded text-black"
                        />
                      </div>

                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="button"
                          style={{
                            background:
                              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                          }}
                          onClick={handleRegister}
                        >
                          Sign up
                        </button>
                      </div>

                      {/* Error message */}
                      {error && <p className="text-red-500">{error}</p>}

                      {/* Terms and conditions link */}
                      <Link to="/terms" className="text-blue-500">
                        Terms and conditions
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;

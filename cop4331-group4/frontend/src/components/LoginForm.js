"use client";
import React, { useState } from "react";
import { Label } from "./ui/label.tsx";
import { Input } from "./ui/input.tsx";
import { cn } from "./utils/cn";
import logo from '../imgs/LOGOHorizontal.png';
const app_name = 'cop4331-group4-31270b548dd6';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name +  '.herokuapp.com/' + route;
  } else {        
    return 'http://localhost:5001/' + route;
  }
}
function LoginForm({ onButtonClick }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

  
    const handleLogin = async (e) => {
        e.preventDefault();
        const loginData = {
        username: username,
        password: password,
        
      };
    
      try {
        const response = await fetch(buildPath('api/login'), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
        // const responseObject = JSON.parse(response);
       
      
    
        const result = await response.json();
      if (!response.ok) {
          console.error("Failed to login: " + result.error);
          let errorMessage = (result.error)
          setError(errorMessage);
          return;
        }
  
  
        if (result.error) {
          setError("ERROR: " + result.body.message);
        } else {
          // Set user data in local storage
          const user = { token: result.token };
          localStorage.setItem('user_data', JSON.stringify(user));
          localStorage.setItem('userPassword', JSON.stringify({pw:password}))
    
          // Redirect to home page
          setError("");
          window.location.href = '/map';
        }
      } catch (error) {
        // console.error("Error during registration:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    };
  return (
    <div className="max-w-md w-full my-auto mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
      <img 
            src={logo} 
            className='w-[70%] ml-12 h-auto'
            
            />
            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      <h2 className="font-bold text-xl text-neutral-200">
        Welcome to All Knights Study
      </h2>
      <p className="text-sm max-w-sm mt-2 text-neutral-300">
        Login or Register below!

      </p>

      <form className="my-8" >
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input 
            id="username" 
            value={username}
            onChange={handleUsernameChange} 
            placeholder="Username" 
            type="username" 
          />
        </LabelInputContainer>
        
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            type="password"
          />
        </LabelInputContainer>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={handleLogin}
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
                
            <button
            className="bg-gradient-to-br relative from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={onButtonClick}
            >
            Register &rarr;
            <BottomGradient />
            </button>
           <div className="flex flex-col space-y-4 text-xs text-neutral-500">
            <a href="/ForgotPassword">
              <p>Forgot Password?</p>
            </a>
          </div>
        </div>
       
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default LoginForm;
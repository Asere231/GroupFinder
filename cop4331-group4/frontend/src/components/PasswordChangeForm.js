"use client";
import React, { useState } from "react";
import { Label } from "./ui/label.tsx";
import { Input } from "./ui/input.tsx";
import { cn } from "./utils/cn";
import { jwtDecode } from "jwt-decode";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const app_name = 'cop4331-group4-31270b548dd6';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name +  '.herokuapp.com/' + route;
  } else {        
    return 'http://localhost:5001/' + route;
  }
}
function PasswordChangeForm({ onButtonClick }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const validationSchema = Yup.object({
      password: Yup.string()
        .min(5, 'Password must be atleast 5 characters long')
        .max(32,'Password must be less than 32 characters long')
        .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, 'Password must contain atleast one special character')
        .required('A password is required'),
    });

    const formik = useFormik({
      initialValues: {
          password: '',
      },
      validationSchema,
      validateOnChange: true,
      validateOnBlur: true,
  });
  const validateFormAndChangePasssword= async () => {
    const isValid = await formik.validateForm();
    
    if (isValid) {
        const userData = {
             password: formik.values.password,
        };
        handlePasswordChange(userData);
    }
  };
  
    const handlePasswordChange = async (ud) => {
    const data = localStorage.getItem('user_data');
    const userSaved = localStorage.getItem('savedName');
    console.log(ud.password);
    console.log(userSaved);
    const registrationData = {
        username: userSaved,
        password: ud.password,
    };
    
      try {
        const response = await fetch(buildPath('api/change-password'), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        });
        // const responseObject = JSON.parse(response);
       
      
    
        const result = await response.json();
      if (!response.ok) {
          console.error("Failed to change: " + result.error);
          let errorMessage = (result.error)
          setError(errorMessage);
          return;
        }
  
  
        if (result.error) {
          setError("ERROR: " + result.body.message);
          console.error("Failed to change: " + result.error);
        } else {
            console.error("successful change: " + result.error);
          // Redirect to home page
          setError("");
          window.location.href = '/';
        }
      } catch (error) {
        // console.error("Error during registration:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    };

    const handleBackClick = () => {
        window.location.href = "/";
    }

  return (
    <div className="max-w-md w-full my-auto mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-200">
        Welcome to Group Finder
      </h2>
      <p className="text-sm max-w-sm mt-2 text-neutral-300">
        Enter your information below to create your account!
      </p>

      <form className="my-8" >
        
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">
            <div className="flex ">
              Password 
            <div className="text-xs ml-12">
              (5 char min. + 1 special character)
            </div>
          </div>
          </Label>
          <textarea 
            className="bg-darkgrey text-neutral-300 resize-none w-full h-10 mt-2 px-3 py-2 rounded focus:outline-yellow-500 focus:border-yellow-500 overflow-y-auto"
            {...formik.getFieldProps('password')}
            id="password" 
            placeholder="Password" 
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 mt-1">{formik.errors.password}</p>
          ) : null}
        </LabelInputContainer>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={validateFormAndChangePasssword}
        >
          Log in &rarr;
          <BottomGradient />
        </button>
        
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="flex flex-col space-y-4">
                
            <button
            className="bg-gradient-to-br relative from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={handleBackClick}
            >
            &larr;
            Back to Login
            <BottomGradient />
            </button>
        
        </div>
      
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

export default PasswordChangeForm;
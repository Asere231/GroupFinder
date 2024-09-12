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
function SignupForm({ onButtonClick }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const validationSchema = Yup.object({
      firstName: Yup.string()
        .min(2, 'First name must be atleast 2 characters long')
        .required('A First name is required'),
      lastName: Yup.string()
        .min(2, 'Last name must be atleast 2 characters long')
        .required('A Last name is required'),
      password: Yup.string()
        .min(5, 'Password must be atleast 5 characters long')
        .max(32,'Password must be less than 32 characters long')
        .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, 'Password must contain atleast one special character')
        .required('A password is required'),
      username: Yup.string()
        .min(5, 'Username must be atleast 5 characters long')
        .max(32,'Username must be less than 32 characters long')
        .required('A username is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    });

    const formik = useFormik({
      initialValues: {
          title: '',
          tag: '',
          postBody: '',
      },
      validationSchema,
      validateOnChange: true,
      validateOnBlur: true,
  });
  const validateFormAndRegisterUser= async () => {
    const isValid = await formik.validateForm();
    
    if (isValid) {
        const userData = {
             firstName: formik.values.firstName,
             lastName: formik.values.lastName,
             password: formik.values.password,
             username: formik.values.username,
             email: formik.values.email,
        };
        handleRegister(userData);
    }
  };
  
    const handleRegister = async (ud) => {
      
      const registrationData = {
        firstName: ud.firstName,
        lastName: ud.lastName,
        username: ud.username,
        password: ud.password,
        email: ud.email,
      };
    
      try {
        const response = await fetch(buildPath('api/register'), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ud),
        });
        // const responseObject = JSON.parse(response);
       
      
    
        const result = await response.json();
      if (!response.ok) {
          console.error("Failed to register: " + result.error);
          let errorMessage = (result.error)
          setError(errorMessage);
          return;
        }
  
  
        if (result.error) {
          setError("ERROR: " + result.body.message);
        } else {
          // Set user data in local storage
          console.log(result.token);
          const user = { token: result.token };
          localStorage.setItem('user_data', JSON.stringify(user));
    
          // Redirect to home page
          setError("");
          window.location.href = '/verify';
        }
      } catch (error) {
        // console.error("Error during registration:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    };
  return (
    <div className="max-w-md w-full my-auto mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Group Finder
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Enter your information below to create your account!
      </p>

      <form className="my-8" >
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First Name</Label>
            <textarea 
              className="bg-darkgrey resize-none w-full h-10 mt-2 px-3 py-2 rounded focus:outline-yellow-500 focus:border-yellow-500 overflow-y-auto"
              {...formik.getFieldProps('firstName')}
              id="firstName" 
              placeholder="First" 
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <p className="text-red-500 mt-1">{formik.errors.firstName}</p>
            ) : null}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last Name</Label>
            <textarea 
              className="bg-darkgrey resize-none w-full h-10 mt-2 px-3 py-2 rounded focus:outline-yellow-500 focus:border-yellow-500 overflow-y-auto"
              {...formik.getFieldProps('lastName')}
              id="lastName" 
              placeholder="Last" 
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <p className="text-red-500 mt-1">{formik.errors.lastName}</p>
            ) : null}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <textarea 
              className="bg-darkgrey resize-none w-full h-10 mt-2 px-3 py-2 rounded focus:outline-yellow-500 focus:border-yellow-500 overflow-y-auto"
              {...formik.getFieldProps('email')}
              id="email" 
              placeholder="mail@mail.com" 
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 mt-1">{formik.errors.email}</p>
            ) : null}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">  <div className="flex ">
              Username 
            <div className="text-xs ml-11">
              (5 char min.)
            </div>
          </div></Label>
          <textarea 
              className="bg-darkgrey resize-none w-full h-10 mt-2 px-3 py-2 rounded focus:outline-yellow-500 focus:border-yellow-500 overflow-y-auto"
              {...formik.getFieldProps('username')}
              id="username" 
              placeholder="Username" 
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-500 mt-1">{formik.errors.username}</p>
            ) : null}
        </LabelInputContainer>
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
            className="bg-darkgrey resize-none w-full h-10 mt-2 px-3 py-2 rounded focus:outline-yellow-500 focus:border-yellow-500 overflow-y-auto"
            {...formik.getFieldProps('password')}
            id="password" 
            placeholder="Password" 
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 mt-1">{formik.errors.password}</p>
          ) : null}
        </LabelInputContainer>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={validateFormAndRegisterUser}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="flex flex-col space-y-4">
                
            <button
            className="bg-gradient-to-br relative from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={onButtonClick}
            >
            &larr;
            Back to Login
            <BottomGradient />
            </button>
        
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

export default SignupForm;
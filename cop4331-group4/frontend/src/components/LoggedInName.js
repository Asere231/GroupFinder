import React, { useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import { jwtDecode } from "jwt-decode"
import { Label } from "./ui/label.tsx";
import { useFormik } from 'formik';
import * as Yup from 'yup';

function LoggedInName()
{
    const [showUser, setShowUser] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const data = localStorage.getItem('user_data');
    const pass = localStorage.getItem('userPassword')
    let userPass = JSON.parse(pass).pw;
    let userToken = JSON.parse(data).token;
    const decoded = jwtDecode(userToken);
    
    var firstName = decoded.firstName;

    const validationSchema = Yup.object({
      firstName: Yup.string()
        .min(2, 'First name must be atleast 2 characters long')
        .required('A First name is required'),
      lastName: Yup.string()
        .min(2, 'First name must be atleast 2 characters long')
        .required('A Last name is required'),
      password: Yup.string()
        .min(2, 'Password must be atleast 5 characters long')
        .max(32,'Password must be less than 32 characters long')
        .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, 'Password must contain atleast one special character')
        .required('A password is required'),
    });

    const formik = useFormik({
      initialValues: {
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          password: userPass,
      },
      validationSchema,
      validateOnChange: true,
      validateOnBlur: true,
  });

    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };    

    const handleEvent = event => 
    {
	    event.preventDefault();

        console.log("Pass: " + pass);

    }; 
  return(
    <div className="absolute top-0 right-0 p-4">
      <div className="flex">
        <div className="p-1">
          <div className="space-x-2">
            {/* <!-- Button trigger vertically centered modal--> */}
            <TERipple rippleColor="white">
            <button
              type="button"
              className="inline-block rounded bg-metgold px-6 pb-2 pt-2.5 text-s font-bold uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#8C7A2F] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#8C7A2F] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#7B6929] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={() => setShowUser(true)}
            >
              {decoded.username}
            </button>

            </TERipple>
          </div>

          {/* <!--Verically centered modal--> */}
          <TEModal
            show={showUser}
            setShow={setShowUser}
          >
            <TEModalDialog centered size="md">
              <TEModalContent>
                <TEModalHeader>
                  {/* <!--Modal title--> */}
                  <h5 className="text-xl font-medium leading-normal text-neutral-200">
                    Modal title
                  </h5>
                  {/* <!--Close button--> */}
                  <button
                    type="button"
                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    onClick={() => setShowUser(false)}
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </TEModalHeader>
                {/* <!--Modal body--> */}
                <TEModalBody>
                    <div className="flex w-auto">  
                        <Label htmlFor="title" className="text-md mt-2 pt-1 font-semibold w-1/3">First Name:</Label>
                    
                        <textarea 
                        className="dark:bg-gray-200 resize-none w-full h-10 mt-2 px-3 py-2 rounded focus:outline-yellow-500 focus:border-yellow-500 overflow-y-auto"
                        {...formik.getFieldProps('firstName')}
                        id="firstName" 
                        placeholder="First Name" 
                        />
                          {formik.touched.firstName && formik.errors.firstName ? (
                            <p className="text-red-500">{formik.errors.firstName}</p>
                          ) : null}
                    </div>
                    <div className="flex w-auto">  
                        <Label htmlFor="title" className="text-md mt-2 pt-1 font-semibold w-1/3">First Name:</Label>
                    
                        <textarea 
                        className="dark:bg-gray-200 resize-none w-full h-10 mt-2 px-3 py-2 rounded focus:outline-yellow-500 focus:border-yellow-500 overflow-y-auto"
                        {...formik.getFieldProps('lastName')}
                        id="lastName" 
                        placeholder="Last Name" 
                        />
                          {formik.touched.lastName && formik.errors.lastName ? (
                            <p className="text-red-500">{formik.errors.lastName}</p>
                          ) : null}
                    </div>
                    <div className="flex w-auto">  
                        <Label htmlFor="title" className="text-md mt-2 pt-1 font-semibold w-1/3">First Name:</Label>
                    
                        <textarea 
                        className="dark:bg-gray-200 resize-none w-full h-10 mt-2 px-3 py-2 rounded focus:outline-yellow-500 focus:border-yellow-500 overflow-y-auto"
                        {...formik.getFieldProps('password')}
                        id="password" 
                        placeholder="Password" 
                        />
                          {formik.touched.password && formik.errors.password ? (
                            <p className="text-red-500">{formik.errors.password}</p>
                          ) : null}
                    </div>
                </TEModalBody>
                <TEModalFooter>
                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                      onClick={() => setShowUser(false)}
                    >
                      Close
                    </button>
                  </TERipple>
                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      onClick={handleEvent}
                    >
                      Save changes
                    </button>
                  </TERipple>
                </TEModalFooter>
              </TEModalContent>
            </TEModalDialog>
          </TEModal>
        </div>
        <div className="p-1">
          <div className="space-x-2">
            {/* <!-- Button trigger vertically centered modal--> */}
            <TERipple rippleColor="white">
            <button
              type="button"
              className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-s font-bold uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={() => setShowLogout(true)}
            >
              LOGOUT
            </button>

            </TERipple>
          </div>

          {/* <!--Verically centered modal--> */}
          <TEModal
            show={showLogout}
            setShow={setShowLogout}
          >
            <TEModalDialog centered>
              <TEModalContent>
                <TEModalHeader>
                  {/* <!--Modal title--> */}
                  <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                    Modal title
                  </h5>
                  {/* <!--Close button--> */}
                  <button
                    type="button"
                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    onClick={() => setShowLogout(false)}
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </TEModalHeader>
                {/* <!--Modal body--> */}
                <TEModalBody>
                  <p>This is a vertically centered modal.</p>
                </TEModalBody>
                <TEModalFooter>
                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                      onClick={() => setShowLogout(false)}
                    >
                      Close
                    </button>
                  </TERipple>
                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 ml-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      onClick={doLogout}
                      >
                      LOGOUT
                    </button>
                  </TERipple>
                </TEModalFooter>
              </TEModalContent>
            </TEModalDialog>
          </TEModal>
        </div>
      </div>
  </div>  

  );

};

export default LoggedInName;

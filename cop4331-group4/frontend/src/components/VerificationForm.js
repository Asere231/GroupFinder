"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input.tsx";
import { cn } from "./utils/cn";
import { jwtDecode } from "jwt-decode"


const app_name = 'cop4331-group4-31270b548dd6';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name +  '.herokuapp.com/' + route;
  } else {        
    return 'http://localhost:5001/' + route;
  }
}

async function verify(vCode){
    const data = localStorage.getItem('user_data');
    let userToken = JSON.parse(data).token;
    const decoded = jwtDecode(userToken);
    console.log(decoded);
    if(vCode === decoded.verificationCode){
        console.log("HERE");
        try {
            const response = await fetch(buildPath('api/verify-email'), {
              method: "POST",
              headers: {
                "Authorization": userToken,
                "Content-Type": "application/json",
              }
            });

            const result = await response.json();
            if (!response.ok) {
              console.error("Failed to verify: " + result.error);
              return;
            }
            if (result.error) {
              console.error("ERROR: " + result.body.message);
            } else {
                console.log("verified")
              window.location.href = '/map';
            }
          } catch (error) {
            console.error("An unexpected error occurred. Please try again.");
          }
    } else {
        try {
            const userData = {
                userId: decoded.userId,
            };
            const response = await fetch(buildPath('api/delete-user'), {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });

            const result = await response.json();
            if (!response.ok) {
              console.error("Failed to verify: " + result.error);
              return;
            }
            if (result.error) {
              console.error("ERROR: " + result.body.message);
            } else {

              console.log("Successful deletion");
              window.location.href = '/';
            }
          } catch (error) {
            console.error("An unexpected error occurred. Please try again.");
          }
    }
}

function VerificationForm() {
    const [code, setCode] = useState("");
    const inputRefs = useRef([]);

    useEffect(() => {
        // Focus the first input when the component mounts
        inputRefs.current[0]?.focus();
      }, []);

    const handleInput = (index, event) => {
        const value = event.target.value;
        const nextIndex = index + 1;
        const prevIndex = index - 1;

        setCode((prevCode) => {
            // Copy the existing code string
            let newCode = prevCode.slice();
      
            // Update the character at the current index
            newCode = newCode.substring(0, index) + value + newCode.substring(index + 1);
      
            return newCode;
          });

        if (value && nextIndex < inputRefs.current.length) {
            // Focus on the next input if there is a value and it's not the last input
            inputRefs.current[nextIndex].focus();
        }

        if (!value && prevIndex >= 0) {
            // Focus on the previous input if value is deleted and it's not the first input
            inputRefs.current[prevIndex].focus();
        }
        
        if (code.length === 7 && value) {
            let newCode = code.toString();
            newCode += value;
            console.log(newCode.toString()); // Print to console
            verify(newCode.toString());
          }
    };
    
  return (
    <div className="max-w-md w-full my-auto mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Verify your Email
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 p-2 dark:text-neutral-300">
        Check your email and enter the 8 digit code here.
      </p>
        
    <form class="max-w-sm mx-auto">
        <div class="flex mb-2 space-x-2 rtl:space-x-reverse">
        {[...Array(8)].map((_, index) => (
            <div key={index}>
              <label htmlFor={`code-${index + 1}`} className="sr-only">
                {`Code ${index + 1}`}
              </label>
              <Input
                type="text"
                maxLength="1"
                data-focus-input-init
                data-focus-input-prev={index > 0 ? `code-${index}` : null}
                data-focus-input-next={
                  index < 7 ? `code-${index + 2}` : null
                }
                id={`code-${index + 1}`}
                className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(event) => handleInput(index, event)}
              />
            </div>
          ))}
        </div>
        <p id="helper-text-explanation" class="mt-2 text-sm p-1 text-gray-500 dark:text-gray-400">If unable to find the email, please check your spam folder</p>
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

export default VerificationForm;
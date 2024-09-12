import React, {useState} from 'react';
import SearchBar from '../components/SearchBar';
import logo from '../imgs/LOGOHorizontal.png';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
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


const app_name = 'cop4331-group4-31270b548dd6';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name +  '.herokuapp.com/' + route;
  } else {        
    return 'http://localhost:5001/' + route;
  }
}

function PageTitle(){
   const [showUser, setShowUser] = useState(false);
   const [showLogout, setShowLogout] = useState(false);
   const [openNav, setOpenNav] = React.useState(false);
   const data = localStorage.getItem('user_data');
   const pass = localStorage.getItem('userPassword')
   let userPass = JSON.parse(pass).pw;
   let userToken = JSON.parse(data).token;
   const decoded = jwtDecode(userToken);
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
   
   React.useEffect(() => {
      window.addEventListener(
         "resize",
         () => window.innerWidth >= 960 && setOpenNav(false),
      );
   }, []);

   const handleLogoClick = () => {
      window.location.href = "/map";
  }
  const navList = (
   <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
     <Typography
       as="li"
       variant="small"
       color="blue-gray"
       className="flex items-center gap-x-2 p-1 font-medium"
     >
        <div className="flex cursor-pointer hover:bg-white hover:bg-opacity-20 pl-1 hover:duration-500 hover:rounded-xl items-center">
         <a href="/map" className="flex items-center">
            <svg
               width="16"
               height="15"
               viewBox="0 0 16 15"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >

               <path
               d="M5 0.5C4.73478 0.5 4.48043 0.605357 4.29289 0.792893C4.10536 0.98043 4 1.23478 4 1.5C4 1.76522 4.10536 2.01957 4.29289 2.20711C4.48043 2.39464 4.73478 2.5 5 2.5H11C11.2652 2.5 11.5196 2.39464 11.7071 2.20711C11.8946 2.01957 12 1.76522 12 1.5C12 1.23478 11.8946 0.98043 11.7071 0.792893C11.5196 0.605357 11.2652 0.5 11 0.5H5ZM2 4.5C2 4.23478 2.10536 3.98043 2.29289 3.79289C2.48043 3.60536 2.73478 3.5 3 3.5H13C13.2652 3.5 13.5196 3.60536 13.7071 3.79289C13.8946 3.98043 14 4.23478 14 4.5C14 4.76522 13.8946 5.01957 13.7071 5.20711C13.5196 5.39464 13.2652 5.5 13 5.5H3C2.73478 5.5 2.48043 5.39464 2.29289 5.20711C2.10536 5.01957 2 4.76522 2 4.5ZM0 8.5C0 7.96957 0.210714 7.46086 0.585786 7.08579C0.960859 6.71071 1.46957 6.5 2 6.5H14C14.5304 6.5 15.0391 6.71071 15.4142 7.08579C15.7893 7.46086 16 7.96957 16 8.5V12.5C16 13.0304 15.7893 13.5391 15.4142 13.9142C15.0391 14.2893 14.5304 14.5 14 14.5H2C1.46957 14.5 0.960859 14.2893 0.585786 13.9142C0.210714 13.5391 0 13.0304 0 12.5V8.5Z"
               fill="#90A4AE"
               />
            </svg>

            <div className='ml-1 p-1'>       
               Maps
            </div>

         </a>
         </div>
     </Typography>

     <Typography
       as="li"
       variant="small"
       color="blue-gray"
       className="flex items-center gap-x-2 p-1 font-medium"
     >
      <div className="flex cursor-pointer hover:bg-white hover:bg-opacity-20 pl-1 hover:duration-500 hover:rounded-xl items-center">
         <a href="/forum" className="flex items-center">
         
            <svg
               width="14"
               height="15"
               viewBox="0 0 14 15"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >

               <path
               d="M2 0.5C1.46957 0.5 0.960859 0.710714 0.585786 1.08579C0.210714 1.46086 0 1.96957 0 2.5V4.5C0 5.03043 0.210714 5.53914 0.585786 5.91421C0.960859 6.28929 1.46957 6.5 2 6.5H4C4.53043 6.5 5.03914 6.28929 5.41421 5.91421C5.78929 5.53914 6 5.03043 6 4.5V2.5C6 1.96957 5.78929 1.46086 5.41421 1.08579C5.03914 0.710714 4.53043 0.5 4 0.5H2ZM2 8.5C1.46957 8.5 0.960859 8.71071 0.585786 9.08579C0.210714 9.46086 0 9.96957 0 10.5V12.5C0 13.0304 0.210714 13.5391 0.585786 13.9142C0.960859 14.2893 1.46957 14.5 2 14.5H4C4.53043 14.5 5.03914 14.2893 5.41421 13.9142C5.78929 13.5391 6 13.0304 6 12.5V10.5C6 9.96957 5.78929 9.46086 5.41421 9.08579C5.03914 8.71071 4.53043 8.5 4 8.5H2ZM8 2.5C8 1.96957 8.21071 1.46086 8.58579 1.08579C8.96086 0.710714 9.46957 0.5 10 0.5H12C12.5304 0.5 13.0391 0.710714 13.4142 1.08579C13.7893 1.46086 14 1.96957 14 2.5V4.5C14 5.03043 13.7893 5.53914 13.4142 5.91421C13.0391 6.28929 12.5304 6.5 12 6.5H10C9.46957 6.5 8.96086 6.28929 8.58579 5.91421C8.21071 5.53914 8 5.03043 8 4.5V2.5ZM8 10.5C8 9.96957 8.21071 9.46086 8.58579 9.08579C8.96086 8.71071 9.46957 8.5 10 8.5H12C12.5304 8.5 13.0391 8.71071 13.4142 9.08579C13.7893 9.46086 14 9.96957 14 10.5V12.5C14 13.0304 13.7893 13.5391 13.4142 13.9142C13.0391 14.2893 12.5304 14.5 12 14.5H10C9.46957 14.5 8.96086 14.2893 8.58579 13.9142C8.21071 13.5391 8 13.0304 8 12.5V10.5Z"
               fill="#90A4AE"
               />

            </svg>

            <div className='ml-1 p-1'>       
               Forum
            </div>
         </a>
         </div>
     </Typography>

     <Typography
       as="li"
       variant="small"
       color="blue-gray"
       className="flex items-center gap-x-2 p-1 font-medium"
     >
      <div  onClick={() => setShowUser(true)} className="flex cursor-pointer hover:bg-white hover:bg-opacity-20 pl-1 hover:duration-500 hover:rounded-xl items-center">
       <svg
         width="16"
         height="17"
         viewBox="0 0 16 17"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
       >
         <path
           fill-rule="evenodd"
           clip-rule="evenodd"
           d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
           fill="#90A4AE"
         />
       </svg>
         <div className='ml-1 p-1'>
            Account
         </div>
       </div>
     </Typography>
     
     <Typography
      as="li"
      variant="small"
      color="red"
      className="flex items-center gap-x-2 p-1 font-medium"
   >
      <div onClick={() => setShowLogout(true)} className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-20 pl-1 hover:duration-500 hover:rounded-xl ">
         <svg
         width="20"
         height="20"
         viewBox="5 5 21 21"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         >
         <path
            d="M14 13H4v-2h10V6l4 4-4 4zM4 18h16v2H4v-2z"
            fill="#CC0202
            "
         />
         </svg>
      
         <div className='ml-1 p-1'>
            Log Out
         </div>
      </div>
   </Typography>

   </ul>
 );
 const validateFormAndEditUser= async () => {
   const isValid = await formik.validateForm();
   
   if (isValid) {
       const userData = {
            firstName: formik.values.firstName,
            lastName: formik.values.lastName,
            password: formik.values.password,
       };
       EditUser(userData);
   }
 };
 const EditUser = async (uData) => {
   let data = localStorage.getItem('user_data');
   let userToken = JSON.parse(data).token;
   const decoded = jwtDecode(userToken);
   const userInfo = {
       firstName: uData.firstName,
       lastName: uData.lastName,
       password: uData.password,
   };
   
   try {
       const response = await fetch(buildPath('api/user-edit'), {
           method: "PATCH",
           headers: {
               "Content-Type": "application/json",
               "Authorization": userToken,
           },
           body: JSON.stringify(userInfo),
       });
   
       const result = await response.json();
       
       if (!response.ok) {
           console.error("Failed to edit: " + result.error);
           let errorMessage = (result.error)
           console.log(errorMessage);
           return;
       }
   

       if (result.error) {
           let errorMessage = (result.error)
           console.log(errorMessage);
       } else {
           // Set user data in local storage
           console.log("Successfully edited");
           window.location.reload();
           // Redirect to home page
       }
       
   } catch (error) {
       console.error("Error during posting:", error.message);
       // setError("An unexpected error occurred. Please try again.");
   }
};
   return(
      <div>
      <Navbar className="sticky top-0 z-10 h-max max-w-full mx-auto w-full bg-darkgrey bg-opacity-100 border-none rounded-none">
      <div className=" mx-auto flex flex-wrap items-center justify-between text-white">
         <div>
            <img 
            src={logo} 
            className='w-32 h-auto ml-2 pl-2 mt-[-10px] cursor-pointer'
            onClick={handleLogoClick}
            />
         </div>
         <div className="hidden items-center gap-x-2 lg:flex">
          <div className="!flex w-full gap-2 mr-64">
          
            <SearchBar />
          </div>
        </div>
        <div className="hidden lg:block">{navList}</div>
      </div>
    </Navbar>
       <TEModal
            show={showLogout}
            setShow={setShowLogout}
            
          >
            <TEModalDialog centered>
              <TEModalContent>
                <TEModalHeader>
                  {/* <!--Modal title--> */}
                  <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                    Leaving So Soon?
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
                  <p className='text-white'>Are you sure you want to log out?</p>
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
          <TEModal
            show={showUser}
            setShow={setShowUser}
          >
            <TEModalDialog centered size="sm">
              <TEModalContent>
                <TEModalHeader>
                  {/* <!--Modal title--> */}
                  <h5 className="text-xl font-medium leading-normal text-neutral-200">
                    Account Settings
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
                  <div className="flex w-auto flex-col">  
                     <Label htmlFor="firstName" className="text-md mt-2 pt-1 font-semibold">First Name:</Label>
                     <div className="flex flex-col w-full">
                           <textarea 
                              className="dark:bg-gray-200 resize-none w-full h-10 mt-2 px-3 py-2 rounded focus:outline-yellow-500 focus:border-yellow-500 overflow-y-auto"
                              {...formik.getFieldProps('firstName')}
                              id="firstName" 
                              placeholder="First Name" 
                           />
                           {formik.touched.firstName && formik.errors.firstName ? (
                              <p className="text-red-500 mt-1">{formik.errors.firstName}</p>
                           ) : null}
                     </div>
                  </div>
                  <div className="flex w-auto flex-col">  
                     <Label htmlFor="lastName" className="text-md mt-2 pt-1 font-semibold">Last Name:</Label>
                     <div className="flex flex-col w-full">
                           <textarea 
                              className="dark:bg-gray-200 resize-none w-full h-10 mt-2 px-3 py-2 rounded focus:outline-yellow-500 focus:border-yellow-500 overflow-y-auto"
                              {...formik.getFieldProps('lastName')}
                              id="lastName" 
                              placeholder="Last Name" 
                           />
                           {formik.touched.lastName && formik.errors.lastName ? (
                              <p className="text-red-500 mt-1">{formik.errors.lastName}</p>
                           ) : null}
                     </div>
                  </div>
                  <div className="flex w-auto flex-col">  
                     <Label htmlFor="password" className="text-md mt-2 pt-1 font-semibold">Password:</Label>
                     <div className="flex flex-col w-full">
                           <textarea 
                              className="dark:bg-gray-200 resize-none w-full h-10 mt-2 px-3 py-2 rounded focus:outline-yellow-500 focus:border-yellow-500 overflow-y-auto"
                              {...formik.getFieldProps('password')}
                              id="password" 
                              placeholder="Password" 
                           />
                           {formik.touched.password && formik.errors.password ? (
                              <p className="text-red-500 mt-1">{formik.errors.password}</p>
                           ) : null}
                     </div>
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
                      onClick={validateFormAndEditUser}
                    >
                      Save changes
                    </button>
                  </TERipple>
                </TEModalFooter>
              </TEModalContent>
            </TEModalDialog>
          </TEModal>
    </div>
   );
};

export default PageTitle;

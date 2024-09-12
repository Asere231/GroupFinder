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
import { Label } from "./ui/label.tsx";
import { jwtDecode } from "jwt-decode";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdModeEditOutline } from "react-icons/md";

const app_name = 'cop4331-group4-31270b548dd6';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name +  '.herokuapp.com/' + route;
  } else {        
    return 'http://localhost:5001/' + route;
  }
}


function EditCommentButton(props){
    const { data } = props;
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState(data.title);
    const [tag, setTag] = useState(data.tag);
    const [postBody, setPostBody] = useState(data.postBody);
    const [error, setError] = useState("");
    
    const validationSchema = Yup.object({
      commentBody: Yup.string()
        .required('Title is required'),
    });

    const formik = useFormik({
      initialValues: {
          commentBody: data.commentBody,
      },
      validationSchema,
      validateOnChange: true,
      validateOnBlur: true,
  });

    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };

    const handleTagChange = (e) => {
      setTag(e.target.value);
    };
    const handlePostBodyChange = (e) => {
      setPostBody(e.target.value);
    };
  
    const validateFormAndEditComment = async () => {
      const isValid = await formik.validateForm();
      
      if (isValid) {
          const commentBody = {
            commentBody: formik.values.commentBody,
              
          };
          EditComment(commentBody);
      }
    };

    const EditComment = async (cData) => {
        const userData = localStorage.getItem('user_data');
        let userToken = JSON.parse(userData).token;
        const decoded = jwtDecode(userToken);
        const commentData = {
           commentId:data._id,
           commentBody:cData.commentBody,
        };
        console.log(data._id);
        try {
            const response = await fetch(buildPath('api/edit-comment'), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentData),
            });
        
            const result = await response.json();
            
            if (!response.ok) {
                console.error("Failed to edit comment: " + result.error);
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
  


  return (
    <div>
      
    <MdModeEditOutline className='m-1 cursor-pointer' size="17" color="white" onClick={() => setShowModal(true)}/>

      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog size="lg" centered>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Table Posting
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Cancel"
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
                
            <div className="w-full my-auto mx-auto rounded p-4">
                <form className="my-2" >
                    <div className="flex flex-col space-y-2 w-full mb-4">
                        <Label className="text-lg" htmlFor="commentBody">Edit your comment:</Label>

                        <textarea
                            className="bg-gray-200 text-lg resize-none w-full h-32 px-3 py-2 rounded focus:outline-yellow-500 focus:border-yellow-500 overflow-y-auto"
                            id="commentBody"
                            {...formik.getFieldProps('commentBody')}
                            placeholder="Your Post Here..."
                        />
                          
                    </div>
                    {formik.touched.commentBody && formik.errors.commentBody ? (
                            <p className="text-red-500">{formik.errors.commentBody}</p>
                          ) : null}
                    {error && <p className="text-red-500">{error}</p>}                
                </form>
            </div>

                
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <div className="inline-block rounded bg-red-300">
                <button
                  type="button"
                  className="inline-block rounded bg-red-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-red-600 focus:bg-red-300 focus:outline-none focus:ring-0 active:bg-red-300"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                </div>
              </TERipple>
              <TERipple rippleColor="light">
                <div className="inline-block rounded bg-green-500"></div>
                <button
                  type="button"
                  className="ml-1 inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#00FF00] transition duration-150 ease-in-out hover:bg-green-300 hover:shadow-[0_8px_9px_-4px_rgba(0,255,0,0.3),0_4px_18px_0_rgba(0,255,0,0.2)] focus:bg-green-800 focus:shadow-[0_8px_9px_-4px_rgba(0,255,0,0.3),0_4px_18px_0_rgba(0,255,0,0.2)] focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-[0_8px_9px_-4px_rgba(0,255,0,0.3),0_4px_18px_0_rgba(0,255,0,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(0,255,0,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(0,255,0,0.2),0_4px_18px_0_rgba(0,255,0,0.1)]"
                  onClick={validateFormAndEditComment}
                >
                  EDIT
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}
export default EditCommentButton;
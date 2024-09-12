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
import { jwtDecode } from "jwt-decode"
const app_name = 'cop4331-group4-31270b548dd6';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name +  '.herokuapp.com/' + route;
  } else {        
    return 'http://localhost:5001/' + route;
  }
}



function DeletePostButton(props) {
    const [showModal, setShowModal] = useState(false);

    const { data } = props;

    const handleDelete = async () => {   
      const deleteData = {
            postId: data,
      };
      try {
        const response = await fetch(buildPath('api/delete-post'), {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteData),
        });
          
        const result = await response.json();
        
        if (!response.ok) {
            console.error("Failed to delete: " + result.error);
            let errorMessage = (result.error)
            console.log(errorMessage);
            return;
        }
    

        if (result.error) {
            let errorMessage = (result.error)
            console.log(errorMessage);
        } else {
            // Set user data in local storage
            console.log("Successfully deleted");
            window.location.reload();
            // Redirect to home page
        }
      
      } catch (error) {
          console.error("Error during posting:", error.message);
          // setError("An unexpected error occurred. Please try again.");
      }
    }

    return (
        <div>
             <div>
      {/* <!-- Button trigger modal --> */}
     <TERipple rippleColor="light">
            <div className="inline-block rounded mt-1 ml-1 bg-red-300">
                <button
                    type="button"
                    className="inline-block rounded bg-red-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-red-600 focus:bg-red-300 focus:outline-none focus:ring-0 active:bg-red-300"
                    onClick={() => setShowModal(true)}
                >
                    Delete Post
                </button>
            </div>
        </TERipple>

      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog size="sm">
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Delete Post?
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
                
            <div className="w-full my-auto mx-auto rounded p-4 text-white md:p-8 ">
                Are you sure you want to delete this post?
            </div>

                
            </TEModalBody>
            <TEModalFooter>
              <div className="pr-2">
                <TERipple rippleColor="light">
                    <div className="inline-block rounded bg-green-500">
                        <button
                        type="button"
                        className="inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#00FF00] transition duration-150 ease-in-out hover:bg-green-300 hover:shadow-[0_8px_9px_-4px_rgba(0,255,0,0.3),0_4px_18px_0_rgba(0,255,0,0.2)] focus:bg-green-800 focus:shadow-[0_8px_9px_-4px_rgba(0,255,0,0.3),0_4px_18px_0_rgba(0,255,0,0.2)] focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-[0_8px_9px_-4px_rgba(0,255,0,0.3),0_4px_18px_0_rgba(0,255,0,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(0,255,0,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(0,255,0,0.2),0_4px_18px_0_rgba(0,255,0,0.1)]"
                        onClick={() => setShowModal(false)}
                        >
                        Close
                        </button>
                    </div>
                </TERipple>
              </div>

              <TERipple rippleColor="light">
                  <div className="inline-block rounded bg-red-300">
                      <button
                      type="button"
                      className="inline-block rounded bg-red-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-red-600 focus:bg-red-300 focus:outline-none focus:ring-0 active:bg-red-300"
                      onClick={handleDelete}
                      >
                      DELETE
                      </button>
                  </div>
              </TERipple>
             
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
            


            
        </div>
    )
}

export default DeletePostButton
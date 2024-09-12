import React, { useEffect, useState } from 'react';
import { Disclosure, Transition } from '@headlessui/react'
import AddPostButton from "./AddPostButton";
import DeletePostButton from './DeletePostButton';
import { jwtDecode } from "jwt-decode";
import EditPostButton from './EditPostButton';
import LikeDislikeButtons from './LikeDislikeButtons';
import ReplyButton from './ReplyButton';
import EditCommentButton from './EditCommentButton';
import DeleteCommentButton from './DeleteCommentButton';

const app_name = 'cop4331-group4-31270b548dd6';
function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name +  '.herokuapp.com/' + route;
  } else {        
    return 'http://localhost:5001/' + route;
  }
}

function isCurrentUserPost(postUser) {
    const data = localStorage.getItem('user_data');
    let userToken = JSON.parse(data).token;
    const decoded = jwtDecode(userToken);
    if(postUser === decoded.userId){
      return true;
    } else {
      return false;
    }
}


function ForumMain() {
  
    const [data, setData] = useState(null);
    const [comments, setComments] = useState(null); 
    const [openedPostIndex, setOpenedPostIndex] = useState(null); // Add this line

    
    async function getUsernameForComment(userId) {
      const postData = {
        userId: userId,
    };

      try {
           const response = await fetch(buildPath('api/find-user'), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });
          if (!response.ok) {
              throw new Error('Failed to fetch user data');
          }
          const userData = await response.json();
          return userData.username; // Assuming the username is stored in the 'username' field of the userData object
      } catch (error) {
          console.error('Error fetching user data:', error);
          return null;
      }
  }
    // MAKE THIS MAKE AN ARRAY of ARRAYS for the comments of each post
    // 1 - no comments
    // 2 - comment 1, comment 2
    
    async function getCommentsForPost(postId){
      try{
        let path = 'all-comments' + '?post=' + postId;
        const answer = await fetch(buildPath(path));
        if (!answer.ok) {
            throw new Error('Failed to fetch data');
        }
        const commentData = await answer.json();
          const commentsWithUsernames = await Promise.all(commentData.map(async (comment) => {
            const username = await getUsernameForComment(comment.user);
            return {
                ...comment,
                username
            };
          }));
        setComments(commentsWithUsernames);
      }catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    
    useEffect(() => {
    // Define a function to fetch the data
        const fetchData = async () => {
            try {
                const response = await fetch(buildPath("all-posts"));
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                const postWithUsernames = await Promise.all(responseData.map(async (post) => {
                  const username = await getUsernameForComment(post.user);
                  return {
                      ...post,
                      username
                  };
                }));
                setData(responseData.reverse());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
        
        // Cleanup function (optional)
        // This function will be called when the component unmounts or before the effect runs again
        return () => {
            // You can perform cleanup tasks here if needed
        };
    }, []);

    const handleMapClick = () => {
        window.location.href = "/cards";
    }
   const giveNames = async (userId) => {   
      const userData = {
            userId: userId,
      };
      try {
        const response = await fetch(buildPath('api/find-user'), {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        });
          
        const result = await response.json();
        
        if (!response.ok) {
            console.error("Failed to find: " + result.error);
            let errorMessage = (result.error)
            console.log(errorMessage);
            return;
        }
    

        if (result.error) {
            let errorMessage = (result.error)
            console.log(errorMessage);
        } else {
            // Set user data in local storage
            console.log("Successfully found");
            // Redirect to home page
        }
      
      } catch (error) {
          console.error("Error during find:", error.message);
          // setError("An unexpected error occurred. Please try again.");
      }
    }
    return (
      <div className='p-2'>
          <div className="bg-darkgrey h-auto rounded-2xl ">
          <div className="w-full px-4 pt-6 pb-6">
            <div className="mx-auto w-full max-w-xxl rounded-2xl p-2">
              {data?.length && [...Array(data.length)].map((_, index) => (
              <div key={index}>
                <label htmlFor={`post-${index + 1}`} className="sr-only">
                  {`Code ${index + 1}`}
                </label>
                <Disclosure>
                {({ open }) => (
                  <div>
                    <Disclosure.Button 
                      className="flex w-full justify-between rounded-lg mt-1 px-4 py-2 text-left text-sm font-medium text-black hover:bg-gold focus:outline-none focus-visible:ring focus-visible:ring-gold duration-100 bg-metgold"
                      onClick={() => {
                            if (openedPostIndex === index) {
                                setOpenedPostIndex(null); // Close the opened post
                            } else {
                                setOpenedPostIndex(index); // Open the clicked post
                                getCommentsForPost(data[index]._id); // Fetch comments for the clicked post
                            }
                        }}
                    >
                      <div className="flex justify-between">
                        <div className="text-left text-lg font-bold px-4">
                            {data[index].title}
                        </div>
                      </div>

                      <div className="flex text-right">
                        <div>
                          <LikeDislikeButtons data={data[index]}/>
                        </div>
                      </div>
                      
                    </Disclosure.Button>
                    <Transition
                        show={openedPostIndex === index}
                        enter="transition duration-200 ease-out"
                        enterFrom="opacity-0 max-h-0"
                        enterTo="opacity-100 max-h-1000"
                        leave="transition duration-100 ease-out"
                        leaveFrom="opacity-100 max-h-1000"
                        leaveTo="opacity-0 max-h-0"
                    >
                      <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-black">
                      <div className='flex'>
                        <div className="bg-white w-full rounded p-4">
                            <div className="text-lg font-semibold mb-2">
                                {data[index].postBody}
                            </div>
                            <div className="text-sm text-gray-600">
                                Tag: {data[index].tag}
                            </div>
                            <div className="text-sm text-gray-600">
                                By: {data[index].username}
                            </div>
                        </div>
                      </div>
                        {(data[index].comments).length === 0 &&
                          <div className="flex justify-between mt-1 items-center space-x-4">
                          <div>
                            <ReplyButton data={data[index]}/>
                          </div>
                          {isCurrentUserPost(data[index].user) && 
                            <div className="flex">
                              <EditPostButton data={data[index]} className="w-24 h-9" />
                              <DeletePostButton data={data[index]._id} className="w-24 h-9" />
                            </div>
                          }
                        </div>
                    
                     
                        }
                          <div className="flex justify-between mt-2">
                          
                         
                          {(data[index].comments).length > 0 &&
                          <Disclosure>
                              {({ open }) => (
                                <div>
                                  <div className='flex justify-between'>
                                    <Disclosure.Button 
                                    onClick={() => {
                                      if ((data[index].comments).length > 0) {
                                          getCommentsForPost(data[index]._id);
                                          }
                                      }}
                                    className="flex justify-between rounded-lg bg-white w-24 h-9 mt-1 text-left text-sm font-medium text-black hover:bg-gold focus:outline-none focus-visible:ring focus-visible:ring-gold duration-100">
                                      <div className="flex">
                                          <div className="text-left font-semibold py-2 px-2">
                                              {"Comments:"}
                                              
                                          </div>
                                          
                                      </div>
                                      
                                    </Disclosure.Button>
                                    <div className=' w-full mt-1 pt-1'>
                                        <ReplyButton data={data[index]}/>
                                    </div>
                                  </div>
                                  <Transition
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                    <Disclosure.Panel className="px-4 text-sm text-black">
                                    <div className=' rounded px-1 '> {/* Set a fixed width */}
                                      {comments && comments.length > 0 ? (
                                        Array.from({ length: comments.length }, (_, index) => (
                                            <div key={comments[index]._id} className='px-4'>
                                              
                                                <div className={`bg-gold rounded p-2 mt-2 
                                                        ${(comments[index].commentBody).length > 20 ? 'w-auto' : 'w-32'}`} // Adjust heights as needed
                                                    >
                                                    {/* <div className={`bg-gold rounded p-2 mt-2 w-auto`}> // Adjust heights as needed */}
                                                    
                                                  <div className="text-base font-semibold mb-1">
                                                      {comments[index].commentBody}
                                                  </div>
                                                  <div className="text-sm text-gray-600">
                                                      {"By: " + comments[index].username}
                                                  </div>
                                              </div>
                                              {isCurrentUserPost(comments[index].user) && 
                                                <div className='flex m-1 p-1'>
                                                  <EditCommentButton data={comments[index]}/>
                                                  <DeleteCommentButton data={comments[index]}/>
                                                </div>
                                              }
                                            </div>
                                            
                                              ))
                                        ) : (
                                          <div className='px-4'>
                                              No comments
                                          </div>
                                       )}  
                                      </div>
                                    </Disclosure.Panel>
                                  </Transition>
                                </div>
                              )}
                            </Disclosure>

                            
                            }
                        
                        {(data[index].comments).length > 0 &&
                          <div className='flex justify-end'>
                            {isCurrentUserPost(data[index].user) && <EditPostButton data={data[index]}/>}
                            {isCurrentUserPost(data[index].user) && <DeletePostButton data={data[index]._id}/>}
                          </div>
                        }
                         
                          
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>
              </div>
            ))}
            </div>
            
            
          </div>
          <div className = "fixed bottom-4 right-4 z-50">
            <AddPostButton />
          </div>
        </div>
        </div>
      );
}

export default ForumMain
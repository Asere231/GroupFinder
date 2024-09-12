import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { AiOutlineLike, AiFillDislike } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const app_name = 'cop4331-group4-31270b548dd6';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name +  '.herokuapp.com/' + route;
  } else {        
    return 'http://localhost:5001/' + route;
  }
}

function LikeDislikeButtons(props) {
    const {data} = props;
    const[likes, setLikes] = useState(data.likes);

    const PostLiked = async () => {
        const userData = localStorage.getItem('user_data');
        let userToken = JSON.parse(userData).token;
        const decoded = jwtDecode(userToken);
        const postData = {
            likes: likes+1,
            postId: data._id,
        };
        console.log(data._id);
        try {
            const response = await fetch(buildPath('api/edit-post'), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });
        
            const result = await response.json();
            
            if (!response.ok) {
                console.error("Failed to post: " + result.error);
                let errorMessage = (result.error)
                console.log(errorMessage);
                return;
            }
        
    
            if (result.error) {
                let errorMessage = (result.error)
                console.log(errorMessage);
            } else {
                // Set user data in local storage
                setLikes(likes+1);
                console.log("Successfully liked");
                
                // Redirect to home page
            }
            
        } catch (error) {
            console.error("Error during posting:", error.message);
            // setError("An unexpected error occurred. Please try again.");
        }
    };
    
    return (
        <div className="flex">
            <div className="mr-2">
                <AiOutlineLike color="black" size="25" onClick={PostLiked}/>
            </div>
            <div className='mt-1 text-md font-semibold'>
                {likes}
            </div>
        </div>
        
        )  
    }

export default LikeDislikeButtons
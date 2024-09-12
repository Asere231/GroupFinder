import React, { useEffect, useState } from 'react';

const app_name = 'cop4331-group4-31270b548dd6';
function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name +  '.herokuapp.com/' + route;
  } else {        
    return 'http://localhost:5001/' + route;
  }
}

async function findUser(userId){
    const searchData = {
        userId : userId,
    };
    try {
        const response = await fetch(buildPath('api/find-user'), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchData),
        });
        // const responseObject = JSON.parse(response);
       
      
    
        const result = await response.json();
      if (!response.ok) {
          console.error("Failed to find: " + result.error);
          return;
        }
  
  
        if (result.error) {
            console.log(result.error);
        } else {
            let fullName = result.firstName + ' ' + result.lastName;
            console.log(fullName);
            return fullName;
        }
      } catch (error) {
        console.error("An unexpected error occurred. Please try again.", error.message);
        // setError("An unexpected error occurred. Please try again.");
      }
};

function ForumUsernames(props) {
    const [fullName, setFullName] = useState(null);
    const { data } = props;
    useEffect(() => {
        const fetchData = async () => {
            const userFullName = await findUser(props.userId);
            if (userFullName !== null) {
                setFullName(userFullName);
            }
        };
        fetchData();
    }, [props.data]);


    return (
        <div>{data}</div>
    )
}

export default ForumUsernames;
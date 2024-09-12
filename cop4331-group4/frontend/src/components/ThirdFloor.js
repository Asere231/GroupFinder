
import React, {useState, useEffect} from 'react';
import thirdFloorImage from './thirdFloorMap.jpg';
import Tooltip from "@mui/material/Tooltip";
import Box from '@mui/material/Box';
import { jwtDecode } from "jwt-decode";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { FormControl, InputLabel, Input, Button} from '@mui/material';




const ThirdFloor = () => {
  const [User, setUser] = useState(null);
  const [UserID, setUserID] = useState(null);
  const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      let userTokenn = JSON.parse(userData).token;
      setUserToken(userTokenn)
      const decoded = jwtDecode(userTokenn);
      
      var User = decoded;
      console.log(userTokenn);
      var UserID = decoded.userId;
      console.log("UserID: " + UserID);
      setUserID(UserID);
      console.log(User.firstName);
    }
  }, []);

  const [errorMessage, setErrorMessage] = useState("");

  const app_name = 'cop4331-group4-31270b548dd6';
    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        } else {        
            return 'http://localhost:5001/' + route;
        }
    }
    

    const findTable = async () => {
        try {
          const response = await fetch(buildPath(`api/all-tables`), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch: ' + response.statusText);
          }
          
          const rawData = await response.text();
          const data = JSON.parse(rawData);
          setTableData(data);
        } catch (error) {
            
            //console.error('Error fetching data:', error);
            setTableData(null);
        }
      };

  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch(buildPath('api/all-tables'), {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch: ' + response.statusText);
        }

        const rawData = await response.json();
        setTableData(rawData);
      } catch (error) {
        console.error('Error fetching table data:', error);
        setTableData(null);
      }
    };

    fetchTableData();
  }, []);

  const handleJoinTable = async (tableNum) => {
    try {
      const response = await fetch(buildPath('api/add-user-to-table'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${userToken}`
        },
        body: JSON.stringify({ tableNum: tableNum })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      console.log("Successfully joined table:", tableNum);
    } catch (error) {
      console.error('Error joining table:', error);
    }
  };

  const handleLeaveTable = async (tableNum) => {
    try {
      const response = await fetch(buildPath('api/remove-user-from-table'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${userToken}`
        },
        body: JSON.stringify({ tableNum: tableNum })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      
      console.log("Successfully Left Table:", tableNum);
    } catch (error) {
      console.error('Error Leaving Table:', error);
    }
  };

  const table301 = tableData && tableData.find(table => table.tableNum === "301");
  const table302 = tableData && tableData.find(table => table.tableNum === "302");
  const table303 = tableData && tableData.find(table => table.tableNum === "303");
  const table304 = tableData && tableData.find(table => table.tableNum === "304");
  const table305 = tableData && tableData.find(table => table.tableNum === "305");
  const table306 = tableData && tableData.find(table => table.tableNum === "306");
  const table307 = tableData && tableData.find(table => table.tableNum === "307");
  const table308 = tableData && tableData.find(table => table.tableNum === "308");
  const table309 = tableData && tableData.find(table => table.tableNum === "309");
  const table310 = tableData && tableData.find(table => table.tableNum === "310");
  const table311 = tableData && tableData.find(table => table.tableNum === "311");
  const table312 = tableData && tableData.find(table => table.tableNum === "312");
  const table313 = tableData && tableData.find(table => table.tableNum === "313");
  const table314 = tableData && tableData.find(table => table.tableNum === "314");
  const table315 = tableData && tableData.find(table => table.tableNum === "315");
  const table316 = tableData && tableData.find(table => table.tableNum === "316");
  const table317 = tableData && tableData.find(table => table.tableNum === "317");
  const table318 = tableData && tableData.find(table => table.tableNum === "318");
  const table319 = tableData && tableData.find(table => table.tableNum === "319");
  const table320 = tableData && tableData.find(table => table.tableNum === "320");
  const table321 = tableData && tableData.find(table => table.tableNum === "321");
  const table322 = tableData && tableData.find(table => table.tableNum === "322");
  const table323 = tableData && tableData.find(table => table.tableNum === "323");
  const table324 = tableData && tableData.find(table => table.tableNum === "324");
  const table325 = tableData && tableData.find(table => table.tableNum === "325");
  const table326 = tableData && tableData.find(table => table.tableNum === "326");
  const table327 = tableData && tableData.find(table => table.tableNum === "327");
  const table328 = tableData && tableData.find(table => table.tableNum === "328");
  const table329 = tableData && tableData.find(table => table.tableNum === "329");
  const table330 = tableData && tableData.find(table => table.tableNum === "330");
  const table331 = tableData && tableData.find(table => table.tableNum === "331");
  const table332 = tableData && tableData.find(table => table.tableNum === "332");
  const table333 = tableData && tableData.find(table => table.tableNum === "333");
  const table334 = tableData && tableData.find(table => table.tableNum === "334");
  const table335 = tableData && tableData.find(table => table.tableNum === "335");
  const table336 = tableData && tableData.find(table => table.tableNum === "336");
  const table337 = tableData && tableData.find(table => table.tableNum === "337");
  const table338 = tableData && tableData.find(table => table.tableNum === "338");
  const table339 = tableData && tableData.find(table => table.tableNum === "339");
  const table340 = tableData && tableData.find(table => table.tableNum === "340");
  const table341 = tableData && tableData.find(table => table.tableNum === "341");
  const table342 = tableData && tableData.find(table => table.tableNum === "342");
  const table343 = tableData && tableData.find(table => table.tableNum === "343");
  const table344 = tableData && tableData.find(table => table.tableNum === "344");
  const table345 = tableData && tableData.find(table => table.tableNum === "345");
  const table346 = tableData && tableData.find(table => table.tableNum === "346");
  const table347 = tableData && tableData.find(table => table.tableNum === "347");
  const table348 = tableData && tableData.find(table => table.tableNum === "348");
  const table349 = tableData && tableData.find(table => table.tableNum === "349");
  const table350 = tableData && tableData.find(table => table.tableNum === "350");
  const table351 = tableData && tableData.find(table => table.tableNum === "351");
  const table352 = tableData && tableData.find(table => table.tableNum === "352");
  const table353 = tableData && tableData.find(table => table.tableNum === "353");
  const table354 = tableData && tableData.find(table => table.tableNum === "354");
  const table355 = tableData && tableData.find(table => table.tableNum === "355");
  const table356 = tableData && tableData.find(table => table.tableNum === "356");
  const table357 = tableData && tableData.find(table => table.tableNum === "357");
  const table358 = tableData && tableData.find(table => table.tableNum === "358");
  const table359 = tableData && tableData.find(table => table.tableNum === "359");
  const table360 = tableData && tableData.find(table => table.tableNum === "360");
  const table361 = tableData && tableData.find(table => table.tableNum === "361");
  const table362 = tableData && tableData.find(table => table.tableNum === "362");
  const table363 = tableData && tableData.find(table => table.tableNum === "363");
  const table364 = tableData && tableData.find(table => table.tableNum === "364");
  const table365 = tableData && tableData.find(table => table.tableNum === "365");
  const table366 = tableData && tableData.find(table => table.tableNum === "366");
  const table367 = tableData && tableData.find(table => table.tableNum === "367");
  const table368 = tableData && tableData.find(table => table.tableNum === "368");
  const table369 = tableData && tableData.find(table => table.tableNum === "369");
  const table370 = tableData && tableData.find(table => table.tableNum === "370");
  const table371 = tableData && tableData.find(table => table.tableNum === "371");
  const table372 = tableData && tableData.find(table => table.tableNum === "372");
  const table373 = tableData && tableData.find(table => table.tableNum === "373");
  const table374 = tableData && tableData.find(table => table.tableNum === "374");
  const table375 = tableData && tableData.find(table => table.tableNum === "375");
  const table376 = tableData && tableData.find(table => table.tableNum === "376");
  const table377 = tableData && tableData.find(table => table.tableNum === "377");
  const table378 = tableData && tableData.find(table => table.tableNum === "378");
  const table379 = tableData && tableData.find(table => table.tableNum === "379");

  // for (let i = 101; i <= 126; i++) {
  //   const table = tableData && tableData.find(table => table.tableNum === String(i));
  //   tables.push(table);
  // }


  const getBackgroundColor = (table) => {
    if (!table) return 'rgba(0, 128, 0, 1)'; 
    if (table.currCapacity === table.maxCapacity) {
      return 'rgba(255, 0, 0, 1)';
    } else if (table.currCapacity < table.maxCapacity) {
      return 'rgb(445,180,25, 1)';
    } else {
      return 'rgba(0, 128, 0, 1)';
    }
  };

  const getBackgroundColorOnHover = (table) => {
    if (!table) return 'rgba(0, 128, 0, 0.5)'; 
    if (table.currCapacity === table.maxCapacity) {
      return 'rgba(255, 0, 0, 0.5)';
    } else if (table.currCapacity < table.maxCapacity) {
      return 'rgba(255, 165, 0, 0.5)';
    } else {
      return 'rgba(0, 128, 0, 0.5)';
    }
  };

  const handleDeleteTable = async (tableNum) => {
    try {
      const response = await fetch(buildPath('api/delete-table'), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableNum: tableNum })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      
      console.log("Successfully Deleted Table:", tableNum);
    } catch (error) {
      console.error('Error Deleting Table:', error);
    }
  };

  const handleEDITTable = async (tableData) => {
    try {
      const response = await fetch(buildPath('api/table-edit'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tableData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      
      console.log("Successfully Edited Table:", tableData.title);
    } catch (error) {
      console.error('Error Editing Table:', error);
    }
  };

  const tableDetails = async (tableNum) => {
    try {
      const response = await fetch(buildPath('api/find-table'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tableNum: tableNum })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      // console.log(response.usersAtTable.json());
      return response.usersAtTable;
    } catch (error) {
      console.error('Table not found');
    }
  };


 
  const [showFormm, setShowFormm] = useState(false);
  const getTableInfo = (table) => {
    const isUserInTable = table.usersAtTable.includes(UserID);
  
    const handleTableAction = async () => {
      try {
        if (isUserInTable && table.currCapacity === 1) {
          console.log('HERERERERERERERE   ');
          handleDeletTableAction();
          return;
        }else if (isUserInTable) {
          
          await handleLeaveTable(table.tableNum);
          const newTableData = {
            tableNum: table.tableNum,
            title: table.tableTitle,
            subject: table.tableSubject,
            currCapacity: table.currCapacity-1,
            maxCapacity: table.maxCapacity,
          };
          await handleEDITTable(newTableData);

        } else {
          await handleJoinTable(table.tableNum);
          const newTableData = {
            tableNum: table.tableNum,
            title: table.tableTitle,
            subject: table.tableSubject,
            currCapacity: table.currCapacity+1,
            maxCapacity: table.maxCapacity,
          };
          await handleEDITTable(newTableData);
        }
        // Update the table data state to reflect the changes
        findTable();
        table = tableData && tableData.find(table => table.tableNum === table.tableNum);
    
        setTableData(prevTableData => {
          return prevTableData.map(t => {
            if (t.tableNum === table.tableNum) {
              // Return a new object with updated usersAtTable array
              return {
                ...t,
                usersAtTable: isUserInTable 
                  ? t.usersAtTable.filter(userId => userId !== UserID) 
                  : [...t.usersAtTable, UserID]
              };
            }
            return t;
          });
        });
      } catch (error) {
        console.error('Error handling table action:', error);
      }
    };
    const handleDeletTableAction = async () => {
      try {
        // Delete the table
        await handleDeleteTable(table.tableNum);
        
        // Refetch the table data
        findTable();
    
        // Update the table data in the state
        setTableData(prevTableData => {
          return prevTableData.map(t => {
            if (t.tableNum === table.tableNum) {
              // Return a new object with updated usersAtTable array
              return {
                ...t,
                usersAtTable: isUserInTable 
                  ? t.usersAtTable.filter(userId => userId !== UserID) 
                  : [...t.usersAtTable, UserID]
              };
            }
            return t;
          });
        });
      } catch (error) {
        console.error('Error handling Delete table action:', error);
      }
    };
    


    
    const EditTableForm = () => {
      const [titlee, setTitlee] = useState('');
      const [subjectt, setSubjectt] = useState('');
      const [maxCapacityy, setMaxCapacityy] = useState('');
      const [isLoadingg, setIsLoadingg] = useState(false);
    
      const handleTableEdit = async (e) => {
        if (!titlee || !subjectt || !maxCapacityy) {
          alert("All fields are required");
          return;
        }
    
        try {
          setIsLoadingg(true);
          const newTableData = {
            tableNum: table.tableNum,
            title: titlee,
            subject: subjectt,
            currCapacity: table.currCapacity,
            maxCapacity: parseInt(maxCapacityy),
          };
          await handleEDITTable(newTableData);
          findTable();
          table = tableData && tableData.find(table => table.tableNum === table.tableNum);
      
          setTableData(prevTableData => {
            return prevTableData.map(t => {
              if (t.tableNum === table.tableNum) {
                // Return a new object with updated usersAtTable array
                return {
                  ...t,
                  usersAtTable: isUserInTable 
                    ? t.usersAtTable.filter(userId => userId !== UserID) 
                    : [...t.usersAtTable, UserID]
                };
              }
              return t;
            });
          });
        } catch (error) {
          console.error("Error Editing Table:", error);
        } finally {
          setIsLoadingg(false);
        }
      };

      useEffect(() => {
        if (table) {
          setTitlee(table.title);
          setSubjectt(table.subject);
          setMaxCapacityy(table.maxCapacity);
        }
      }, [table]);
    
      return (
        (showFormm)&&(
          <form onSubmit={(e) => {
            handleTableEdit();
            setShowFormm(false);
          }}>
          <div>
            <FormControl sx={{ display: 'inline-block', marginRight: '10px' }}>
              <InputLabel htmlFor="titlee" style={{ color: 'black'}}>Title : </InputLabel>
              <Input
                type="text"
                id="titlee"
                value={titlee}
                onChange={(e) => setTitlee(e.target.value)}
                style={{ color: 'black', marginLeft: '12px'  }}
              />
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl sx={{ display: 'inline-block', marginRight: '10px' }}>
              <InputLabel htmlFor="subjectt" style={{ color: 'black'}}>Subject : </InputLabel>
              <Input
                type="text"
                id="subjectt"
                value={subjectt}
                onChange={(e) => setSubjectt(e.target.value)}
                style={{ color: 'black', marginLeft: '12px' }}
              />
            </FormControl>
          </div>
          <br/>
    
          <div>
            <FormControl sx={{ display: 'inline-block' }}>
              <InputLabel htmlFor="maxCapacityy" style={{ color: 'black'}}>Max Capacity : </InputLabel>
              <Input
                type="number"
                id="maxCapacityy"
                value={maxCapacityy}
                onChange={(e) => setMaxCapacityy(e.target.value)}
                style={{ color: 'black', marginLeft: '12px'  }} 
              />
            </FormControl>
          </div>
          <Button type="submit" variant="contained" style={{display: 'none'}}></Button>
        </form>
        )
      );
    };
    

    const handleEditTableAction = () => {
      return (
        <div>
          {/* Your JSX code here */}
          <EditTableForm />
        </div>
      );
  };
    const buttonText = isUserInTable ? 'Leave Table' : 'Join Table';

    const editIcon = <EditIcon />;
    const joinIcon = !isUserInTable ? <GroupIcon />: <ExitToAppIcon />;


    
    return (
      <div>
       <p style={{ fontSize: '25px' }}><span style={{ color: 'rgb(445,180,25, 5)' }}>Table Number:</span> {table.tableNum}</p>
        <p style={{ fontSize: '25px' }}><span style={{ color: 'rgb(445,180,25)' }}>Title: </span>{table.title}</p>
        <p style={{ fontSize: '25px' }}><span style={{ color: 'rgb(445,180,25)' }}>Subject:</span> {table.subject}</p>
        <p style={{ fontSize: '25px' }}><span style={{ color: 'rgb(445,180,25)' }}>Current Capacity:</span> {table.currCapacity}</p>
        <p style={{ fontSize: '25px' }}><span style={{ color: 'rgb(445,180,25)' }}>Max Capacity:</span> {table.maxCapacity}</p>
        {(!isUserInTable && (table.currCapacity != table.maxCapacity))  ? (
        <IconButton
            style={{ border: "1px solid ", borderRadius: '5px', padding: '10px', border: '5px', color: isUserInTable ? "red" : "inherit" }}
            onClick={handleTableAction}
        >
            {<GroupIcon />}
        </IconButton>
        ) : null}


        {((table.currCapacity > 1 && isUserInTable))  ? (
        <IconButton
            style={{ border: "1px solid ", borderRadius: '5px', padding: '10px', border: '5px', color: isUserInTable ? "red" : "inherit" }}
            onClick={handleTableAction}
        >
            {joinIcon}
        </IconButton>
        ) : null}
            {(table.currCapacity >= 1 && isUserInTable) && table.usersAtTable[0] == UserID  ? (
                <IconButton
                    style={{ border: "1px solid ", borderRadius: '5px', border: 'none', padding: '1px', color: isUserInTable ? "yellow" : "inherit" }}
                    onClick={() => setShowFormm(!showFormm)}
                >
                    <EditIcon />
                </IconButton>
            ) : null}
            {showFormm && handleEditTableAction() 
            }

        
            {table.currCapacity === 0 || (isUserInTable && table.currCapacity === 1) || (table.usersAtTable[0] == UserID)? (
                <IconButton style={{ border: "1px solid ", borderRadius: '5px', padding: '5px', border: '5px', color: isUserInTable ? "red" : "inherit" }}
                    onClick={handleDeletTableAction}>
                    <DeleteIcon />
                </IconButton>
            ) : null}
    </div>

    );
  };
  

  const [allUsers, setAllUsers] = useState(null);
    async function getAllUsers() {
      try {
        const response = await fetch(buildPath('api/all-users'), {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch: ' + response.statusText);
        }
    
        const users = await response.json();

        //setAllUsers(users);
        //console.log("All Users :    " + JSON.stringify(users));
        return(users);
      } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
      }
    }


  const [createdTable, setCreatedTable] = useState(null);
  function CreateTableButton({ onCreateTable, tableNum, UserID, table }) {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const users = useState(null);
    const [showForm, setShowForm] = useState(true);
    
    
    const handleCreateTable = async () => {
      if (!title || !subject || !maxCapacity) {
        alert("All fields are required");
        return;
      }
    
      try {
        setIsLoading(true);
        const users = await getAllUsers();
        // console.log("users:", users); 
        // console.log("Hererrerre");
        // console.log("users:", allUsers);
        setAllUsers(users);
        for (let i = 0; i < users.length; i++) {
          if (users[i]._id === UserID) {
            const username = users[i].username;
            const newTableData = {
              tableNum: tableNum,
              title: title,
              subject: subject,
              currCapacity: parseInt(1),
              maxCapacity: parseInt(maxCapacity),
              userId: UserID,
              username: username
            };
            console.log(username);
            console.log(newTableData);
            onCreateTable(newTableData);
            setShowForm(false);

            

            return;
            
          }
        }
        
        
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    
    if(showForm){
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleCreateTable(); 
        }}>
        <div>
          
          <br/>
          <div>
          <FormControl sx={{ display: 'inline-block', marginRight: '10px' }}>
            <InputLabel htmlFor="groupTitle" style={{ color: 'black'}}>Title : </InputLabel>
            <Input
              type="text"
              id="groupTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ color: 'black' }} 
            />
          </FormControl>
          
          </div>
          <br/>

          <div>
          <FormControl sx={{ display: 'inline-block', marginRight: '10px' }}>
            <InputLabel htmlFor="subject" style={{ color: 'black'}}>Subject : </InputLabel>
            <Input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ color: 'black' }}
            />
          </FormControl>
          </div>
          <br/>

          <div>
          <FormControl sx={{ display: 'inline-block' }}>
            <InputLabel htmlFor="maxCapacity" style={{ color: 'black'}}>Max Capacity : </InputLabel>
            <Input
              type="number"
              id="maxCapacity"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
              style={{ color: 'black' }} 
            />
          </FormControl>
          </div>
          <Button type="submit" variant="contained" style={{display: 'none'}}></Button>
          
        </div>
        </form>


      );
    }
    
  };

  const afterCreateTable = (table) =>{
    console.log('afterCreateTable heeeerrrreeee');
    findTable();
    table = tableData && tableData.find(table => table.tableNum === table.tableNum);
    const isUserInTable = table.usersAtTable.includes(UserID); 
            //table = tableData && tableData.find(table => table.tableNum === table.tableNum);
        
    

    return;
  }
  


  const onCreateTable = async (tableData) => {
    console.log(tableData);
    try {
      const response = await fetch(buildPath('api/tables'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tableData)
      });
  
      if (!response.ok) {
        const responseBody = await response.text(); // Get response body
        console.log(tableData);
        console.log(JSON.stringify(tableData));
        console.error("Error creating table. Status:", response.status, "Response Body:", responseBody);
        return;
      }
  
      const data = await response.json();
      console.log("Table Created Successfully ");
      afterCreateTable(tableData);
      return data;
    } catch (error) {
      console.log(tableData);
      console.log(JSON.stringify(tableData));
      console.error('Error creating table  :', error.message);
    }
  };
  

  const [isTable1Hovered, setTable1Hovered] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'inline-block', border: '2px solid black' }}>
      <img src={thirdFloorImage} alt="Third Floor Map" className='floorMap' style={{ position: 'relative' }}/>
     
      <Box position="absolute" top="17.7%" left="12.8%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table301 ? (
          getTableInfo(table301)
        ):<div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 301 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={301} UserID={UserID} table={table301}/>
        </div>}
        PopperProps={{
          sx: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          }
        }}>
          <Button className='tableButton'
            sx={{
              borderRadius: '0%',
              width: '30px',
              height: '40px',
              minWidth: '20px',
              //border: '5px solid rgb(255, 87, 51)',
              //bgcolor: 'rgb(184, 134, 11, 0.6);',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table301),
              filter: 'blur(5px)',
              //border: '5px solid',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table301),
            filter: 'blur(2px)',
              }
            }}
            
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>301</p>
        </Tooltip>
      </Box>


      {/* Table 302 */}
      <Box position="absolute" top="17.6%" left="15.8%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table302 ? (
          getTableInfo(table302)
        ):<div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 302 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={302} UserID={UserID} table={table302}/>
        </div>}
        PopperProps={{
          sx: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          }
        }}>
          <Button className='tableButton'
            sx={{
              borderRadius: '0%',
              width: '30px',
              height: '40px',
              minWidth: '20px',
              //border: '5px solid rgb(255, 87, 51)',
              //bgcolor: 'rgb(184, 134, 11, 0.6);',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table302),
              filter: 'blur(5px)',
              //border: '5px solid',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table302),
            filter: 'blur(2px)',
              }
            }}
            
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>302</p>
        </Tooltip>
      </Box>

      {/* Table 303 */}
      <Box position="absolute" top="17.5%" left="18.7%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table303 ? (
          getTableInfo(table303)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 303 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={303} UserID={UserID} table={table303}/>
            
          </div>
        )}
        PopperProps={{
          sx: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          }
        }}>
          <Button className='tableButton'
            sx={{
              borderRadius: '0%',
              width: '33px',
              height: '40px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table303),
              filter: 'blur(5px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table303), 
              filter: 'blur(2px)',
              }
            }}
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>303</p>
        </Tooltip>
      </Box>

      {/* Table 304 */}
      <div 
  style={{
    position: "absolute",
    top: "18.9%",
    left: "22.5%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center", 
  }}
>
  <Tooltip 
    title={table304 ? getTableInfo(table304) : (
      <div className='emptyTable'>
        <p style={{ fontSize: '18px' }}>Table 304 is empty</p>
        <CreateTableButton onCreateTable={onCreateTable} tableNum={304} UserID={UserID} table={table304}/>
      </div>
    )}
    PopperProps={{
      sx: {
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
      }
    }}
  >
    <Button 
      className='tableButton'
      sx={{
        borderRadius: '0%',
        width: '30px',
        height: '40px',
        minWidth: '20px',
        border: '2px solid white',
        bgcolor: getBackgroundColor(table304), 
        filter: 'blur(5px)',
        '&:hover': {
          bgcolor: getBackgroundColorOnHover(table304),
          filter: 'blur(2px)',
        }
      }}
    >
    </Button>
    <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
      304
    </p>
  </Tooltip>
</div>


      {/* Table 305 */}
      <Box position="absolute" top="17.8%" left="25.7%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table305? (
          getTableInfo(table305)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 305 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={305} UserID={UserID} table={table305}/>
          </div>
        )}
        PopperProps={{
          sx: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          }
        }}>
          <Button className='tableButton'
            sx={{
              borderRadius: '0%',
              width: '25px',
              height: '80px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table305),
              filter: 'blur(5px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table305), 
              filter: 'blur(2px)',
              }
            }}
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            305
          </p>
        </Tooltip>
      </Box>

      {/* Table 306 */}
      <Box position="absolute" top="23.3%" left="28.5%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table306 ? (
          getTableInfo(table306)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 306 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={306} UserID={UserID} table={table306}/>
          </div>
        )}
        PopperProps={{
          sx: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          }
        }}>
          <Button className='tableButton'
            sx={{
              borderRadius: '0%',
              width: '25px',
              height: '78px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table306),
              filter: 'blur(5px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table306),
              filter: 'blur(2px)',
              }
            }}
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            306
          </p>
        </Tooltip>
      </Box>


      {/* Table 307 */}
      <Box position="absolute" top="18.6%" left="31.5%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table307 ? (
          getTableInfo(table307)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 307 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={307} UserID={UserID} table={table307}/>
          </div>
        )}
        PopperProps={{
          sx: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          }
        }}>
          <Button className='tableButton'
            sx={{
              borderRadius: '0%',
              width: '23px',
              height: '80px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table307),
              filter: 'blur(5px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table307), 
              filter: 'blur(3px)',
              }
            }}
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            307
          </p>
        </Tooltip>
      </Box>

      {/* Table 308 */}
      <Box position="absolute" top="57.7%" left="8.8%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table308 ? (
          getTableInfo(table308)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 308 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={308} UserID={UserID} table={table308}/>
          </div>
        )}
        PopperProps={{
          sx: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          }
        }}>
          <Button className='tableButton'
            sx={{
              borderRadius: '0%',
              width: '29px',
              height: '37px',
              minWidth: '20px',
              bgcolor: getBackgroundColor(table308),
              filter: 'blur(5px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table308), 
              filter: 'blur(4px)',
              }
            }}
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            308
          </p>
        </Tooltip>
      </Box>

      {/* Table 309 */}
    <Box position="absolute" top="60.3%" left="11.3%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table309 ? (
        getTableInfo(table309)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 309 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={309} UserID={UserID} table={table309}/>
        </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '0%',
            width: '30px',
            height: '60px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table309),
            filter: 'blur(5px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table309), 
              filter: 'blur(4px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            309
        </p>
      </Tooltip>
    </Box>

    {/* Table 310 */}
    <Box position="absolute" top="65.3%" left="8.8%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table310 ? (
        getTableInfo(table310)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 310 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={310} UserID={UserID} table={table310}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '0%',
            width: '28px',
            height: '34px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table310), 
            filter: 'blur(5px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table310), 
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            310
        </p>
      </Tooltip>
    </Box>

    {/*Table 311 */}
    <Box position="absolute" top="72%" left="8.8%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table311 ? (
        getTableInfo(table311)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 311 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={311} UserID={UserID} table={table311}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '0%',
            width: '25px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table311),
            filter: 'blur(5px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table311),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            311
        </p>
      </Tooltip>
    </Box>

    {/* Table 312 */}
    <Box position="absolute" top="72.5%" left="11.6%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table312 ? (
        getTableInfo(table312)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 312 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={312} UserID={UserID} table={table312}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '25px',
            height: '35px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table312),
            filter: 'blur(5px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table312),
              filter: 'blur(1px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            312
        </p>
      </Tooltip>
    </Box>

    {/* Table 313 */}
    <Box position="absolute" top="76.8%" left="9.2%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table313 ? (
        getTableInfo(table313)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 313 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={313} UserID={UserID} table={table313}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(2px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '0%',
            width: '25px', 
            height: '20px', 
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table313),
            filter: 'blur(5px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table313),
              filter: 'blur(3px)'
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            313
        </p>
      </Tooltip>
    </Box>

    {/* Table 314 */}
    <Box position="absolute" top="64.3%" left="19.8%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table314 ? (
        getTableInfo(table314)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 314 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={314} UserID={UserID} table={table314}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(1px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '0px',
            width: '35px',
            height: '22px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table314),
            filter: 'blur(5px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table314),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            314
        </p>
      </Tooltip>
    </Box>

    {/* Table 315 */}
    <Box position="absolute" top="68%" left="19.8%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table315 ? (
        getTableInfo(table315)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 315 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={315} UserID={UserID} table={table315}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(1px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '20px',
            width: '35px',
            height: '22px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table315),
            filter: 'blur(1px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table315), 
              filter: 'blur(2px)',
            }

          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            315
        </p>
      </Tooltip>
    </Box>

    
    {/* Table 316 */}
    <Box position="absolute" top="68.5%" left="24%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table316 ? (
        getTableInfo(table316)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 316 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={316} UserID={UserID} table={table316}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(1px)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '65%',
            height: '60%',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table316), 
            filter: 'blur(2px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table316),
              filter: 'blur(1px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            316
        </p>
      </Tooltip>
    </Box>

    {/* Table 317 */}
    <Box position="absolute" top="72.3%" left="24%" transform="translate(50%, -50%) rotate(95deg)" display="flex">
      <Tooltip title={table317 ? (
        getTableInfo(table317)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 317 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={317} UserID={UserID} table={table317}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '40%',
            height: '50%',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table317),
            filter: 'blur(2px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table317),
              filter: 'blur(1px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            317
        </p>
      </Tooltip>
    </Box>

    {/* Table 318 */}
    <Box position="absolute" top="74.4%" left="19.9%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table318 ? (
        getTableInfo(table318)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 318 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={318} UserID={UserID} table={table318}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '30px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table318),
          filter: 'blur(2px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table318),
              filter: 'blur(1px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            318
        </p>
      </Tooltip>
    </Box>


    {/* Table 319 */}
    <Box position="absolute" top="78.5%" left="19.9%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table319 ? (
        getTableInfo(table319)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 319 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={319} UserID={UserID} table={table319}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '20%',
            width: '30px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table319),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table319),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            319
        </p>
      </Tooltip>
    </Box>


    {/* Table 320 */}
    <Box position="absolute" top="81.5%" left="24.8%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table320 ? (
        getTableInfo(table320)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 320 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={320} UserID={UserID} table={table320}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '20%',
            width: '50px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table320),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table320),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        320
        </p>
      </Tooltip>
    </Box>


    {/* Table 321 */}
    <Box position="absolute" top="81.5%" left="30.1%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table321 ? (
        getTableInfo(table321)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 321 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={321} UserID={UserID} table={table321}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '20%',
            width: '46px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table321),
          filter: 'blur(2px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table321),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        321
        </p>
      </Tooltip>
    </Box>


    {/* Table 322 */}
    <Box position="absolute" top="89.3%" left="20.2%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table322 ? (
        getTableInfo(table322)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 322 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={322} UserID={UserID} table={table322}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(2px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '20%',
            width: '30px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table322),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table322),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        322
        </p>
      </Tooltip>
    </Box>


    {/* Table 323 */}
    <Box position="absolute" top="89.3%" left="26.2%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table323 ? (
        getTableInfo(table323)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 323 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={323} UserID={UserID} table={table323}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(2px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '20%',
            width: '150%',
            height: '100%',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table323),
          filter: 'blur(2px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table323),
              filter: 'blur(1px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        323
        </p>
      </Tooltip>
    </Box>


    {/* Table 324 */}
    <Box position="absolute" top="89.3%" left="32.1%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table324 ? (
        getTableInfo(table324)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 324 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={324} UserID={UserID} table={table324}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '160%',
            height: '100%',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table324),
            filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table324),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        324
        </p>
      </Tooltip>
    </Box>


    {/* Table 325 */}
    <Box position="absolute" top="73.5%" left="31.5%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table325 ? (
        getTableInfo(table325)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 325 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={325} UserID={UserID} table={table325}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '150%',
            height: '100%',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table325),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table325),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        325
        </p>
      </Tooltip>
    </Box>


    {/* Table 326 */}
    <Box position="absolute" top="50.5%" left="36.8%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table326 ? (
        getTableInfo(table326)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 326 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={326} UserID={UserID} table={table326}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '140%',
            height: '80%',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table326),
          filter: 'blur(2px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table326),
              filter: 'blur(1px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        326
        </p>
      </Tooltip>
    </Box>

    {/* Table 327 */}
    <Box position="absolute" top="47.2%" left="38.9%" transform="translate(50%, -50%) rotate(95deg)" display="flex">
      <Tooltip title={table327 ? (
        getTableInfo(table327)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 327 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={327} UserID={UserID} table={table327}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '140%',
            height: '80%',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table327),
            filter: 'blur(2px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table327),
              filter: 'blur(1px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            327
        </p>
      </Tooltip>
    </Box>

    {/* Table 328 */}
    <Box position="absolute" top="50.8%" left="40.2%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table328 ? (
        getTableInfo(table328)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 328 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={328} UserID={UserID} table={table328}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '30px',
            height: '18px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table328),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table328),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            328
        </p>
      </Tooltip>
    </Box>


    {/* Table 329 */}
    <Box position="absolute" top="47.9%" left="41.9%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table329 ? (
        getTableInfo(table329)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 329 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={329} UserID={UserID} table={table329}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '30px',
            height: '7px',
            minWidth: '20px',
            border: '1px solid white',
            bgcolor: getBackgroundColor(table329),
          filter: 'blur(2px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table329),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            329
        </p>
      </Tooltip>
    </Box>


    {/* Table 330 */}
    <Box position="absolute" top="54.4%" left="42.3%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table330 ? (
        getTableInfo(table330)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 330 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={330} UserID={UserID} table={table330}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '30px',
            height: '18px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table330),
          filter: 'blur(2px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table330),
              filter: 'blur(1px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        330
        </p>
      </Tooltip>
    </Box>


    {/* Table 331 */}
    <Box position="absolute" top="52.3%" left="44.2%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table331 ? (
        getTableInfo(table331)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 331 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={331} UserID={UserID} table={table331}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '20px',
            height: '16px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table331),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table331),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        331
        </p>
      </Tooltip>
    </Box>


    {/* Table 332 */}
    <Box position="absolute" top="48.3%" left="52.6%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table332 ? (
        getTableInfo(table332)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 332 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={332} UserID={UserID} table={table332}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '30px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table332),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table332),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        332
        </p>
      </Tooltip>
    </Box>


    {/* Table 333 */}
    <Box position="absolute" top="53%" left="54.6%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table333 ? (
        getTableInfo(table333)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 333 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={333} UserID={UserID} table={table333}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '130%',
            height: '80%',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table333),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table333),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        333
        </p>
      </Tooltip>
    </Box>


    {/* Table 334 */}
    <Box position="absolute" top="48.9%" left="55.7%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table334 ? (
        getTableInfo(table334)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 334 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={334} UserID={UserID} table={table334}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '80%',
            height: '40%',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table334),
            filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table334),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        334
        </p>
      </Tooltip>
    </Box>


    {/* Table 335 */}
    <Box position="absolute" top="50%" left="58.3%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table335 ? (
        getTableInfo(table335)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 335 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={335} UserID={UserID} table={table335}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '130%',
            height: '40%',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table335),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table335),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        335
        </p>
      </Tooltip>
    </Box>


    {/* Table 336 */}
    <Box position="absolute" top="39%" left="59.2%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table336 ? (
        getTableInfo(table336)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 336 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={336} UserID={UserID} table={table336}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '120%',
            height: '80%',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table336),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table336),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        336
        </p>
      </Tooltip>
    </Box>


    {/* Table 337 */}
    <Box position="absolute" top="40.5%" left="62%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table337 ? (
          getTableInfo(table337)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 337 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={337} UserID={UserID} table={table337}/>
          </div>
        )}
        PopperProps={{
          sx: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          }
        }}>
          <Button className='tableButton'
            sx={{
              borderRadius: '0%',
              width: '30px',
              height: '18px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table337),
              filter: 'blur(2px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table337), 
              filter: 'blur(1px)',
              }
            }}
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            337
          </p>
        </Tooltip>
      </Box>

      {/* Table 338 */}
      <Box position="absolute" top="35.8%" left="63.8%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table338 ? (
          getTableInfo(table338)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 338 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={338} UserID={UserID} table={table338}/>
          </div>
        )}
        PopperProps={{
          sx: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          }
        }}>
          <Button className='tableButton'
            sx={{
              borderRadius: '0%',
              width: '30px',
              height: '14px',
              minWidth: '20px',
              bgcolor: getBackgroundColor(table338),
              filter: 'blur(3px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table338), 
              filter: 'blur(4px)',
              }
            }}
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            338
          </p>
        </Tooltip>
      </Box>

      {/* Table 339 */}
    <Box position="absolute" top="33.2%" left="65.8%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table339 ? (
        getTableInfo(table339)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 339 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={339} UserID={UserID} table={table339}/>
        </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '0%',
            width: '24px',
            height: '14px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table339),
            filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table339), 
              filter: 'blur(4px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            339
        </p>
      </Tooltip>
    </Box>

    {/* Table 340 */}
    <Box position="absolute" top="62%" left="59%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table340 ? (
        getTableInfo(table340)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 340 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={340} UserID={UserID} table={table340}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '0%',
            width: '30px',
            height: '18px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table340), 
            filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table340), 
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            340
        </p>
      </Tooltip>
    </Box>

    {/*Table 341 */}
    <Box position="absolute" top="55.8%" left="59.4%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table341 ? (
        getTableInfo(table341)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 341 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={341} UserID={UserID} table={table341}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '0%',
            width: '25px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table341),
            filter: 'blur(1px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table341),
              filter: 'blur(1px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            341
        </p>
      </Tooltip>
    </Box>

    {/* Table 342 */}
    <Box position="absolute" top="50%" left="61%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table342 ? (
        getTableInfo(table342)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 342 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={342} UserID={UserID} table={table342}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '20px',
            height: '18px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table342),
            filter: 'blur(1px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table342),
              filter: 'blur(1px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            342
        </p>
      </Tooltip>
    </Box>

    {/* Table 343 */}
    <Box position="absolute" top="51%" left="63.5%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table343 ? (
        getTableInfo(table343)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 343 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={343} UserID={UserID} table={table343}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '0%',
            width: '20px', 
            height: '20px', 
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table343),
            filter: 'blur(1px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table343),
              filter: 'blur(3px)'
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            343
        </p>
      </Tooltip>
    </Box>

    {/* Table 344 */}
    <Box position="absolute" top="61.6%" left="62.3%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table344 ? (
        getTableInfo(table344)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 344 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={344} UserID={UserID} table={table344}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(2px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '1px',
            width: '30px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table344),
            filter: 'blur(5px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table344),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            344
        </p>
      </Tooltip>
    </Box>

    {/* Table 345 */}
    <Box position="absolute" top="65.7%" left="61.8%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table345 ? (
        getTableInfo(table345)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 345 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={345} UserID={UserID} table={table345}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '1px',
            width: '30px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table345),
            filter: 'blur(5px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table345), 
              filter: 'blur(3px)',
            }

          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            345
        </p>
      </Tooltip>
    </Box>

    
    {/* Table 346 */}
    <Box position="absolute" top="58%" left="64.2%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table346 ? (
        getTableInfo(table346)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 346 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={346} UserID={UserID} table={table346}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '30%',
            height: '20%',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table346), 
            filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table346),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            346
        </p>
      </Tooltip>
    </Box>

    {/* Table 347 */}
    <Box position="absolute" top="70.9%" left="63.9%" transform="translate(50%, -50%) rotate(95deg)" display="flex">
      <Tooltip title={table347 ? (
        getTableInfo(table347)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 347 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={347} UserID={UserID} table={table347}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '30%',
            height: '20%',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table347),
            filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table347),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            347
        </p>
      </Tooltip>
    </Box>

    {/* Table 348 */}
    <Box position="absolute" top="52.4%" left="65.8%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table348 ? (
        getTableInfo(table348)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 348 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={348} UserID={UserID} table={table348}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '30px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table348),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table348),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            348
        </p>
      </Tooltip>
    </Box>


    {/* Table 349 */}
    <Box position="absolute" top="47.9%" left="66.9%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table349 ? (
        getTableInfo(table349)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 349 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={349} UserID={UserID} table={table349}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '20px',
            height: '28px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table349),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table349),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            349
        </p>
      </Tooltip>
    </Box>


    {/* Table 350 */}
    <Box position="absolute" top="38.5%" left="68%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table350 ? (
        getTableInfo(table350)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 350 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={350} UserID={UserID} table={table350}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '10%',
            width: '20px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table350),
          filter: 'blur(3px)',
          transform: 'rotate(130deg)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table350),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        350
        </p>
      </Tooltip>
    </Box>


    {/* Table 351 */}
    <Box position="absolute" top="62%" left="66.6%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table351 ? (
        getTableInfo(table351)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 351 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={351} UserID={UserID} table={table351}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(2px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '20px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table351),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table351),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        351
        </p>
      </Tooltip>
    </Box>


    {/* Table 352 */}
    <Box position="absolute" top="70.3%" left="67.5%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table352 ? (
        getTableInfo(table352)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 352 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={352} UserID={UserID} table={table352}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '25px',
            height: '45px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table352),
            transform: 'rotate(50deg)',
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table352),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        352
        </p>
      </Tooltip>
    </Box>


    {/* Table 353 */}
    <Box position="absolute" top="78.2%" left="67.6%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table353 ? (
        getTableInfo(table353)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 353 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={353} UserID={UserID} table={table353}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '0%',
            width: '25%',
            height: '40px',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table353),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table353),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        353
        </p>
      </Tooltip>
    </Box>


    {/* Table 354 */}
    <Box position="absolute" top="81.9%" left="66.4%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table354 ? (
        getTableInfo(table354)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 354 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={354} UserID={UserID} table={table354}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '30%',
            height: '30px',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table354),
            filter: 'blur(3px)',
            transform: "rotate(55deg)",
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table354),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        354
        </p>
      </Tooltip>
    </Box>


    {/* Table 355 */}
    <Box position="absolute" top="92%" left="65.8%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table355 ? (
        getTableInfo(table355)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 355 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={355} UserID={UserID} table={table355}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '25px',
            height: '25px',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table355),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table355),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        355
        </p>
      </Tooltip>
    </Box>


    {/* Table 356 */}
    <Box position="absolute" top="89.3%" left="67.4%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table356 ? (
        getTableInfo(table356)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 356 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={356} UserID={UserID} table={table356}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '25px',
            height: '25px',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table356),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table356),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        356
        </p>
      </Tooltip>
    </Box>

    {/* Table 357 */}
    <Box position="absolute" top="86.2%" left="68.8%" transform="translate(50%, -50%) rotate(95deg)" display="flex">
      <Tooltip title={table357 ? (
        getTableInfo(table357)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 357 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={357} UserID={UserID} table={table357}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '25px',
            height: '25px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table357),
            filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table357),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            357
        </p>
      </Tooltip>
    </Box>

    {/* Table 358 */}
    <Box position="absolute" top="67%" left="69.4%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table358 ? (
        getTableInfo(table358)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 358 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={358} UserID={UserID} table={table358}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '10%',
            width: '25px',
            height: '25px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table358),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table358),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            358
        </p>
      </Tooltip>
    </Box>


    {/* Table 359 */}
    <Box position="absolute" top="73%" left="70.9%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table359 ? (
        getTableInfo(table359)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 359 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={359} UserID={UserID} table={table359}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '30px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table359),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table359),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            359
        </p>
      </Tooltip>
    </Box>


    {/* Table 360 */}
    <Box position="absolute" top="47%" left="69.6%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table360 ? (
        getTableInfo(table360)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 360 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={360} UserID={UserID} table={table360}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '20px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table360),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table360),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        360
        </p>
      </Tooltip>
    </Box>


    {/* Table 361 */}
    <Box position="absolute" top="53.4%" left="72.2%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table361 ? (
        getTableInfo(table361)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 361 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={361} UserID={UserID} table={table361}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '20px',
            height: '60px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table361),
            transform: 'rotate(130deg)',
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table361),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        361
        </p>
      </Tooltip>
    </Box>


    {/* Table 362 */}
    <Box position="absolute" top="44.5%" left="72.1%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table362 ? (
        getTableInfo(table362)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 362 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={362} UserID={UserID} table={table362}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '20px',
            height: '35px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table362),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table362),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        362
        </p>
      </Tooltip>
    </Box>


    {/* Table 363 */}
    <Box position="absolute" top="45.5%" left="78.6%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table363 ? (
        getTableInfo(table363)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 363 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={363} UserID={UserID} table={table363}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '25px',
            height: '2spx',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table363),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table363),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        363
        </p>
      </Tooltip>
    </Box>


    {/* Table 364 */}
    <Box position="absolute" top="48.8%" left="80.4%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table364 ? (
        getTableInfo(table364)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 364 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={364} UserID={UserID} table={table364}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '25%',
            height: '25px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table364),
            filter: 'blur(3px)',
            transform: "rotate(225deg)",
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table364),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        364
        </p>
      </Tooltip>
    </Box>


    {/* Table 365 */}
    <Box position="absolute" top="52%" left="82.1%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table365 ? (
        getTableInfo(table365)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 365 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={365} UserID={UserID} table={table365}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '25px',
            height: '25px',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table365),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table365),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        365
        </p>
      </Tooltip>
    </Box>


    {/* Table 366 */}
    <Box position="absolute" top="57%" left="81.8%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table366 ? (
        getTableInfo(table366)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 366 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={366} UserID={UserID} table={table366}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '25px',
            height: '25px',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table366),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table366),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        366
        </p>
      </Tooltip>
    </Box>

    {/* Table 367 */}
    <Box position="absolute" top="54.8%" left="84.7%" transform="translate(50%, -50%) rotate(95deg)" display="flex">
      <Tooltip title={table367 ? (
        getTableInfo(table367)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 367 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={367} UserID={UserID} table={table367}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '20%',
            height: '190%',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table367),
            filter: 'blur(3px)',
            transform: "rotate(40deg)",
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table367),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '90%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            367
        </p>
      </Tooltip>
    </Box>

    {/* Table 368 */}
    <Box position="absolute" top="60.5%" left="85.8%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table368 ? (
        getTableInfo(table368)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 368 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={368} UserID={UserID} table={table368}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '20px',
            height: '25px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table368),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table368),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            368
        </p>
      </Tooltip>
    </Box>


    {/* Table 369 */}
    <Box position="absolute" top="67.1%" left="84.1%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table369 ? (
        getTableInfo(table369)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 369 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={369} UserID={UserID} table={table369}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '30px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table369),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table369),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            369
        </p>
      </Tooltip>
    </Box>


    {/* Table 370 */}
    <Box position="absolute" top="77.2%" left="77.6%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table370 ? (
        getTableInfo(table370)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 370 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={370} UserID={UserID} table={table370}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '20px',
            height: '50px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table370),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table370),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        370
        </p>
      </Tooltip>
    </Box>


    {/* Table 371 */}
    <Box position="absolute" top="58%" left="88%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table371 ? (
        getTableInfo(table371)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 371 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={371} UserID={UserID} table={table371}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '20px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table371),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table371),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        371
        </p>
      </Tooltip>
    </Box>


    {/* Table 372 */}
    <Box position="absolute" top="63%" left="87.3%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table372 ? (
        getTableInfo(table372)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 372 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={372} UserID={UserID} table={table372}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '30px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table372),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table372),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        372
        </p>
      </Tooltip>
    </Box>


    {/* Table 373 */}
    <Box position="absolute" top="60.7%" left="90.2%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table373 ? (
        getTableInfo(table373)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 373 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={373} UserID={UserID} table={table373}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '150%',
            height: '100%',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table373),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table373),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
        373
        </p>
      </Tooltip>
    </Box>


    {/* Table 374 */}
    <Box position="absolute" top="84.2%" left="81%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table374 ? (
        getTableInfo(table374)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 374 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={374} UserID={UserID} table={table374}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '20%',
            height: '35px',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table374),
            filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table374),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer', fontSize: '12px'}}>
        374
        </p>
      </Tooltip>
    </Box>


    {/* Table 375 */}
    <Box position="absolute" top="84.2%" left="83.2%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table375 ? (
        getTableInfo(table375)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 375 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={375} UserID={UserID} table={table375}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '20%',
            height: '35px',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table375),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table375),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer', fontSize: '12px'}}>
        375
        </p>
      </Tooltip>
    </Box>


    {/* Table 376 */}
    <Box position="absolute" top="84.2%" left="85.4%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table376 ? (
        getTableInfo(table376)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 376 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={376} UserID={UserID} table={table376}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '20%',
            height: '35px',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table376),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table376),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer', fontSize: '12px'}}>
        376
        </p>
      </Tooltip>
    </Box>

    {/* Table 377 */}
    <Box position="absolute" top="84.2%" left="87.7%" transform="translate(50%, -50%) rotate(95deg)" display="flex">
      <Tooltip title={table377 ? (
        getTableInfo(table377)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 377 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={377} UserID={UserID} table={table377}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            width: '20%',
            height: '35px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table377),
            filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table377),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer', fontSize: '12px'}}>
            377
        </p>
      </Tooltip>
    </Box>

    {/* Table 378 */}
    <Box position="absolute" top="84.2%" left="89.9%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table378 ? (
        getTableInfo(table378)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 378 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={378} UserID={UserID} table={table378}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '20px',
            height: '35px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table378),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table378),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer', fontSize: '12px'}}>
            378
        </p>
      </Tooltip>
    </Box>


    {/* Table 379 */}
    <Box position="absolute" top="75.3%" left="89.9%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table379 ? (
        getTableInfo(table379)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 379 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={379} UserID={UserID} table={table379}/>
       </div>
      )}
      PopperProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        }
      }}>
        <Button className='tableButton'
          sx={{
            borderRadius: '30%',
            width: '25px',
            height: '25px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table379),
          filter: 'blur(3px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table379),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', cursor: 'pointer'}}>
            379
        </p>
      </Tooltip>
    </Box>

    </div>
  );
};

export default ThirdFloor;

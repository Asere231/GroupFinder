import React, {useState, useEffect} from 'react';
import firstFloorImage from './FirstFloorMap.jpg';
import Tooltip from "@mui/material/Tooltip";
import Box from '@mui/material/Box';
import { jwtDecode } from "jwt-decode";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { FormControl, InputLabel, Input, Button} from '@mui/material';




const FirstFloor = () => {
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

  const table101 = tableData && tableData.find(table => table.tableNum === "101");
  const table102 = tableData && tableData.find(table => table.tableNum === "102");
  const table103 = tableData && tableData.find(table => table.tableNum === "103");
  const table104 = tableData && tableData.find(table => table.tableNum === "104");
  const table105 = tableData && tableData.find(table => table.tableNum === "105");
  const table106 = tableData && tableData.find(table => table.tableNum === "106");
  const table107 = tableData && tableData.find(table => table.tableNum === "107");
  const table108 = tableData && tableData.find(table => table.tableNum === "108");
  const table109 = tableData && tableData.find(table => table.tableNum === "109");
  const table110 = tableData && tableData.find(table => table.tableNum === "110");
  const table111 = tableData && tableData.find(table => table.tableNum === "111");
  const table112 = tableData && tableData.find(table => table.tableNum === "112");
  const table113 = tableData && tableData.find(table => table.tableNum === "113");
  const table114 = tableData && tableData.find(table => table.tableNum === "114");
  const table115 = tableData && tableData.find(table => table.tableNum === "115");
  const table116 = tableData && tableData.find(table => table.tableNum === "116");
  const table117 = tableData && tableData.find(table => table.tableNum === "117");
  const table118 = tableData && tableData.find(table => table.tableNum === "118");
  const table119 = tableData && tableData.find(table => table.tableNum === "119");
  const table120 = tableData && tableData.find(table => table.tableNum === "120");
  const table121 = tableData && tableData.find(table => table.tableNum === "121");
  const table122 = tableData && tableData.find(table => table.tableNum === "122");
  const table123 = tableData && tableData.find(table => table.tableNum === "123");
  const table124 = tableData && tableData.find(table => table.tableNum === "124");
  const table125 = tableData && tableData.find(table => table.tableNum === "125");
  const table126 = tableData && tableData.find(table => table.tableNum === "126");

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

        
            {table.currCapacity === 0 || (isUserInTable && table.currCapacity === 1)  || (table.usersAtTable[0] == UserID)? (
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

    const submitCreateTable = () =>{
      handleCreateTable();
    }
    
    
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
          <Button type="submit" variant="contained" style={{display: 'none'}}>Submit</Button>
          
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
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img src={firstFloorImage} alt="First Floor Map" className='floorMap' style={{ position: 'relative' }}/>
     
  <Tooltip style={{
    position: "absolute",
    top: "6.5%",
    left: "55%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center", 
    height: "26px", 
    width: "10px", 
    cursor: "pointer", 
  }}
    title={table101 ? getTableInfo(table101) : (
      <div className='emptyTable'>
        <p style={{ fontSize: '18px' }}>Table 101 is empty</p>
        {isTable1Hovered && <CreateTableButton onCreateTable={onCreateTable} tableNum={101} UserID={UserID} table={table101}/>}
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
        borderRadius: '10%',
        height: '26px',
        width: '40px',
        border: '2px solid white',
        bgcolor: getBackgroundColor(table101),
        filter: 'blur(6px)',
        '&:hover': {
          bgcolor: getBackgroundColorOnHover(table101), 
          filter: 'blur(2px)',
        }
      }}
    ></Button>
    <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            101
    </p>
  </Tooltip>


      {/* Table 102 */}
      <Box position="absolute" top="9%" left="58%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table102 ? (
          getTableInfo(table102)
        ):<div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 102 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={102} UserID={UserID} table={table102}/>
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
              width: '20px',
              height: '45px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table102),
              filter: 'blur(6px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table102),
            filter: 'blur(2px)',
              }
            }}
            
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>102</p>
        </Tooltip>
      </Box>

      {/* Table 103 */}
      {/* <Box position="absolute" top="7%" left="62%" transform="translate(50%, -50%)" display="flex"> */}
      <div 
      style={{
        position: "absolute",
        top: "10.5%",
        left: "62.3%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center", // Center content vertically
        justifyContent: "center", // Center content horizontally
      }}
    >
        <Tooltip title={table103 ? (
          getTableInfo(table103)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 103 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={103} UserID={UserID} table={table103}/>
            
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
              width: '180%',
              height: '90px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table103),
              filter: 'blur(6px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table103), 
              filter: 'blur(2px)',
              }
            }}
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '80%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>103</p>
        </Tooltip>
        </div>
      {/* </Box> */}

      {/* Table 104 */}
      <div 
      style={{
        position: "absolute",
        top: "14%",
        left: "55%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center", // Center content vertically
        justifyContent: "center", // Center content horizontally
      }}
    >
  <Tooltip 
    title={table104 ? getTableInfo(table104) : (
      <div className='emptyTable'>
        <p style={{ fontSize: '18px' }}>Table 104 is empty</p>
        <CreateTableButton onCreateTable={onCreateTable} tableNum={104} UserID={UserID} table={table104}/>
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
        width: '50px',
        height: '30px',
        minWidth: '20px',
        border: '2px solid white',
        bgcolor: getBackgroundColor(table104), 
        filter: 'blur(6px)',
        '&:hover': {
          bgcolor: getBackgroundColorOnHover(table104),
          filter: 'blur(2px)',
        }
      }}
    >
    </Button>
    <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
      104
    </p>
  </Tooltip>
</div>


      {/* Table 105 */}
      <Box position="absolute" top="20%" left="54%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table105? (
          getTableInfo(table105)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 105 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={105} UserID={UserID} table={table105}/>
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
              width: '40px',
              height: '60px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table105),
              filter: 'blur(6px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table105), 
              filter: 'blur(2px)',
              }
            }}
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            105
          </p>
        </Tooltip>
      </Box>

      {/* Table 106 */}
      <Box position="absolute" top="23.2%" left="59.3%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table106 ? (
          getTableInfo(table106)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 106 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={106} UserID={UserID} table={table106}/>
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
              width: '58px',
              height: '40px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table106),
              filter: 'blur(6px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table106),
              filter: 'blur(2px)',
              }
            }}
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            106
          </p>
        </Tooltip>
      </Box>


      {/* Table 107 */}
      <Box position="absolute" top="30.3%" left="59.2%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table107 ? (
          getTableInfo(table107)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 107 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={107} UserID={UserID} table={table107}/>
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
              width: '58px',
              height: '40px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table107),
              filter: 'blur(6px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table107), 
              filter: 'blur(6px)',
              }
            }}
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            107
          </p>
        </Tooltip>
      </Box>

      {/* Table 108 */}
      <Box position="absolute" top="42%" left="54.8%" transform="translate(50%, -50%)" display="flex">
        <Tooltip title={table108 ? (
          getTableInfo(table108)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 108 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={108} UserID={UserID} table={table108}/>
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
              width: '40px',
              height: '60px',
              minWidth: '20px',
              bgcolor: getBackgroundColor(table108),
              filter: 'blur(6px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table108), 
              filter: 'blur(4px)',
              }
            }}
          >
          </Button>
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            108
          </p>
        </Tooltip>
      </Box>

      {/* Table 109 */}
    <Box position="absolute" top="40.2%" left="59.4%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table109 ? (
        getTableInfo(table109)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 109 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={109} UserID={UserID} table={table109}/>
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
            width: '50px',
            height: '40px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table109),
            filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table109), 
              filter: 'blur(4px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            109
        </p>
      </Tooltip>
    </Box>

    {/* Table 110 */}
    <Box position="absolute" top="35%" left="66.7%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table110 ? (
        getTableInfo(table110)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 110 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={110} UserID={UserID} table={table110}/>
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
            width: '50px',
            height: '95px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table110), 
            filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table110), 
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            110
        </p>
      </Tooltip>
    </Box>

    {/*Table 111 */}
    <Box position="absolute" top="33.3%" left="71.3%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table111 ? (
        getTableInfo(table111)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 111 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={111} UserID={UserID} table={table111}/>
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
            width: '40px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table111),
            filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table111),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            111
        </p>
      </Tooltip>
    </Box>

    {/* Table 112 */}
    <Box position="absolute" top="39.5%" left="72.7%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table112 ? (
        getTableInfo(table112)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 112 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={112} UserID={UserID} table={table112}/>
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
            height: '35px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table112),
            filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table112),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            112
        </p>
      </Tooltip>
    </Box>

    {/* Table 113 */}
    <Box position="absolute" top="64%" left="49.5%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table113 ? (
        getTableInfo(table113)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 113 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={113} UserID={UserID} table={table113}/>
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
            width: '34px', 
            height: '60px', 
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table113),
            filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table113),
              filter: 'blur(3px)'
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            113
        </p>
      </Tooltip>
    </Box>

    {/* Table 114 */}
    <Box position="absolute" top="67.7%" left="41.1%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table114 ? (
        getTableInfo(table114)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 114 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={114} UserID={UserID} table={table114}/>
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
            borderRadius: '20px',
            width: '50px',
            height: '50px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table114),
            filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table114),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            114
        </p>
      </Tooltip>
    </Box>

    {/* Table 115 */}
    <Box position="absolute" top="77%" left="47.8%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table115 ? (
        getTableInfo(table115)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 115 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={115} UserID={UserID} table={table115}/>
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
            borderRadius: '50px',
            width: '70px',
            height: '70px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table115),
            filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table115), 
              filter: 'blur(3px)',
            }

          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            115
        </p>
      </Tooltip>
    </Box>

    
    {/* Table 116 */}
    <Box position="absolute" top="85.2%" left="59.5%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table116 ? (
        getTableInfo(table116)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 116 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={116} UserID={UserID} table={table116}/>
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
            width: '120px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table116), 
            filter: 'blur(6px)',
            transform: 'rotate(45deg)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table116),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            116
        </p>
      </Tooltip>
    </Box>

    {/* Table 117 */}
    <Box position="absolute" top="76.6%" left="60.8%" transform="translate(50%, -50%) rotate(95deg)" display="flex">
      <Tooltip title={table117 ? (
        getTableInfo(table117)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 117 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={117} UserID={UserID} table={table117}/>
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
            width: '120px',
            height: '33px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table117),
            filter: 'blur(6px)',
            transform: 'rotate(46deg)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table117),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            117
        </p>
      </Tooltip>
    </Box>

    {/* Table 118 */}
    <Box position="absolute" top="71.9%" left="67.5%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table118 ? (
        getTableInfo(table118)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 118 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={118} UserID={UserID} table={table118}/>
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
            width: '40px',
            height: '40px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table118),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table118),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            118
        </p>
      </Tooltip>
    </Box>


    {/* Table 119 */}
    <Box position="absolute" top="67.8%" left="72.1%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table119 ? (
        getTableInfo(table119)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 119 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={119} UserID={UserID} table={table119}/>
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
            width: '40px',
            height: '40px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table119),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table119),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
            119
        </p>
      </Tooltip>
    </Box>


    {/* Table 120 */}
    <Box position="absolute" top="60.4%" left="77.5%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table120 ? (
        getTableInfo(table120)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 120 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={120} UserID={UserID} table={table120}/>
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
            width: '30px',
            height: '50px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table120),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table120),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
        120
        </p>
      </Tooltip>
    </Box>


    {/* Table 121 */}
    <Box position="absolute" top="50%" left="81.2%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table121 ? (
        getTableInfo(table121)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 121 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={121} UserID={UserID} table={table121}/>
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
            width: '35px',
            height: '35px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table121),
          filter: 'blur(6px)',
          transform: 'rotate(45deg)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table121),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
        121
        </p>
      </Tooltip>
    </Box>


    {/* Table 122 */}
    <Box position="absolute" top="70.5%" left="80.3%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table122 ? (
        getTableInfo(table122)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 122 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={122} UserID={UserID} table={table122}/>
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
            width: '40px',
            height: '40px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table122),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table122),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
        122
        </p>
      </Tooltip>
    </Box>


    {/* Table 123 */}
    <Box position="absolute" top="64.1%" left="87.1%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table123 ? (
        getTableInfo(table123)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 123 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={123} UserID={UserID} table={table123}/>
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
            width: '40px',
            height: '30px',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table123),
            filter: 'blur(6px)',
            transform: 'rotate(143deg)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table123),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
        123
        </p>
      </Tooltip>
    </Box>


    {/* Table 124 */}
    <Box position="absolute" top="80.9%" left="78.5%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table124 ? (
        getTableInfo(table124)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 124 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={124} UserID={UserID} table={table124}/>
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
            width: '120px',
            height: '30px',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table124),
          filter: 'blur(6px)',
          transform: 'rotate(45deg)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table124),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
        124
        </p>
      </Tooltip>
    </Box>


    {/* Table 125 */}
    <Box position="absolute" top="77.8%" left="83.9%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table125 ? (
        getTableInfo(table125)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 125 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={125} UserID={UserID} table={table125}/>
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
            width: '100px',
            height: '30px',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table125),
          filter: 'blur(6px)',
          transform: 'rotate(45deg)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table125),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
        125
        </p>
      </Tooltip>
    </Box>


    {/* Table 126 */}
    <Box position="absolute" top="68.8%" left="90.3%" transform="translate(50%, -50%)" display="flex">
      <Tooltip title={table126 ? (
        getTableInfo(table126)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 126 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={126} UserID={UserID} table={table126}/>
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
            width: '40px',
            height: '30px',
            minWidth: '20%',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table126),
          filter: 'blur(6px)',
          transform: 'rotate(145deg)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table126),
              filter: 'blur(3px)',
            }
          }}
        >
        </Button>
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white', pointerEvents: 'none'}}>
        126
        </p>
      </Tooltip>
    </Box>

    </div>
  );
};

export default FirstFloor;

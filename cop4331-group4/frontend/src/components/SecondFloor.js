import React, {useState, useEffect} from 'react';
import SecondFloorImage from './secondFloorMap.jpg';
import Tooltip from "@mui/material/Tooltip";
import Box from '@mui/material/Box';
import { jwtDecode } from "jwt-decode";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { FormControl, InputLabel, Input, Button} from '@mui/material';
import './MapOverlay.css';



const SecondFloor = () => {
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


  const table201 = tableData && tableData.find(table => table.tableNum === "201");
  const table202 = tableData && tableData.find(table => table.tableNum === "202");
  const table203 = tableData && tableData.find(table => table.tableNum === "203");
  const table204 = tableData && tableData.find(table => table.tableNum === "204");
  const table205 = tableData && tableData.find(table => table.tableNum === "205");
  const table206 = tableData && tableData.find(table => table.tableNum === "206");
  const table207 = tableData && tableData.find(table => table.tableNum === "207");
  const table208 = tableData && tableData.find(table => table.tableNum === "208");
  const table209 = tableData && tableData.find(table => table.tableNum === "209");
  const table210 = tableData && tableData.find(table => table.tableNum === "210");
  const table211 = tableData && tableData.find(table => table.tableNum === "211");
  const table212 = tableData && tableData.find(table => table.tableNum === "212");
  const table213 = tableData && tableData.find(table => table.tableNum === "213");
  const table214 = tableData && tableData.find(table => table.tableNum === "214");
  const table215 = tableData && tableData.find(table => table.tableNum === "215");
  const table216 = tableData && tableData.find(table => table.tableNum === "216");
  const table217 = tableData && tableData.find(table => table.tableNum === "217");
  const table218 = tableData && tableData.find(table => table.tableNum === "218");
  const table219 = tableData && tableData.find(table => table.tableNum === "219");
  const table220 = tableData && tableData.find(table => table.tableNum === "220");
  const table221 = tableData && tableData.find(table => table.tableNum === "221");
  const table222 = tableData && tableData.find(table => table.tableNum === "222");
  const table223 = tableData && tableData.find(table => table.tableNum === "223");
  const table224 = tableData && tableData.find(table => table.tableNum === "224");
  const table225 = tableData && tableData.find(table => table.tableNum === "225");
  const table226 = tableData && tableData.find(table => table.tableNum === "226");
  const table227 = tableData && tableData.find(table => table.tableNum === "227");
  const table228 = tableData && tableData.find(table => table.tableNum === "228");
  const table229 = tableData && tableData.find(table => table.tableNum === "229");
  const table230 = tableData && tableData.find(table => table.tableNum === "230");
  const table231 = tableData && tableData.find(table => table.tableNum === "231");
  const table232 = tableData && tableData.find(table => table.tableNum === "232");
  const table233 = tableData && tableData.find(table => table.tableNum === "233");
  const table234 = tableData && tableData.find(table => table.tableNum === "234");
  const table235 = tableData && tableData.find(table => table.tableNum === "235");
  const table236 = tableData && tableData.find(table => table.tableNum === "236");
  const table237 = tableData && tableData.find(table => table.tableNum === "237");
  const table238 = tableData && tableData.find(table => table.tableNum === "238");
  const table239 = tableData && tableData.find(table => table.tableNum === "239");
  const table240 = tableData && tableData.find(table => table.tableNum === "240");
  const table241 = tableData && tableData.find(table => table.tableNum === "241");
  const table242 = tableData && tableData.find(table => table.tableNum === "242");
  const table243 = tableData && tableData.find(table => table.tableNum === "243");
  const table244 = tableData && tableData.find(table => table.tableNum === "244");
  const table245 = tableData && tableData.find(table => table.tableNum === "245");
  const table246 = tableData && tableData.find(table => table.tableNum === "246");
  const table247 = tableData && tableData.find(table => table.tableNum === "247");
  const table248 = tableData && tableData.find(table => table.tableNum === "248");

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
  

  const [isCreateTableButtonVisible, setIsCreateTableButtonVisible] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'inline-block', border: '2px solid black' }}>
      <img src={SecondFloorImage} alt="Second Floor Map" className='floorMap' style={{ position: 'relative' }}/>

{/* Blurred Overlay for Cafe Area */}
      <div className='overlay' style={{ top: '270px', left: '20px', width: '240px', height: '320px' }}>
        <div className='blurry-background'></div>
        <div className='label'>Cafe - No Study Groups</div>
      </div>

      <div className='overlay' style={{ top: '37px', left: '2px', width: '150px', height: '180px' }}>
        <div className='blurry-background'></div>
        <div className='label'>Printing area</div>
      </div>

      <Box position="absolute" top="22%" left="36.8%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        201
      </div>    
        <Tooltip 
          title={table201 ? (
            getTableInfo(table201)
          ) : (
            <div className='emptyTable'>
              <p style={{ fontSize: '18px' }}>Table 201 is empty</p>
              <CreateTableButton onCreateTable={onCreateTable} tableNum={201} UserID={UserID} table={table201}/>
            </div>
          )}
          PopperProps={{
            sx: {
              backdropFilter: 'blur(5px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            }
          }}
        >
          <Button className='tableButton'
            sx={{
              borderRadius: '0%',
              width: '40px',
              height: '26px',
              minWidth: '20px',
              border: '1px solid white',
              bgcolor: getBackgroundColor(table201),
              filter: 'blur(6px)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table201), 
                filter: 'blur(2px)',
              }
            }}
          >
          </Button>
        </Tooltip>
      </Box>

{/* Table 202 */}
<Box position="absolute" top="23.9%" left="42.8%" transform="translate(50%, -50%) rotate(9deg)" display="flex">
<div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
    202
</div>

  <Tooltip title={table202 ? (
    getTableInfo(table202)
  ) : (
    <div className='emptyTable'>
      <p style={{ fontSize: '18px' }}>Table 202 is empty</p>
      <CreateTableButton onCreateTable={onCreateTable} tableNum={202} UserID={UserID} table={table202}/>
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
        width: '35px',
        height: '28px',
        minWidth: '20px',
        border: '2px solid white',
        bgcolor: getBackgroundColor(table202),
        filter: 'blur(6px)',
        transform: 'rotate(47deg)',
        '&:hover': {
          bgcolor: getBackgroundColorOnHover(table202),
          filter: 'blur(2px)',
        }
      }}
    >
    </Button>
  </Tooltip>
</Box>

      {/* Table 203 */}
      <Box position="absolute" top="29.9%" left="45.6%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        203
      </div>
        <Tooltip title={table203 ? (
          getTableInfo(table203)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 203 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={203} UserID={UserID} table={table203}/>
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
              width: '35px',
              height: '28px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table203),
              filter: 'blur(6px)',
              transform: 'rotate(45deg)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table203), 
              filter: 'blur(2px)',
              }
            }}
          >
          </Button>
        </Tooltip>
      </Box>

      {/* Table 204 */}
      <Box position="absolute" top="29.4%" left="48.9%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        204
      </div>
        <Tooltip title={table204 ? (
          getTableInfo(table204)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 204 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={204} UserID={UserID} table={table204}/>
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
              width: '18px',
              height: '35px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table204), 
              filter: 'blur(6px)',
              transform: 'rotate(135deg)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table204),
              filter: 'blur(2px)',
              }
            }}
          >
          </Button>
        </Tooltip>
      </Box>

      {/* Table 205 */}
      <Box position="absolute" top="25.9%" left="51%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        205
      </div>
        <Tooltip title={table205? (
          getTableInfo(table205)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 205 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={205} UserID={UserID} table={table205}/>
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
              width: '18px',
              height: '35px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table205),
              filter: 'blur(6px)',
              transform: 'rotate(135deg)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table205), 
              filter: 'blur(2px)',
              }
            }}
          >
          </Button>
        </Tooltip>
      </Box>

      {/* Table 206 */}
      <Box position="absolute" top="23.1%" left="52.2%" transform="translate(50%, -50%) rotate(25deg)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        206
      </div>
        <Tooltip title={table206 ? (
          getTableInfo(table206)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 206 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={206} UserID={UserID} table={table206}/>
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
              width: '18px',
              height: '35px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table206),
              filter: 'blur(6px)',
              transform: 'rotate(135deg)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table206),
              filter: 'blur(2px)',
              }
            }}
          >
          </Button>
        </Tooltip>
      </Box>


      {/* Table 207 */}
      <Box position="absolute" top="21%" left="53.5%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        207
      </div>
        <Tooltip title={table207 ? (
          getTableInfo(table207)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 207 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={207} UserID={UserID} table={table207}/>
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
              width: '18px',
              height: '35px',
              minWidth: '20px',
              border: '2px solid white',
              bgcolor: getBackgroundColor(table207),
              filter: 'blur(6px)',
              transform: 'rotate(135deg)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table207), 
              filter: 'blur(2px)',
              }
            }}
          >
          </Button>
        </Tooltip>
      </Box>

      {/* Table 208 */}
      <Box position="absolute" top="19%" left="54.7%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        208
      </div>
        <Tooltip title={table208 ? (
          getTableInfo(table208)
        ) : (
          <div className='emptyTable'>
            <p style={{ fontSize: '18px' }}>Table 208 is empty</p>
            <CreateTableButton onCreateTable={onCreateTable} tableNum={208} UserID={UserID} table={table208}/>
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
              width: '18px',
              height: '35px',
              minWidth: '20px',
              bgcolor: getBackgroundColor(table208),
              filter: 'blur(6px)',
              transform: 'rotate(135deg)',
              '&:hover': {
                bgcolor: getBackgroundColorOnHover(table208), 
              filter: 'blur(2px)',
              }
            }}
          >
          </Button>
        </Tooltip>
      </Box>

      {/* Table 209 */}
    <Box position="absolute" top="15.2%" left="56.5%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        209
      </div>
      <Tooltip title={table209 ? (
        getTableInfo(table209)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 209 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={209} UserID={UserID} table={table209}/>
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
            height: '40px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table209),
            filter: 'blur(6px)',
            transform: 'rotate(140deg)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table209), 
              filter: 'blur(4px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 210 */}
    <Box position="absolute" top="12.8%" left="60%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        210
      </div>
      <Tooltip title={table210 ? (
        getTableInfo(table210)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 210 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={210} UserID={UserID} table={table210}/>
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
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table210), 
            filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table210), 
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/*Table 211 */}
    <Box position="absolute" top="20.1%" left="61.5%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        211
      </div>
      <Tooltip title={table211 ? (
        getTableInfo(table211)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 211 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={211} UserID={UserID} table={table211}/>
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
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table211),
            filter: 'blur(6px)',
            transform: 'rotate(40deg)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table211),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 212 */}
    <Box position="absolute" top="25.4%" left="64.2%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        212
      </div>
      <Tooltip title={table212 ? (
        getTableInfo(table212)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 212 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={212} UserID={UserID} table={table212}/>
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
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table212),
            filter: 'blur(6px)',
            transform: 'rotate(40deg)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table212),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 213 */}
    <Box position="absolute" top="30%" left="69.5%" transform="translate(50%, -50%)" display="flex">
    <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        213
      </div>
      <Tooltip title={table213 ? (
        getTableInfo(table213)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 213 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={213} UserID={UserID} table={table213}/>
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
            bgcolor: getBackgroundColor(table213),
            filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table213),
              filter: 'blur(2px)'
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 214 */}
    <Box position="absolute" top="41%" left="78.9%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        214
      </div>
      <Tooltip title={table214 ? (
        getTableInfo(table214)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 214 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={214} UserID={UserID} table={table214}/>
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
            width: '27px',
            height: '27px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table214),
            filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table214),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 215 */}
    <Box position="absolute" top="41.4%" left="80.8%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        215
      </div>
      <Tooltip title={table215 ? (
        getTableInfo(table215)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 215 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={215} UserID={UserID} table={table215}/>
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
            width: '27px',
            height: '27px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table215),
            filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table215), 
              filter: 'blur(2px)',
            }

          }}
        >
        </Button>
      </Tooltip>
    </Box>

    
    {/* Table 216 */}
    <Box position="absolute" top="42.6%" left="82.8%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        216
      </div>
      <Tooltip title={table216 ? (
        getTableInfo(table216)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 216 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={216} UserID={UserID} table={table216}/>
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
            borderRadius: '50%',
            width: '27px',
            height: '27px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table216), 
            filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table216),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 217 */}
    <Box position="absolute" top="42.2%" left="86.5%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        217
      </div>
      <Tooltip title={table217 ? (
        getTableInfo(table217)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 217 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={217} UserID={UserID} table={table217}/>
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
            borderRadius: '80%',
            width: '36px',
            height: '40px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table217),
            filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table217),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 218 */}
    <Box position="absolute" top="26.8%" left="39.2%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        218
      </div>
      <Tooltip title={table218 ? (
        getTableInfo(table218)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 218 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={218} UserID={UserID} table={table218}/>
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
            borderRadius: '80%',
            width: '30px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table218),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table218),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>


    {/* Table 219 */}
    <Box position="absolute" top="36.5%" left="44.3%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        219
      </div>
      <Tooltip title={table219 ? (
        getTableInfo(table219)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 219 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={219} UserID={UserID} table={table219}/>
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
            borderRadius: '80%',
            width: '30px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table219),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table219),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 220 */}
    <Box position="absolute" top="46.5%" left="49.5%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        220
      </div>
      <Tooltip title={table220 ? (
        getTableInfo(table220)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 220 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={220} UserID={UserID} table={table220}/>
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
            borderRadius: '80%',
            width: '30px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table220),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table220),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 221 */}
    <Box position="absolute" top="46%" left="59.8%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        221
      </div>
      <Tooltip title={table221 ? (
        getTableInfo(table221)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 221 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={221} UserID={UserID} table={table221}/>
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
            borderRadius: '80%',
            width: '23px',
            height: '23px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table221),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table221),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 222 */}
    <Box position="absolute" top="48.2%" left="60.8%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        222
      </div>
      <Tooltip title={table222 ? (
        getTableInfo(table222)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 222 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={222} UserID={UserID} table={table222}/>
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
            borderRadius: '80%',
            width: '23px',
            height: '23px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table222),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table222),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 223 */}
    <Box position="absolute" top="55.8%" left="54.3%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        223
      </div>
      <Tooltip title={table223 ? (
        getTableInfo(table223)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 223 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={223} UserID={UserID} table={table223}/>
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
            borderRadius: '80%',
            width: '23px',
            height: '23px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table223),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table223),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 224 */}
    <Box position="absolute" top="58.8%" left="55.2%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        224
      </div>
      <Tooltip title={table224 ? (
        getTableInfo(table224)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 224 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={224} UserID={UserID} table={table224}/>
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
            borderRadius: '80%',
            width: '23px',
            height: '23px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table224),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table224),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 225 */}
    <Box position="absolute" top="54.8%" left="64%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        225
      </div>
      <Tooltip title={table225 ? (
        getTableInfo(table225)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 225 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={225} UserID={UserID} table={table225}/>
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
            borderRadius: '80%',
            width: '32px',
            height: '32px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table225),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table225),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 226 */}
    <Box position="absolute" top="59.9%" left="57.9%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        226
      </div>
      <Tooltip title={table226 ? (
        getTableInfo(table226)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 226 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={226} UserID={UserID} table={table226}/>
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
            borderRadius: '80%',
            width: '32px',
            height: '32px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table226),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table226),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 227 */}
    <Box position="absolute" top="61.8%" left="61.6%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        227
      </div>
      <Tooltip title={table227 ? (
        getTableInfo(table227)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 227 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={227} UserID={UserID} table={table227}/>
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
            borderRadius: '80%',
            width: '32px',
            height: '32px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table227),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table227),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 228 */}
    <Box position="absolute" top="66.8%" left="59.9%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        228
      </div>
      <Tooltip title={table228 ? (
        getTableInfo(table228)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 228 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={228} UserID={UserID} table={table228}/>
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
            borderRadius: '80%',
            width: '30px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table228),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table228),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 229 */}
    <Box position="absolute" top="62.3%" left="64.6%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        229
      </div>
      <Tooltip title={table229 ? (
        getTableInfo(table229)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 229 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={229} UserID={UserID} table={table229}/>
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
            width: '45px',
            height: '25px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table229),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table229),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 230 */}
    <Box position="absolute" top="68%" left="64.8%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        230
      </div>
     <Tooltip title={table230 ? (
        getTableInfo(table230)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 230 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={230} UserID={UserID} table={table230}/>
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
            width: '45px',
            height: '25px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table230),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table230),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 231 */}
    <Box position="absolute" top="71.8%" left="63.8%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        231
      </div>
      <Tooltip title={table231 ? (
        getTableInfo(table231)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 231 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={231} UserID={UserID} table={table231}/>
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
            width: '55px',
            height: '20px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table231),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table231),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 232 */}
    <Box position="absolute" top="76.8%" left="65%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        232
      </div>
      <Tooltip title={table232 ? (
        getTableInfo(table232)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 232 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={232} UserID={UserID} table={table232}/>
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
            borderRadius: '80%',
            width: '30px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table232),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table232),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 233 */}
    <Box position="absolute" top="52%" left="68.8%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        233
      </div>
      <Tooltip title={table233 ? (
        getTableInfo(table233)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 233 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={233} UserID={UserID} table={table233}/>
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
            borderRadius: '80%',
            width: '32px',
            height: '32px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table233),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table233),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 234 */}
    <Box position="absolute" top="51%" left="72.8%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        234
      </div>
      <Tooltip title={table234 ? (
        getTableInfo(table234)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 234 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={234} UserID={UserID} table={table234}/>
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
            borderRadius: '80%',
            width: '32px',
            height: '32px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table234),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table234),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 235 */}
    <Box position="absolute" top="49.2%" left="74.8%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        235
      </div>
      <Tooltip title={table235 ? (
        getTableInfo(table235)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 235 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={235} UserID={UserID} table={table235}/>
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
            borderRadius: '80%',
            width: '30px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table235),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table235),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 236 */}
    <Box position="absolute" top="51.8%" left="76.7%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        236
      </div>
      <Tooltip title={table236 ? (
        getTableInfo(table236)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 236 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={236} UserID={UserID} table={table236}/>
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
            borderRadius: '80%',
            width: '30px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table236),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table236),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 237 */}
    <Box position="absolute" top="55.8%" left="70.2%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        237
      </div>
      <Tooltip title={table237 ? (
        getTableInfo(table237)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 237 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={237} UserID={UserID} table={table237}/>
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
            borderRadius: '80%',
            width: '30px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table237),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table237),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 238 */}
    <Box position="absolute" top="59.5%" left="69.3%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        238
      </div>
      <Tooltip title={table238 ? (
        getTableInfo(table238)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 238 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={238} UserID={UserID} table={table238}/>
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
            borderRadius: '80%',
            width: '30px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table238),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table238),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 239 */}
    <Box position="absolute" top="63%" left="70.8%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        239
      </div>
      <Tooltip title={table239 ? (
        getTableInfo(table239)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 239 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={239} UserID={UserID} table={table239}/>
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
            borderRadius: '80%',
            width: '30px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table239),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table239),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 240 */}
    <Box position="absolute" top="73.9%" left="68.9%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        240
      </div>
      <Tooltip title={table240 ? (
        getTableInfo(table240)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 240 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={240} UserID={UserID} table={table240}/>
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
            borderRadius: '80%',
            width: '30px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table240),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table240),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 241 */}
    <Box position="absolute" top="76.3%" left="70.9%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        241
      </div>
      <Tooltip title={table241 ? (
        getTableInfo(table241)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 241 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={241} UserID={UserID} table={table241}/>
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
            borderRadius: '80%',
            width: '30px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table241),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table241),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 242 */}
    <Box position="absolute" top="80.5%" left="70.8%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        242
      </div>
      <Tooltip title={table242 ? (
        getTableInfo(table242)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 242 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={242} UserID={UserID} table={table242}/>
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
            borderRadius: '80%',
            width: '30px',
            height: '30px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table242),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table242),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box> 


    {/* Table 243 */}
    <Box position="absolute" top="87.7%" left="69.4%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        243
      </div>
      <Tooltip title={table243 ? (
        getTableInfo(table243)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 243 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={243} UserID={UserID} table={table243}/>
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
            borderRadius: '80%',
            width: '25px',
            height: '25px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table243),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table243),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>

    {/* Table 244 */}
    <Box position="absolute" top="87.7%" left="71.6%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        244
      </div>
      <Tooltip title={table244 ? (
        getTableInfo(table244)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 243 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={244} UserID={UserID} table={table244}/>
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
            borderRadius: '80%',
            width: '25px',
            height: '25px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table244),
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table244),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>


    {/* Table 245 */}
    <Box position="absolute" top="59%" left="78.7%" transform="translate(50%, -50%)" display="flex">
      <div style={{ position: 'absolute', color: 'black', textAlign: 'center', zIndex: 1, fontSize: '13px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white, 0 0 1px white' }}>
        245
      </div>
      <Tooltip title={table245 ? (
        getTableInfo(table245)
      ) : (
        <div className='emptyTable'>
          <p style={{ fontSize: '18px' }}>Table 245 is empty</p>
          <CreateTableButton onCreateTable={onCreateTable} tableNum={245} UserID={UserID} table={table245}/>
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
            height: '55px',
            minWidth: '20px',
            border: '2px solid white',
            bgcolor: getBackgroundColor(table245),
            transform: 'rotate(-7deg)',
          filter: 'blur(6px)',
            '&:hover': {
              bgcolor: getBackgroundColorOnHover(table245),
              filter: 'blur(2px)',
            }
          }}
        >
        </Button>
      </Tooltip>
    </Box>
    </div>
  );
};

export default SecondFloor;

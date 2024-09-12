import React, { useState, useRef, useEffect } from 'react';

function SearchBar() {
    const app_name = 'cop4331-group4-31270b548dd6';
    
    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return `https://${app_name}.herokuapp.com/${route}`;
        } else {        
            return `http://localhost:5001/${route}`;
        }
    }

    const findTable = async (tableName) => {
        try {
            const encodedSearchKey = encodeURIComponent(tableName);
            const response = await fetch(buildPath(`api/search/${encodedSearchKey}`), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
      
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }
          
            const rawData = await response.text();
            const data = JSON.parse(rawData);
            return data;
        } catch (error) {
            setSearchResults(null);
        }
    };

    const [userInput, setInputValue] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [noneFound, setNoneFound] = useState(null);
    const [selectedTable, setSelectedTable] = useState(null);

    const handleUserInput = async (event) => {
        const value = event.target.value;
        setInputValue(value);
    
        try {
            if (value.trim() === "" || userInput === null) {
                setSearchResults(null);
                setNoneFound(null);
                return;
            }
            const result = await findTable(value);
            setSearchResults(result);
            setNoneFound(null);
        } catch (error) {
            setSearchResults(null);
            setNoneFound("none found");
        }
    }
    const handleTableSelect = (tableNum) => {
        setSelectedTable(tableNum);
        window.location.href = '/map';
    };
    const searchResultsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
                setSearchResults(null);
            }
        };

        // Add event listener to detect clicks outside the search results
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex items-center justify-center relative w-[700px] h-[70px] text-black">
            <div className='w-auto'>
                <input 
                    type="text" 
                    placeholder='Search for study group' 
                    className='box-shadow: 2px 3px 28px 1px rgba(0,0,0,0.3) border-2 w-[700px] border-transparent flex text-center p-4 rounded-2xl '
                    onChange={handleUserInput} 
                />
            </div>
            {searchResults && searchResults.length > 0 && (
                <div ref={searchResultsRef} className='max-h-[400px] overflow-y-auto absolute top-full left-0 w-full bg-white bg-opacity-50 rounded-2xl p-4 flex-col mt-[50px] border-4 border-black'>
                    <div className='flex text-left sticky top-0 z-10 bg-darkgrey text-white rounded-xl p-1'>
                            
                        <div className='bg-white bg-opacity-50 rounded-2xl text-sm w-[10%] text-center font-bold m-1 pt-1'> 
                            Table #
                        </div>
                        
                        <div className='flex justify-between text-center w-[55%] text-md font-bold m-1 pt-1'> 
                            <span>Table Title</span>
                        </div>
                        <div className="bg-white bg-opacity-50 text-center rounded-2xl w-[25%] text-sm font-bold m-1 pt-1">
                            <span className='ml-auto'>Subject</span>
                        </div>
                        
                        <div className="bg-white bg-opacity-50 text-center rounded-2xl w-[12%] text-sm font-bold  mr-4 m-1 pt-1">
                            Capacity
                        </div>
                        
                    </div>
                    {searchResults.map((result, index) => (
                        <div key={index} className='flex text-left bg-metgold cursor-pointer hover:bg-gold hover:bg-opacity-40 p-2 m-2 rounded-xl bg-opacity-70'
                            onClick={() => handleTableSelect(result.tableNum)}
                        >
                            
                            <div className='bg-white bg-opacity-50 rounded-2xl text-lg w-[8%] text-center font-bold m-1 p-1'> 
                                {result.tableNum}
                            </div>
                            
                            <div className='flex justify-between text-center w-[55%] text-xl font-bold m-1 p-1'> 
                                <span>{result.title}</span>
                            </div>
                            <div className="bg-white bg-opacity-50 text-center rounded-2xl w-[25%] text-lg font-bold m-1 p-1">
                                <span className='ml-auto'>{result.subject}</span>
                            </div>
                            
                            <div className="bg-white bg-opacity-50 text-center rounded-2xl w-[12%] text-lg font-bold m-1 p-1">
                                {result.currCapacity + ' / ' + result.maxCapacity}
                            </div>
                            
                        </div>
                    ))}
                </div>
            )}


            {userInput !== "" && searchResults && searchResults.length === 0 && (
                <div className='max-h-[300px] overflow-y-auto absolute top-full left-0 w-full bg-white bg-opacity-50 rounded-2xl p-4 flex-col'>
                    <p className='text-center'>Study group not found</p>
                </div>
            )}
        </div>
    );
}

export default SearchBar;

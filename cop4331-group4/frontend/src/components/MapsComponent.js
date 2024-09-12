import React, { useState } from 'react';
import {Tabs} from "./tabs.tsx";
import FirstFloor from './FirstFloor.js';
import SecondFloor from './SecondFloor.js';
import ThirdFloor from './ThirdFloor.js';

function MapsComponent()
{

	

    return(
       

            <div className="tabs-content mt-2">
            
                <Tabs
                    tabs={[
                        { title: "1st Floor", value: "floorOne", source: <FirstFloor/>},
                        { title: "2nd Floor", value: "floorTwo", source: <SecondFloor/>},
                        { title: "3rd Floor", value: "floorThree", source: <ThirdFloor/>},
                        // { title: "4th Floor", value: "floorFour", source: <FourthFloor/>},
                        // { title: "5th Floor", value: "floorFive", source: <FifthFloor/>},
                    ]}
                    containerClassName="custom-container-class"
                    activeTabClassName="custom-active-tab-class"
                    tabClassName="custom-tab-class"
                    contentClassName="custom-content-class"
                />

                </div>
   

    );
}

export default MapsComponent;

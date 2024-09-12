import React from 'react';
import ForumMain from '../components/ForumMain';
import PageTitle from '../components/PageTitle';

import bgImage from '../imgs/BackgroundLarge.jpg';

const ForumPage = () => {
    return(
       
            <div 
                className='bg-cover bg-center h-screen overflow-auto'
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundAttachment: 'fixed', 
                }}>
                <div>
                    <PageTitle />
                </div>
                <div className='p-2'>
                    <ForumMain />
                </div>
            </div>
        
    );
}


export default ForumPage;

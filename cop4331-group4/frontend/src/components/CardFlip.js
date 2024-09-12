import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';


function CardFlip() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCardClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="w-full min-h-screen grid place-content-center">
            <div className='w-[400px] h-[690px] bg-transparent group rounded-3xl perspective-1000'>
                <div className={`relative w-full h-full preserve-3d ${isFlipped ? 'rotate-y-180 h-[490px]' : 'h-[690px]'} duration-500`}>
                    <div className='w-full h-full absolute rounded-3xl overflow-hidden'>
                        <LoginForm onButtonClick={handleCardClick}/>
                    </div>
        
                    <div className='absolute rotate-y-180 w-full h-auto bg-[#0F1823] bg-opacity-95 rounded-3xl overflow-hidden text-neutral-300 space-y-5 backface-hidden'>
                        <SignupForm onButtonClick={handleCardClick}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardFlip;

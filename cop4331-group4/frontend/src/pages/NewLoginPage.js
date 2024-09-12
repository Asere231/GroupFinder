import React from 'react';

import PageTitle from '../components/PageTitle';
import CardFlip from '../components/CardFlip';
import { WavyBackground } from "../components/ui/wavy-background.tsx";

const newLoginPage = () =>
{

    return(
     <WavyBackground>
        <CardFlip />
     </WavyBackground>
    );
};

export default newLoginPage;

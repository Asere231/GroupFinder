import React from 'react';

import PageTitle from '../components/PageTitle';
import CardFlip from '../components/CardFlip';
import { WavyBackground } from "../components/ui/wavy-background.tsx";
import VerificationForm from '../components/VerificationForm.js';

const VerificationPage = () =>
{

    return(
     <WavyBackground>
        <VerificationForm />
     </WavyBackground>
    );
};

export default VerificationPage;

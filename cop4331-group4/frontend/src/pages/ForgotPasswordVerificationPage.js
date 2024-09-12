import React from 'react';

import PageTitle from '../components/PageTitle';
import CardFlip from '../components/CardFlip';
import { WavyBackground } from "../components/ui/wavy-background.tsx";
import VerificationForm from '../components/VerificationForm.js';
import ForgotPasswordVerify from '../components/ForgotPasswordVerify.js';

const ForgotPasswordVerificationPage = () =>
{

    return(
     <WavyBackground>
        <ForgotPasswordVerify />
     </WavyBackground>
    );
};

export default ForgotPasswordVerificationPage;

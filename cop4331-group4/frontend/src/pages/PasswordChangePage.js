import React from 'react';

import PageTitle from '../components/PageTitle.js';
import CardFlip from '../components/CardFlip.js';
import { WavyBackground } from "../components/ui/wavy-background.tsx";
import VerificationForm from '../components/VerificationForm.js';
import PasswordChangeForm from '../components/PasswordChangeForm.js';

const VerificationPage = () =>
{

    return(
     <WavyBackground>
        <PasswordChangeForm />
     </WavyBackground>
    );
};

export default VerificationPage;

import ForgotPasswordForm from "../components/ForgotPasswordForm.js";
import { WavyBackground } from "../components/ui/wavy-background.tsx";
import React from 'react';

const ForgotPasswordPage = () =>
{

    return(
     <WavyBackground>
        <ForgotPasswordForm />
     </WavyBackground>
    );
};

export default ForgotPasswordPage;
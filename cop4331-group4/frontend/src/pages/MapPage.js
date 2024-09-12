import React from 'react';

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/MapsComponent';
import LoginPage from './LoginPage';
import SearchBar from '../components/SearchBar';

const MapPage = () =>
{
    return(
        <div>
            <PageTitle />
            <CardUI />
            
        </div>
    );
}

export default MapPage;

import React from 'react';
import { useCustomContext } from '../../store/CustomContext';
import Footer from '../footer/Footer';
import ConfirmationItem from './ConfirmationItem';

export default function Confirmation() {
    const { userState } = useCustomContext();
    const { user } = userState;

    return (
        <>
        <h3>Please verify your information is correct:</h3>
        <div style={{padding:'20px'}}>
            {Object.keys(user).map(prop => <ConfirmationItem key={`confirm-${prop}`} prop={prop} />)}
        </div>
        <Footer nextTxt="Looks good!" />
        </>
    )
}

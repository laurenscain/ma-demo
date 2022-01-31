import React from 'react';
import { useCustomContext } from '../../store/CustomContext';
import { CHANGE_STEP } from '../../store/Actions';

export default function Footer({nextTxt='Next'}) {
    const { userState, usersDispatch } = useCustomContext();

    return (
        <div className="footer">
            <button onClick={() => usersDispatch({type:CHANGE_STEP, value:userState.currentStep-1})}>Go Back</button>
            <button onClick={() => usersDispatch({type:CHANGE_STEP, value:userState.currentStep+1})} disabled={userState.validating} >{nextTxt}</button>
        </div>
    )
}

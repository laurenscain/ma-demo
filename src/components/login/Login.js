import React from 'react';
import { useCustomContext } from '../../store/CustomContext';
import { CHANGE_STEP } from '../../store/Actions';

export default function Login( ) {
    const { usersDispatch } = useCustomContext();

    return (
        <div className="loginForm">
            <div className="tooltip">
                <button disabled>Create Schedule</button>
                <span className="tooltiptext">Coming Soon!</span>
            </div>
            <button onClick={() => usersDispatch({type:CHANGE_STEP, value:1})}>View/Edit Schedule</button>
        </div>
    )
}

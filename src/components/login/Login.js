import React from 'react';
import { useCustomContext } from '../../store/CustomContext';
import { CHANGE_STEP } from '../../store/Actions';

export default function Login( ) {
    const { usersDispatch } = useCustomContext();

    return (
        <div className="loginForm">
             <button onClick={() => usersDispatch({type:CHANGE_STEP, value:1})}>Create Schedule</button>
                <div className="tooltip">
                <button disabled>View/Edit Schedule</button>
                <span className="tooltiptext">Coming Soon!</span>
            </div>
        </div>
    )
}

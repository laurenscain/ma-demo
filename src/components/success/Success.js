import React from 'react';
import logo from '../../assets/giphy.gif';
import { RESET } from '../../store/Actions';
import { useCustomContext } from '../../store/CustomContext';

export default function Success() {
    const { usersDispatch } = useCustomContext();

    return (
        <div className="successLbl">
            <img src={logo} width="480" height="270" ></img>
            <span>Schedule has been submitted!</span>
            <br />
            <button onClick={() => usersDispatch({type:RESET})}>Create A New Schedule</button>
        </div>
    )
}

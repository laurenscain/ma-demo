import React from 'react';
import logo from '../../assets/giphy.gif';
import { RESET } from '../../store/Actions';
import { useCustomContext } from '../../store/CustomContext';

export default function Success() {
    const { usersDispatch } = useCustomContext();

    return (
        <div className="successLbl">
            <img src={logo} alt="Success!" className='successGif' ></img>
            <span className='successLbl'>Schedule has been submitted!</span>
            <br />
            <button className='successBtn' onClick={() => usersDispatch({type:RESET})}>Create A New Schedule</button>
        </div>
    )
}

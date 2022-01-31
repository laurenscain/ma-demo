import React from 'react';
import { useCustomContext } from '../../store/CustomContext';
import { toPascalCase } from '../../store/constants';
import { CHANGE_USER } from '../../store/Actions';

export default function InputField({name, type}) {

    const { userState, usersDispatch } = useCustomContext();
    const {user} = userState;

    const handleChange = e => {
        usersDispatch({
            type: CHANGE_USER,
            prop: name,
            value:e.target.value
          });
    }

    return (
        <div>
            <span  className="formLabel">{toPascalCase(name)}:</span>
            <input style={{minWidth:'300px'}} type={type} id={name} name={name} value={userState.user[name]} onChange={handleChange} />
            <br />
            <span className="indentedErrorTxt">{userState.errors[name]}</span>
        </div>
    )
}

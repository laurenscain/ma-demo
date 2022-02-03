import React, { useEffect, useState } from 'react';
import InputField from '../inputfield/InputField';
import { useCustomContext } from '../../store/CustomContext';
import Footer from '../footer/Footer';
import { months } from '../../store/constants';
import { CHANGE_USER } from '../../store/Actions';
import moment from 'moment';
import DateRangeOption from '../inputfield/DateRangeOption';
import InputDate from '../inputfield/InputDate';
import { DatePicker } from 'antd';

export default function Form({errors}) {

    const {userState, usersDispatch } = useCustomContext();
    const { user } = userState;
    
    useEffect(() => {
        if(errors){
            Object.keys(errors).forEach(e => {
                let field = document.getElementById(e); 
                field && field.setCustomValidity(errors[e]);
            }); 
        }
    }, [errors])
    

    const handleChange = (val) => {
  
        usersDispatch({
            type: CHANGE_USER,
            prop: 'birthdate',
            value: moment(val).format('MM-DD-YYYY')
        });
    };
    
    const customFormat = value => `${value.format('MM-DD-YYYY')}`;


    return (
        <>
            <InputField type="text" name="name"  />
            
            <br />
            <InputField type="text" name="email" />
            
            <br />
            <div style={{display: 'flex', flexDirection:'row'}}>
                <label  style={{display:'inline-block', minWidth:'80px', marginTop:'4px'}}>Birthdate:</label> 
                <div style={{display: 'flex', flexDirection:'column'}}>
                    <DatePicker allowClear={false} value={user.birthdate && moment(user.birthdate, 'MM-DD-YYYY')} format={customFormat} onChange={handleChange}   />
                    <span className="errorTxt">{userState.errors.birthdate}</span>
                </div>
            </div>
            <br />

            <span>Areas of Study</span><br/>
            <span className="errorTxt">{userState.errors.selectedSchedule}</span>
            <div className='scheduleDiv'>
                {userState.availableSchedule.map(s => <DateRangeOption key={`datecard-${s.name}`} item={s} />)}
            </div>
            <Footer nextTxt="Submit" />
        </>
    )
}

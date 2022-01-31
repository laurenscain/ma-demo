import React, { useEffect, useState } from 'react';
import InputField from '../inputfield/InputField';
import { useCustomContext } from '../../store/CustomContext';
import Footer from '../footer/Footer';
import DateCard from '../inputfield/DateCard';
import { months } from '../../store/constants';
import { CHANGE_USER } from '../../store/Actions';
import moment from 'moment';

export default function Form({errors}) {

    const {userState, usersDispatch } = useCustomContext();
    const { user } = userState;
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [year, setYear] = useState(null);
    
    useEffect(() => {
        if(errors){
            Object.keys(errors).forEach(e => {
                let field = document.getElementById(e); 
                field && field.setCustomValidity(errors[e]);
            }); 
        }
    }, [errors])

    useEffect(() => {
        if(user && user.birthdate) {
            setFromDate(moment(user.birthdate));
        } else {
            //choosing a random date to start
            setMonth('01');
            setDay('01');
            setYear('1980');
        }
    // eslint-disable-line
    }, [])

    useEffect(() => {
        if(user && user.birthdate && !isNaN(user.birthdate)) {
            setFromDate(moment(user.birthdate));
        } 
    // eslint-disable-line
    }, [user])

    useEffect(() => {
        if(`${month}-${day}-${year}` === user.birthdate || !month || !day || !year) return;

        usersDispatch({
            type: CHANGE_USER,
            prop: 'birthdate',
            value: `${month}-${day}-${year}`
        });
    }, [month, day, year])


    const setFromDate = d => {
        setMonth((d.month() < 10 ? '0' : '') + (d.month()+1).toString());
        setDay((d.date() < 10 ? '0' : '') + (d.date()).toString());
        setYear(d.year());
    }

    
    return (
        <>
            <InputField type="text" name="name"  />
            
            <br />
            <InputField type="text" name="email" />
            
            <br />
            <div style={{display: 'flex', flexDirection:'row'}}>
                <label  style={{display:'inline-block', minWidth:'80px'}}>Birthdate:</label> 
                <select onChange={(e) => setMonth(e.target.value)} name="birthdateMonth" >
                    {months.map(m => <option key={`month-${m.value}`} value={m.value} selected={m.value === month}>{m.label}</option>)}
                </select>
                <select onChange={(e) => setDay(e.target.value)} name="birthdateDay" >
                    {Array(31).fill().map((_, idx) => {let d = idx < 9 ? `0${idx + 1}` : (1 + idx); return <option key={`day-${d}`} selected={d === day} value={d}>{d}</option>})}
                </select>
                <select  onChange={(e) => setYear(e.target.value)} name="birthdateYear" >
                    {Array(100).fill().map((_, idx) => {let y = new Date().getFullYear() - idx; return <option key={`year-${y}`} selected={y === year} value={y}>{y}</option>})}
                </select>
            </div>
            <br />

            <span>Areas of Study</span><br/>
            <span className="errorTxt">{userState.errors.selectedSchedule}</span>
            <div style={{marginTop:'20px', width:'100%', display: 'flex', flexDirection:'row', justifyContent:'space-evenly', flexWrap:'wrap'}}>
                {userState.availableSchedule.map(s => <DateCard key={`datecard-${s.name}`} item={s} />)}
            </div>
            <Footer nextTxt="Submit" />
        </>
    )
}

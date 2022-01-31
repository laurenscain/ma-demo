import React, {useState, useEffect } from 'react';
import { useCustomContext } from '../../store/CustomContext';
import { toPascalCase } from '../../store/constants';
import DateCard from '../inputfield/DateCard';

export default function ConfirmationItem({prop}) {
    const { userState } = useCustomContext();
    const { user } = userState;
    const [value, setValue] = useState();


    useEffect(() => {
        if(typeof user[prop] === 'object')
            setValue(user[prop]);
        else
            setValue(user[prop]);
    }, [prop])

    if(typeof value === 'object')
        return (<div><span>Schedule:</span>{value.map(c => <DateCard key={c.name} item={c} editable={false} />)} </div>);
 
    return (<div style={{padding: '0 0 10px 0'}}><span>{`${toPascalCase(prop)}: `}<span>{`${value}`}</span></span></div>)

}
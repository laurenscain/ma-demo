import React, {useState, useEffect } from 'react';
import { useCustomContext } from '../../store/CustomContext';
import { toPascalCase } from '../../store/constants';
import DateCard from '../inputfield/DateCard';
import DateRangeOption from '../inputfield/DateRangeOption';
import moment from 'moment';

export default function ConfirmationItem({prop}) {
    const { userState } = useCustomContext();
    const { user } = userState;
    const [value, setValue] = useState();


    useEffect(() => {
        if(typeof user[prop] === 'object') {
            setValue(user[prop].sort((a, b) =>  moment(a.date.startDate, 'MM-DD-YYYY').isSameOrBefore(moment(b.date.startDate, 'MM-DD-YYYY')) ? -1 : 1));
         }  else
            setValue(user[prop]);
    // eslint-disable-next-line
    }, [prop])

    if(typeof value === 'object')
        return (<div><span>Schedule:</span>{value.map(c => <DateRangeOption key={c.name} item={c} editable={false} />)} </div>);
 
    return (<div style={{padding: '0 0 10px 0'}}><span>{`${toPascalCase(prop)}: `}<span>{`${value}`}</span></span></div>)

}
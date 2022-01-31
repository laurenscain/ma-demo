import React, { useState, useEffect } from 'react';
import { useCustomContext } from '../../store/CustomContext';
import { DatePicker } from 'antd';
import moment from 'moment';
import { CHANGE_STUDY } from '../../store/Actions';

export default function InputDate({name, value, defaultOpen, checkDisabled=false}) {

    const { userState, usersDispatch } = useCustomContext();
    const [minDate, setMinDate] = useState();
    

    useEffect(() => {
        let dates = userState.availableSchedule.filter(s => (s.name === name) ? s.available : null);
        
        /**
         * sorting scheduled periods.
         * ASSUMPTION: end date is always after start date, no 2 periods overlap
         */
        if(dates[0] && dates[0].available){
            let m = dates[0].available.sort((a, b) => moment(a.startDate, "MM-DD-YYYY").isBefore(b.startDate, "MM-DD-YYYY") ? 1 : -1);
        
            //if the first start date is before today, choose today
            let today = moment(new Date());
            if(m && m[0]){
                let minimumDate = moment(m[0].startDate).isBefore(today, "MM-DD-YYYY") ? moment(today, "MM-DD-YYYY") : moment(m[0].startDate, "MM-DD-YYYY");
                console.log('sttig min date', minimumDate)
                console.log(m[0].startDate, moment(m[0].startDate, "MM-DD-YYYY"))
                setMinDate(minimumDate);

                usersDispatch({
                    type: CHANGE_STUDY,
                    field: name,
                    value:moment(minimumDate, "MM-DD-YYYY").format('MM-DD-YYYY')
                });
        }
        }
    // eslint-disable-next-line
    }, [name])
    

    useEffect(() => {
       if(!value || !value.date) return;
       let today = moment(new Date());
       
       let minimumDate = moment(value.date, "MM-DD-YYYY").isBefore(today) ? moment(today, "MM-DD-YYYY") : moment(value.date, "MM-DD-YYYY");
       console.log('setting min date', minimumDate)
       setMinDate(minimumDate);

    }, [value])

    const handleChange = val => {

        if(val)
            usersDispatch({
                type: CHANGE_STUDY,
                field: name,
                value:moment(val).format('MM-DD-YYYY')
            });
    }

    /**
     * want to disable all dates before today, and any date not included in a scheduled period 
     */
    const isDateDisabled = d => {
        let today = new Date();
        if(moment(today, "MM-DD-YYYY").isAfter(d, "MM-DD-YYYY")) return true;

        if(!checkDisabled) return false;

            
        let periods = userState.availableSchedule.filter(s => (s.name === name) ? s.available : null);
        if(periods[0] && periods[0].available){
            let found = periods[0].available.find(p => moment(p.startDate, "MM-DD-YYYY").isSameOrBefore(d, "MM-DD-YYYY") && moment(p.endDate, "MM-DD-YYYY").isSameOrAfter(d, "MM-DD-YYYY"))
            return !found;
        }
     
        return true;
    }
console.log('min date',minDate)
    return (
        <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
            <DatePicker allowClear={false} value={value && value.date !== undefined ? moment(value.date, "MM-DD-YYYY"): minDate ? moment(minDate, "MM-DD-YYYY") : null} open={defaultOpen} onChange={handleChange} disabledDate={isDateDisabled}  />
            
            <span className="errorTxt">{userState.errors[name]}</span>
        </div>
    )
}

import { Radio } from 'antd';
import React from 'react';
import { useCustomContext } from '../../store/CustomContext';
import moment from 'moment';

export default function RangeSelector({name, value}) {
    const {userState, usersDispatch } = useCustomContext();
    const { user } = userState;
    const [disabled, setDisabled] = React.useState(false);

    React.useEffect(() => {
  
      if(user.selectedSchedule) {
          let overlap = user.selectedSchedule.filter(filterDisabledDates);
       
          setDisabled(overlap && overlap.length);
      }
    }, [user, user.selectedSchedule]);

    const filterDisabledDates = (subject) => {
        
      let myStart = moment(value.startDate, 'MM-DD-YYYY');
      let myEnd = moment(value.endDate, 'MM-DD-YYYY');
     
      if(!subject || subject.name === name || !subject.date) return false;
       
        let subjectStart = moment(subject.date.startDate, 'MM-DD-YYYY');
        let subjectEnd = moment(subject.date.endDate, 'MM-DD-YYYY');
       
        let overlap = ((moment(myStart).isSameOrAfter(moment(subjectStart)) && moment(myStart).isSameOrBefore(moment(subjectEnd))) || (moment(myEnd).isSameOrAfter(moment(subjectStart)) && moment(myEnd).isSameOrBefore(moment(subjectEnd))) || (moment(subjectEnd).isSameOrAfter(moment(myStart)) && moment(subjectStart).isSameOrBefore(moment(myEnd))) || (moment(subjectStart).isSameOrAfter(moment(myStart)) && moment(subjectEnd).isSameOrBefore(moment(myEnd))))
        
        return overlap;
    }

    const formatDate = d => {
        return moment(d, 'MM-DD-YYYY').format('MMM DD, YYYY');
    }
    
 
  return <Radio id={name} disabled={disabled} value={value}>{`${formatDate(value.startDate)} to ${formatDate(value.endDate)}`}</Radio>
  
          
}

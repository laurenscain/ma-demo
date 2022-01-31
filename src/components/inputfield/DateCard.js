import React from 'react';
import { useCustomContext } from '../../store/CustomContext';
import InputDate from './InputDate';
import { CHANGE_STUDY } from '../../store/Actions';

export default function DateCard({item, editable=true}) {
    const { name, date } = item;
    const { userState, usersDispatch } = useCustomContext();
    const { selectedSchedule } = userState.user;

    const handleChange = (e) => {
        if(e.target.value)
            usersDispatch({
                type: CHANGE_STUDY,
                field: e.target.value,
                selected: e.target.checked
            });
    }
    
  
    return (
        <div className="dateCard" key={name}>
           {editable && <input type="checkbox" name="areaOfStudy" onChange={handleChange} value={name} checked={selectedSchedule.filter(subject => subject.name === name).length > 0} />}
                <span className="formLabel" style={{minWidth:editable ? '80px' :'120px'}}>{name}</span>
                {editable ? selectedSchedule.filter(subject => subject.name === name).length > 0 && 
                    <InputDate name={name} value={selectedSchedule.find(sub => sub.name === name)} checkDisabled={true} ></InputDate>
                : <span >{date}</span>}
        </div>
    )
}

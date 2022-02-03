import React from 'react';
import { useCustomContext } from '../../store/CustomContext';
import { CHANGE_STUDY } from '../../store/Actions';
import RangeSelector from './RangeSelector';
import { Radio, Space } from 'antd';
import moment from 'moment';

export default function DateRangeOption({item, editable=true}) {
    const { name, date } = item;
    const { userState, usersDispatch } = useCustomContext();
    const { selectedSchedule } = userState.user;
    const [value, setValue] = React.useState();

    const handleChange = (e) => {
        if(e.target.value)
            usersDispatch({
                type: CHANGE_STUDY,
                field: e.target.value,
                selected: e.target.checked
            });
    }

    const onChange = e => {
        if(e.target.value)
            usersDispatch({
                type: CHANGE_STUDY,
                field: e.target.id,
                value: e.target.value
            });
    };

    const formatDate = d => {
        return moment(d, 'MM-DD-YYYY').format('MMM DD, YYYY');
    }


    return (
        <div className="dateCard" key={name}>
           {editable && <input type="checkbox" name="areaOfStudy" onChange={handleChange} value={name} checked={selectedSchedule.filter(subject => subject.name === name).length > 0} />}
                <span className="formLabel" style={{minWidth:editable ? '80px' :'120px'}}>{name}</span>
                {editable ? selectedSchedule.filter(subject => subject.name === name).length > 0 && 
                <Radio.Group onChange={onChange} value={selectedSchedule.find(sub => sub.name === name).date}>
                <Space direction="vertical">
                    {item.available.map(i => <RangeSelector key={`${name}-${i}`} name={name} value={i} checkDisabled={true} ></RangeSelector>)} 
                    </Space></Radio.Group>
                : <span >{`${formatDate(item.date.startDate)} to ${formatDate(item.date.endDate)}`}</span>}
        </div>
    )
}

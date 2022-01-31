import React from 'react';
import { Steps } from 'antd';
import { useCustomContext } from '../../store/CustomContext';
import { CHANGE_STEP } from '../../store/Actions';

const NavItems = [{value:0, title:'Login'}, 
                {value:1, title:'Enter Information'}, 
                {value:2, title:'Confirm'}, , 
                {value:3, title:'Done'}]

export default function Header({currentStep}) {
    const { userState, usersDispatch } = useCustomContext();
    const { Step } = Steps;

    const updateStep = val => {
        if(val < userState.currentStep)
            usersDispatch({type:CHANGE_STEP, value:val})
    }
    return (
        <Steps className="navContainer" size="small" current={userState.currentStep}>
           { NavItems.map(i => <Step key={i.value} onClick={() => updateStep(i.value)} style={{cursor:(i.value <= currentStep)? 'pointer':'default'}} title={i.title} />)}
        </Steps>
    )
}

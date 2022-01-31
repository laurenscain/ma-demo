import 'antd/dist/antd.css';
import './App.css';
import React, { useEffect } from 'react';
import Form from './components/form/Form';
import Header from './components/header/Header';
import CustomContext  from './store/CustomContext';
import Login from './components/login/Login';
import Confirmation from './components/confirmation/Confirmation';
import Success from './components/success/Success';
import { initializeState } from './store/AppReducer';
import { CHANGE_STEP } from './store/Actions';

import { appReducer } from './store/AppReducer';


function App() {
  
  const [userState, usersDispatch ] = React.useReducer(appReducer, {}, initializeState);

  const providerState = {
    userState,
    usersDispatch
  }

  useEffect(() => {
    if(userState.confirmed)
      usersDispatch({type:CHANGE_STEP, value:3})
    else if(userState.valid)
      usersDispatch({type:CHANGE_STEP, value:2})
  }, [userState.valid, userState.confirmed])


  return (
    <CustomContext.Provider value={providerState} >
      <div className='contentDiv' >
        <Header /> 
        {userState.currentStep === 0 && <Login  />}
        {userState.currentStep === 1 && <Form  />}
        {userState.currentStep === 2 && <Confirmation />}
        {userState.currentStep === 3 && <Success />}
      </div>
    </CustomContext.Provider>
  );
}


export default App;

import ValidationRules from "../components/form/ValidationRules";
import { CHANGE_STEP, CHANGE_STUDY, CHANGE_USER, RESET } from '../store/Actions';

const scheduleData = [{
    name: 'Sports',
    available: [{   
        startDate: '07-23-2022', 
        endDate: '08-23-2022'
    },{   
        startDate: '08-26-2022', 
        endDate: '09-26-2022'
    }
    ]
},
{
    name: 'Art',
    available: [{   
        startDate: '05-10-2022', 
        endDate: '06-10-2022'
    },{   
        startDate: '07-11-2022', 
        endDate: '08-11-2022'
    }
    ]
},
{
    name: 'Literature',
    available: [{   
        startDate: '07-11-2022', 
        endDate: '10-11-2022'
    }
    ]
},
{
    name: 'Music',
    available: [{   
        startDate: '06-09-2022', 
        endDate: '07-12-2022'
    },{   
        startDate: '08-09-2022', 
        endDate: '09-09-2022'
    }
    ]
}
];

const initialState = {
    user: {
        name: "",
        email: "",
        birthdate: "",
        selectedSchedule: []
    },
    currentStep: 0,
    errors: {},
    validating: false,
    valid: false,
    confirmed: false,
    availableSchedule: scheduleData
  };

export function initializeState() {
    return Object.assign({}, initialState);
}

export const  appReducer=(state = [], action)=> {
    switch (action.type) {
        case CHANGE_USER:
            
            return {
                ...state,
                user : {...state.user, 
                    [action.prop]: action.value}
              };

        case CHANGE_STUDY:
            let lessItems = state.user.selectedSchedule.filter(s => s.name !== action.field);
           
            if(action.hasOwnProperty('value') || action.selected)
                return {
                    ...state,
                    user: {...state.user, selectedSchedule: lessItems.length > 0 ? [...lessItems, {name:action.field, date:action.value}] : [{name:action.field, date:action.value}]}
                };
            else
                return {
                    ...state,
                    user: {...state.user, selectedSchedule: [...lessItems]}
                };
    
        case CHANGE_STEP:  
            if(action.value === 2) {
                const validationErrors = ValidationRules(state.user);
                
                let valid = (!validationErrors || Object.keys(validationErrors).length === 0);
                return {
                    ...state,
                    errors: validationErrors,
                    validating: false,
                    valid: valid,
                    currentStep: (valid ? 2 : 1)
                };
            }
            return {
                ...state,
                currentStep: action.value,
                confirmed: action.value !== 3 ? false : true
            };

        case RESET:
            return initialState;
        default:
            return state;
    }
}


import moment from 'moment';

export default function ValidationRules(values) {
    let errors = {};

    if(!values.name || values.name === '') {
        errors.name = "Required"
    } else if(values.name.split(' ').length < 2) {
        errors.name = "Both first and last name required";
    }

    if(!values.email || values.email === '') {
        errors.email = "Required"
    } else if (!/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = "You have entered an invalid email"  
    } 
  
    if(!values.birthdate || values.birthdate === '') {
        errors.birthdate = "Please enter your birthdate"
    } else if(moment(values.birthdate, 'MM-DD-YYYY').isSameOrAfter(moment(new Date()))) {
        errors.birthdate = "You were born in the future? That doesn't sound right"
    }
    
    if(!values.selectedSchedule || values.selectedSchedule.length < 1) {
        errors.selectedSchedule = 'Must choose at least one class.'
    } else {
        let invalidDates = values.selectedSchedule.filter(item => !item.date);
        
        if(invalidDates && invalidDates.length > 0)
            errors.selectedSchedule = 'You must choose a time for each subject' 
    }
    
    return errors;
}

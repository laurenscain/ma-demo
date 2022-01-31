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
    }
    
    if(!values.selectedSchedule || values.selectedSchedule.length < 1) {
        errors.selectedSchedule = 'Must choose at least one class.'
    } else if(values.selectedSchedule.length > 1) {
        let dupes = values.selectedSchedule.some((item, index) => values.selectedSchedule.findIndex(i => i.date === item.date) !== index);//values.selectedSchedule.find(i => i.date === item.date) === index});
        
        if(dupes)
            errors.selectedSchedule = 'Classes may not overlap'
    }

    return errors;
}

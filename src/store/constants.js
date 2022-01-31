export const months = [
    {label:'Jan', value:'01'},
    {label:'Feb', value:'02'},
    {label:'Mar', value:'03'},
    {label:'Apr', value:'04'},
    {label:'May', value:'05'},
    {label:'Jun', value:'06'},
    {label:'Jul', value:'07'},
    {label:'Aug', value:'08'},
    {label:'Sept', value:'09'},
    {label:'Oct', value:'10'},
    {label:'Nov', value:'11'},
    {label:'Dec', value:'12'}];

export const toPascalCase = (sentence) => {if(!sentence) return sentence; return sentence
   .split(' ')
   .map(word => word[0]
   .toUpperCase()
   .concat(word.slice(1)))
   .join('');}

import { AbstractControl } from "@angular/forms";

export class CustomValidators {

static Select(domain: string) {

return (control: AbstractControl): { [key: string]: any } | null => {
console.log(control)
// console.log(event)
const language: string = control.value;

if(language == 'select'){
    return {'Select':true}
}else{
    return null;
}
}

}

// -------------------------priyanka-----------------------------
static languageCheck(domain: string) {

    return (control: AbstractControl): { [key: string]: boolean } | null => {
    console.log(control)
    // console.log(event)
    const language: string = control.value;
    // console.log(language)
    var arabicAlphabetDigits = /[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]|[\u0200]|[\u00A0]/g;
    var specialchar = /^[^*|\":<>[\]{}`\\()';@&$a-zA-Z]+$/;
    console.log(specialchar.test(language))
    console.log(arabicAlphabetDigits.test(language))
    
    if(language !== ''){
    if(arabicAlphabetDigits.test(language) && specialchar.test(language)){
    return null;
    }else{
    return {'languageCheck':true};
    }
    }
    }
    
    }
}






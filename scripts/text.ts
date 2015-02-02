module nt {

    export function toLetters(value: string) : string[] {
        return value.split('');
    }

    export function toFirstLetterOrDie(value: string, failure: string) : string  {
        if (value.length > 0) {
            return value.substr(0, 1);
        } else {
            throw new Error(failure + ' Unable to get the first letter. The string is empty.');
        }
    } 
} 
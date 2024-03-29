import { AbstractControl, Validators } from '@angular/forms';

export class CustomValidators {
    public mediaRazoavel(hodometroInicial: number) {
            return (group: AbstractControl): {[key:string]: boolean} | null => {
            const hodometro:number = parseFloat(group.get('hodometro').value)
            const volume:number = parseFloat(group.get('volume').value)
            if (!hodometro || !volume){
                return undefined
            }
            const media = ((hodometro - hodometroInicial) / volume)
            if( media < 0.2 || media > 40 ){
                return { 'mediaInviavel' : true }
            }
            return undefined 
        };
    }
    public emailPattern() {
        return Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    }
}

export default { CustomValidators }
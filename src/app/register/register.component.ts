import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, ValidatorFn} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm

  Users = []
  Username : string = "";
  email :string = "";
  password : string = "";
  passconfirm : string = "";
  
   constructor (formBuilders : FormBuilder){
     this.myForm = formBuilders.group({
       Username : ["",Validators.required],
       email : ["",Validators.email],
       password : ['',Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')],
     });

     const confirmPasswordControl = new FormControl('', {
      validators: sameValueAs(this.myForm, 'password')
    });

    this.myForm.addControl('passconfirm', confirmPasswordControl); 

    function sameValueAs(group: FormGroup, controlName: string): ValidatorFn {
      return (control: FormControl) => {
            const myValue = control.value;
            const compareValue = group.controls[controlName].value;
    
            return (myValue === compareValue) ? null : {valueDifferentFrom:controlName};
    
      };
    }
}

  ngOnInit() {
  }

  submit(){
    this.Users.push({Username:this.Username, email : this.email, password : this.password, passconfirm : this.passconfirm})
   }
}

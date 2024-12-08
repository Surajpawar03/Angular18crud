import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserdataService } from '../service/userdata.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userForm!: FormGroup; 
  
  isEdit: boolean = false; 
  selectedUser: any = null;
  getUserObj:any = localStorage.getItem("userObj");
  ar: any;
  id: any;

  constructor(private fb: FormBuilder,private userdataService: UserdataService,private router:Router) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(''),       
      lastName: new FormControl(''),   
      age: new FormControl('')         
    });
    const userObj = JSON.parse(this.getUserObj);
    console.log("formtest",userObj)
    if(userObj.id){
      this.editUser(userObj)
      console.log("if")
    }else{
      console.log("elsw")
    }
   

    // this.ar.queryParams.subscribe((params: { [key: string]: any }) => {
    //   this.id = params['id']});
    // if (this.id) {
    //   this.editUser(this.getUserObj);
    // }
  }

  

  // Handle form submission
  submit() {
    console.log("formtest",this.getUserObj)
    if (this.userForm.valid) {
      if (this.id) {
        this.userdataService.update(this.id,this.userForm.value).subscribe((res) => {
          this.router.navigate(['']);
        })
      } else {
       
        const newUser = this.userForm.value;
        this.userdataService.addUser(this.userForm.value).subscribe((res) => {
       this.router.navigate([''])
          
        })
      }

      this.userForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
  

  // Example: Populate form for editing a user (use this method where needed)
  editUser(user: any) {
    debugger
    this.isEdit = true;
    this.selectedUser = user;
    // const userq= {
    //   name: 'John',
    //   lastname: 'Doe',
    //   age: 30
    // };
    // this.userForm.patchValue(this.getUserObj)
    this.userForm.patchValue({
      name: user.name,
      lastname: user.lastname,
      age: user.age
    });
  }

  ngOnDestroy() {
    localStorage.removeItem("userObj");

    console.log('foo destroy')
  }
      
}

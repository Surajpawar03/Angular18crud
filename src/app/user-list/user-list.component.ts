import { Component } from '@angular/core';
import { UserdataService } from '../service/userdata.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userList: any;

  constructor(private userdataService: UserdataService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userdataService.getUserList().subscribe((res: any) => {
      this.userList = res;

      console.log('  this.userList ', this.userList )
      
    })
    

  }
  public addUser() {
    this.router.navigate(['add-user'])
  }


  public edit(user: any) {
    console.log("user ",user)
    this.userdataService.setData(user);
    localStorage.setItem("userObj", JSON.stringify(user))
    this.router.navigate(['add-user'], { queryParams: { id: user.id } });
  }

  public delete(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        this.userdataService.delteUser(id).subscribe((res) => {
          this.getUsers();
        })
      }
    });

    
  }
}

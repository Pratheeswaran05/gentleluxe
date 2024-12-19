import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private service:AuthService){}

login(){
console.log()
this.service.getData('userlist').subscribe(res=>{
  console.log(res)
})
}
}
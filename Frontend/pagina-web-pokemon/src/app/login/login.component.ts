import { Component, OnInit } from '@angular/core';
import { NgForm  } from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {Usuario} from "../models/usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private loginService:LoginService) { }
  public usuario:string='';
  public clave:string='';
  public  mensaje:string='';
  public isError=false;

  ngOnInit(): void {
  }
  logIn(formLogin:NgForm)
  {
      if(formLogin.valid)
      {
          event.preventDefault();
          let usu=new Usuario();
          usu.NombreUsuario=this.usuario;
          usu.Clave=this.clave;
         
          this.loginService.ValidarUsuario(usu).subscribe((res:Usuario)=>{
              localStorage.removeItem("token");
              localStorage.setItem("token",JSON.stringify(res.token));
              this.router.navigate(["home"]);
              this.isError=false;
          },error=>{
               this.isError=true;
               this.mensaje="Los datos ingresados son erroneos";
               console.log(error);
               setTimeout(() => {
                 this.isError=false;
               }, 4000);
			   
          })
          
      }
      else
      {
        this.isError=true;
        this.mensaje="No ha ingresado sus credenciales";
        setTimeout(()=>{this.isError=false},4000);

      }
  }
}


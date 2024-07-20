import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EstadosService} from "./services/estados/estados.service";
import {PersonasService} from "./services/personas/personas.service";
import {PaisesService} from "./services/paises/paises.service";
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  personaForm!: FormGroup;
  paises! : any;
  estados! : any;

  constructor(public fb: FormBuilder,
    public estadoService: EstadosService, public paisService: PaisesService,
    public personaService: PersonasService, 

  ){

  }

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      nombre : ["", Validators.required],
      apellido : ["", Validators.required],
      edad : ["", Validators.required],
      pais : ["", Validators.required],
      estado : ["", Validators.required],
    });
    this.paisService.getAllPaises().subscribe(
      resp=>{
        this.paises = resp;
        console.warn("Paises obtenidos", resp);

      }, 
      error=>{console.error(error)});

      

  }

  public cargarEstadosPorId(event:any){
    this.estadoService.getAllEstadosById(event.target.value).subscribe(
      resp=>{
        this.estados = resp;
        console.warn("Estados obtenidos", resp);

      }, 
      error=>{console.error(error)});


  }

  guardar() {
    if (this.personaForm.valid) {
      console.log(this.personaForm.value);
    } else {
      console.log('Form is not valid');
    }
  }


  

}

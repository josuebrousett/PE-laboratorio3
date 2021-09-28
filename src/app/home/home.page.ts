import { Component, OnInit } from '@angular/core';
import { paciente } from '../models/paciente.interface';
import { PacienteService } from '../services/paciente.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  pacienteAll: paciente[];
  constructor(private pacieenteService:PacienteService) {}

  ngOnInit(){
    this.pacieenteService.getPacienteAll().subscribe(res=>{
      console.log("pacientes de mrd", res);
      this.pacienteAll=res;
    })
  }
}

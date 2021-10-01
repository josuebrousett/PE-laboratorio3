import { Component, OnInit } from '@angular/core';
import { paciente } from 'src/app/models/paciente.interface';
import { PacienteService } from 'src/app/services/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation'


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {

  paciente: paciente ={
    nombre: '',
    apellidos:'',
    fecha: '',
    estatura: 0,
    direccion: '',
    ubicacion: '',
    latitud: 0,
    longitud: 0
  };
  pacienteId= null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private pacienteService: PacienteService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.pacienteId=this.route.snapshot.params['id'];
    if(this.pacienteId){
      this.loadPaciente();
    }
  }

  async loadPaciente(){
    const loading = await this.loadingController.create({
      message: 'Cargandoo..'
    });
    await loading.present();
    this.pacienteService.getPaciente(this.pacienteId).subscribe(res=>{
      loading.dismiss();
      this.paciente=res;
    });
  }

  async obtenerCoordenadas(){
    
    const obtenerCoordenada= await Geolocation.getCurrentPosition();
    this.paciente.latitud=obtenerCoordenada.coords.latitude;
    this.paciente.longitud=obtenerCoordenada.coords.longitude;
  }


  async  savePaciente(){
    const loading = await this.loadingController.create({
      message: 'Guardando..'
    });
    await loading.present();
    if(this.pacienteId){
      this.pacienteService.updatePaciente(this.paciente, this.pacienteId).then(()=>{
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
    else{
      this.pacienteService.addPaciente(this.paciente).then(()=>{
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }


  removePaciente(id:string){
    console.log(id);
    this.pacienteService.deletePaciente(id);
  }

  cancelar(){
    this.nav.navigateForward('/');
  }
}

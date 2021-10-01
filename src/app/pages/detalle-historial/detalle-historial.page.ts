import { Component, OnInit } from '@angular/core';
import { historial } from 'src/app/models/historial.interface';
import { HistorialService } from 'src/app/services/historial.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-historial',
  templateUrl: './detalle-historial.page.html',
  styleUrls: ['./detalle-historial.page.scss'],
})
export class DetalleHistorialPage implements OnInit {

  historial: historial ={
    estatura: 0,
    peso:0,
    fecha: '',
    observacion: ''
  };
  historialId= null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private historialService: HistorialService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.historialId=this.route.snapshot.params['id'];
    if(this.historialId){
      this.loadHistorial();
    }
  }

  async loadHistorial(){
    const loading = await this.loadingController.create({
      message: 'Cargandoo..'
    });
    await loading.present();
    this.historialService.getHistorial(this.historialId).subscribe(res=>{
      loading.dismiss();
      this.historial=res;
    });
  }

  async  saveHistorial(){
    const loading = await this.loadingController.create({
      message: 'Guardando..'
    });
    await loading.present();
    if(this.historialId){
      this.historialService.updateHistorial(this.historial, this.historialId).then(()=>{
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
    else{
      this.historialService.addHistorial(this.historial).then(()=>{
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }

  removeHistorial(id:string){
    console.log(id);
    this.historialService.deleteHistorial(id);
  }

  cancelar(){
    this.nav.navigateForward('/');
  }
}

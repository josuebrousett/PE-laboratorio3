import { Component, OnInit } from '@angular/core';
import { historial } from 'src/app/models/historial.interface';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  historialAll: historial[];
  constructor(private historialService:HistorialService) {}

  ngOnInit() {
    this.historialService.getHistorialAll().subscribe(res=>{
      console.log("Historial", res);
      this.historialAll=res;
    })
  }
}

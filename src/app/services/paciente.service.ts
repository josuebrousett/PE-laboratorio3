import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { paciente } from '../models/paciente.interface';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private pacienteCollection: AngularFirestoreCollection<paciente>;
  private paciente: Observable<paciente[]>;

  constructor(db:AngularFirestore) { 
    this.pacienteCollection = db.collection<paciente>('paciente');
    this.paciente=this.pacienteCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data =a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  getPacienteAll(){
      return this.paciente;
  }

  getPaciente(id: string){
    return this.pacienteCollection.doc<paciente>(id).valueChanges();
  }

  updatePaciente(paci:paciente, id: string){
    return this.pacienteCollection.doc(id).update(paci);
  }

  addPaciente(paciente:paciente){
    return this.pacienteCollection.add(paciente);
  }

  deletePaciente(id:string){
    return this.pacienteCollection.doc(id).delete();
  }


}

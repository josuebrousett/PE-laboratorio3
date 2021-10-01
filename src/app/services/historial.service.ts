import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { historial } from '../models/historial.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private historialCollection: AngularFirestoreCollection<historial>;
  private historial: Observable<historial[]>;

  constructor(db:AngularFirestore) {
    this.historialCollection = db.collection<historial>('historial');
    this.historial=this.historialCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data =a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
   }

   getHistorialAll(){
    return this.historial;
  }

  getHistorial(id: string){
    return this.historialCollection.doc<historial>(id).valueChanges();
  }

  updateHistorial(h1:historial, id: string){
    return this.historialCollection.doc(id).update(h1);
  }

  addHistorial(h1:historial){
    return this.historialCollection.add(h1);
  }

  deleteHistorial(id:string){
    return this.historialCollection.doc(id).delete();
}

}

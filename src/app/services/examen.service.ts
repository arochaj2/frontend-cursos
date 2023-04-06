import { Injectable } from '@angular/core';
import { Examen } from '../models/examen';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends CommonService<Examen> {

  protected override baseEndpoint = 'http://localhost:8090/api/cursos';


  constructor(http:HttpClient) {
    super(http);
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonListarComponent } from '../alumnos/common-listar.component';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent extends CommonListarComponent<Curso, CursoService> implements OnInit {




  constructor(service: CursoService) {
    super(service);
    this.titulo = 'listado de cursos';
    this.nombreModel = Curso.name;
   }


}

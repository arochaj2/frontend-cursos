import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  titulo = 'Listado de Alumnos';
  alumnos: Alumno[];

  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[]= [3, 5, 10, 25, 100];


  constructor(private service: AlumnoService) { }

  ngOnInit(): void {

    this.calcularRangos();
  }

  paginar(event: PageEvent):void {
    this.paginaActual = event.pageIndex;
    this,this.totalPorPagina = event.pageSize; 
    this.calcularRangos();

    

  }


private calcularRangos(){

  const paginaActual =this.paginaActual+'';
  const totalPorPagina =this.totalPorPagina+'';

  this.service.listarPaginas(paginaActual, totalPorPagina)
  .subscribe(paginacion => 
    {
      this.alumnos = paginacion.content as Alumno[];
      this.totalRegistros =paginacion.totalElements as number;

    });

}

  public eliminar(alumno: Alumno): void {


    Swal.fire({
      title: 'Cuidado:',
      text: `Seguro que desea eliminar a ${alumno.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

          this.service.eliminar(alumno.id).subscribe(() => {
          //this.alumnos = this.alumnos.filter(a => a !== alumno);
          this.calcularRangos();
          // alert(`alumno ${alumno.nombre} eliminado con éxito`)
          Swal.fire('Eliminado:', `Alumno ${alumno.nombre} eliminado con éxito`, 'success');
        })

      }
    })

/*     if (confirm(`Seguro que desea eliminar a ${alumno.nombre} ?`)) {
      this.service.eliminar(alumno.id).subscribe(() => {
        this.alumnos = this.alumnos.filter(a => a !== alumno);
        // alert(`alumno ${alumno.nombre} eliminado con éxito`)
        Swal.fire('Eliminado:', `Alumno ${alumno.nombre} eliminado con éxito`, 'success');
      })
    } */
  }

}

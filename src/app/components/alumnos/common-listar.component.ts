import { Directive, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Generic } from 'src/app/models/generic';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Directive()
 export abstract class CommonListarComponent<E extends Generic ,S extends CommonService<E>> implements OnInit {

  titulo: string;
  lista: E[];
  protected nombreModel: String;

  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[]= [3, 5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(protected service: S) { }

  ngOnInit(): void {

    this.calcularRangos();
  }

  paginar(event: PageEvent):void {
    this.paginaActual = event.pageIndex;
    this,this.totalPorPagina = event.pageSize; 
    this.calcularRangos();

    

  }


private calcularRangos(){

  this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString())
  .subscribe(paginacion => 
    {
      this.lista = paginacion.content as E[];
      this.totalRegistros =paginacion.totalElements as number;
      this.paginator._intl.itemsPerPageLabel= 'Registros por página:'

    });

}

  public eliminar(e: E): void {


    Swal.fire({
      title: 'Cuidado:',
      text: `Seguro que desea eliminar a ${e.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

          this.service.eliminar(e.id).subscribe(() => {
          //this.alumnos = this.alumnos.filter(a => a !== alumno);
          this.calcularRangos();
          // alert(`alumno ${alumno.nombre} eliminado con éxito`)
          Swal.fire('Eliminado:', `${this.nombreModel} ${e.nombre} eliminado con éxito`, 'success');
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

import { Evento } from './../evento.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventoService } from '../evento.service';


@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.css']
})
export class EventoListaComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Evento>;
  dataSource!: Evento[];

  eventos!: Evento[]
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'tema', 'local', 'data', 'qtdPessoas'];

  constructor(private eventService: EventoService,
              private router: Router) { }

  ngOnInit() {
    this.eventService.read().subscribe(response => {
      this.eventos = response
      console.log(response) 
      this.table.dataSource = this.eventos;
    })
  }

  ngAfterViewInit() {
    this.table.dataSource = this.eventos;
  }
}

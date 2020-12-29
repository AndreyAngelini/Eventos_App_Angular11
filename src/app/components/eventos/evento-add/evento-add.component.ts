import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Evento } from '../evento.model';


@Component({
  selector: 'app-evento-add',
  templateUrl: './evento-add.component.html',
  styleUrls: ['./evento-add.component.css']
})

export class EventoAddComponent implements OnInit {

  _filtroLista: string = '';

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista( value: string ){
    this._filtroLista = value;
    this.eventosF = this._filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  eventosF: any = [];
  eventos: any = [];
  formulario!: FormGroup;
  imagemMargem = 2;
  imagemAltura = 50;
  mostrarImagem = false;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder) {
              }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  ngOnInit() {
      this.getEventos();
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos
    .filter( (resposta: any) => 
              resposta.tema !== null
    )
    .filter( (resposta: any) => 
              resposta.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
}

  getEventos() {
    this.http.get('http://localhost:5000/api/values').subscribe(response =>{
      this.eventos = response;
      this.eventosF = this.eventos;
      console.log(response);
    }, error =>{
      console.log(error);
    });
  }

  onSubmit() {
    alert('Thanks!');
  }
}

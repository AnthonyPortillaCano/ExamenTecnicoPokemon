import { Component, OnInit } from '@angular/core';
import { peticionesServices } from '../services/peticiones.services';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { pokeName } from './pokename';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../css/style.css'],
  providers: [peticionesServices]
})


export class HomeComponent implements OnInit {
  public url: string;
  public buscar: string;
  public pokemones;
  public pokemonesTotal;
  public urlTotal: string;
  public pokemonesLista: Array<pokeName>;
  public pok: pokeName;
  public final: boolean;
  public inicio: boolean;
  private readonly API_URL=environment.webApiPokemon;
  isLoadingResults = true;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    public translate: TranslateService,
    private _peticionesServices: peticionesServices,public router:Router) {
    // inicio de las variables
    this.url = this.API_URL+"/pokemon/listpokemones?limite=50";
  
    this.urlTotal = this.API_URL+"/pokemon/listpokemones?limite=963";
    this.final = false;
    this.inicio = true;

    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
  }

  ngOnInit() {
    
    this._peticionesServices.getPokemon(this.url).subscribe(
      result => {
        this.isLoadingResults = false;
        this.pokemones = result;
       
        if (!this.pokemones) {
          alert('Error al cargar API del servidor');
        }
      },
      error => {
        alert('Error al cargar API del servidor');
      })

    // Peticion a consulta del total de pokemones para el buscador
 
    this._peticionesServices.getPokemon(this.urlTotal).subscribe(
      result => {
        this.isLoadingResults = false;
        this.pokemonesTotal = result;
     
        if (!this.pokemonesTotal) {
          alert('Error al cargar API del servidor');
        }
      },
      error => {
        alert('Error al cargar API del servidor');
      })
  }// Fin del método OnInit

  cargaInicial() {
    this.pokemonesLista = [new pokeName(0, this.pokemonesTotal[0].name)];
    for (let i = 1; i < 50; i++) {
      this.pok = new pokeName(i, this.pokemonesTotal[i].name);
      this.pokemonesLista.push(this.pok);
    }
  }

  nuevaCarga() {
    if (this.inicio) {
      this.cargaInicial();
      this.inicio = false;
    }
    if (this.final) {
      return;
    } else {
      const j = this.pokemonesLista.length;
      let i = j;
      for (; (i < (j + 50)) && (i < 807); i++) {
        this.pok = new pokeName(i, this.pokemonesTotal[i].name);
        this.pokemonesLista.push(this.pok);
      }
      if (i === 807) {
        this.final = true;
      }
    }
  }// Fin funcion Nueva carga

  buscarPokemon() {
    let i = 0;
    for (; i < 807; i++) {
      if (this.pokemonesTotal[i].name.toLowerCase() === this.buscar.toLowerCase()) {
        this._router.navigate(['/pokemondetalle', i + 1, this.buscar.toLowerCase()]);
        break;
      }
    }
    if (i === 807) {
      alert('No se encontro el pokemon: ' + this.buscar);
    }
  }

  onScroll() {
    this.nuevaCarga();
  }
  CerrarSesion()
  {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}

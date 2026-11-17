import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Tatuador {
  nome: string;
  estilos: string;
  instagram: string;
  foto: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  menuOpen = false;
  scrolled = false;

  readonly estilos = ['Geek', 'Blackwork', 'Fullcolor', 'Whipshading', 'Dark', 'Delicadas'];

  readonly tatuadores: Tatuador[] = [
    { nome: 'Jean Szimanski', estilos: 'Geek, Blackwork e Fullcolor', instagram: 'jeanzink_', foto: 'images/jean.jpeg' },
    { nome: 'Maria Quelipe', estilos: 'Geek, Whipshading e Delicadas', instagram: 'marye.ink', foto: 'images/maria.jpeg' },
    { nome: 'Gustavo Campos', estilos: 'Geek, Whipshading e Dark', instagram: 'guszink', foto: 'images/gustavo.jpeg' },
  ];

  ngOnInit(): void {
    console.log('teste');
    const teste = 1;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
  }

  scrollToTatuadores() {
    this.menuOpen = false;
    const element = document.getElementById('tatuadores');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToSobre() {
    this.menuOpen = false;
    const element = document.getElementById('sobre');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

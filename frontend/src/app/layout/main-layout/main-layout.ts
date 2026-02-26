import { Component } from '@angular/core';
import {Navbar} from '../navbar/navbar';
import {RouterOutlet} from '@angular/router';
import {Footer} from '../footer/footer';

@Component({
  selector: 'app-main-layout',
  imports: [
    Navbar,
    RouterOutlet,
    Footer
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  standalone: true,
})
export class MainLayout {}

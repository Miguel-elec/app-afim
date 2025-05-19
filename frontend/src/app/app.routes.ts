import { Routes } from '@angular/router';
import { PaginaDineroComponent } from './paginas/pagina-dinero/pagina-dinero.component';
import { PaginaMenuComponent } from './paginas/pagina-menu/pagina-menu.component';

export const routes: Routes = [
    {path:'', component: PaginaMenuComponent},
    {path: 'cambio',
        loadComponent: () =>
          import('./paginas/pagina-dinero/pagina-dinero.component').then(
            (m) => m.PaginaDineroComponent
          )
    }
];

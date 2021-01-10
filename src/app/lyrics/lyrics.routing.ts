import { Routes } from '@angular/router';
import { LyricDetailsComponent } from './containers/lyric-details/lyric-details.component';


export const LyricsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'detalhe',
        component: LyricDetailsComponent,
        data: { title: 'Detalhe música', breadcrumb: 'Detalhe música' }
      }
    ]
  }
];

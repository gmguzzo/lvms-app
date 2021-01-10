import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LyricDetailsComponent } from './containers/lyric-details/lyric-details.component';
import { RouterModule } from '@angular/router';
import { LyricsRoutes } from './lyrics.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LyricDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LyricsRoutes),
    SharedModule
  ]
})
export class LyricsModule {
}

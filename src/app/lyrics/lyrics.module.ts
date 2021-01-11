import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LyricDetailsComponent } from './containers/lyric-details/lyric-details.component';
import { RouterModule } from '@angular/router';
import { LyricsRoutes } from './lyrics.routing';
import { SharedModule } from '../shared/shared.module';
import { SvguitarchordService } from './services/svguitarchord.service';

@NgModule({
  declarations: [
    LyricDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LyricsRoutes),
    SharedModule
  ],
  providers: [
    SvguitarchordService
  ]
})
export class LyricsModule {
}

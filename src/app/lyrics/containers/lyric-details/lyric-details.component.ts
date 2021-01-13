import { AfterViewInit, Component, OnInit } from '@angular/core';

import ChordSheetJS from 'chordsheetjs';
import { SvguitarchordService } from '../../services/svguitarchord.service';
import { ChordsModel } from '../../../shared/models/chords.model';

@Component({
  selector: 'lyric-details',
  templateUrl: './lyric-details.component.html',
  styleUrls: ['./lyric-details.component.scss']
})
export class LyricDetailsComponent implements OnInit, AfterViewInit {

  chord: string | undefined;
  lyric = lyricDemo;
  listChords: ChordsModel[] = listChords.chords;
  listChordConfig: any[] = [];
  chordElement: any;

  constructor(private svguitarchordService: SvguitarchordService) {
  }

  ngOnInit(): void {
    // https://github.com/martijnversluis/ChordSheetJS
    const parser = new ChordSheetJS.ChordProParser();
    const song = parser.parse(this.lyric);

    const formatter = new ChordSheetJS.HtmlDivFormatter();
    this.chord = formatter.format(song);


    setTimeout(() => {
      this.listChordConfig = this.listChords.map(chordItem => {
        const chordConfig = this.svguitarchordService.formatChord(chordItem);
        const { chordApi, chord } = chordConfig;
        this.svguitarchordService.getChord(chord, chordApi?.id);
        return chordConfig;
      });
    });
  }

  ngAfterViewInit() {
    this.setElementChord();
  }

  listenChords(event: { clientX: any; clientY: any; }) {
    const elementMouseIsOver = document.elementFromPoint(event.clientX, event.clientY);
    if (
      elementMouseIsOver &&
      elementMouseIsOver.classList.contains('chord') &&
      elementMouseIsOver.textContent &&
      elementMouseIsOver.textContent !== '') {

      // tslint:disable-next-line:triple-equals
      const chord = this.listChords.find(f => f.symbol == this.capitalize(elementMouseIsOver.textContent));
      if (chord && chord.id) {
        const { x, y } = elementMouseIsOver.getBoundingClientRect();

        const chordElement = document.getElementById(`chord-${ chord.id }`);
        const html = chordElement?.innerHTML;
        if (html) {
          this.setPositionChord('block', 'fixed', x, (y - 150), html);
        }
        return;
      }
    }
    this.setPositionChord();
  }

  private setPositionChord(display = 'none', position = 'fixed', x = -1, y = -1, html = '') {
    this.chordElement.style.display = display;
    this.chordElement.style.position = position;
    this.chordElement.style.left = x + 'px';
    this.chordElement.style.top = y + 'px';
    this.chordElement.innerHTML = html;
  }

  private setElementChord() {
    const chordElements = document.getElementsByClassName('chord-position');
    // @ts-ignore
    const [chordElement] = chordElements;
    this.chordElement = chordElement;
  }

  private capitalize(txt: string | null, allWords?: boolean): string {
    if (txt) {
      if (allWords) {
        return txt.split(' ').map(word => this.capitalize(word)).join(' ');
      }
      return txt.charAt(0).toUpperCase() + txt.slice(1);
    }
    return '';
  }
}

const listChords: any = {
  chords: [
    {
      id: 719,
      symbol: 'C#m7',
      startFret: 4,
      bar: 12,
      bassString: 2,
      soundedStrings: [3, 4, 5, 6],
      mutedStrings: [1],
      diagram: [[2, 5], [3, 3]]
    }, { id: 546, symbol: 'G', bassString: 1, soundedStrings: [2, 3, 4, 5, 6], diagram: [[2, 2], [3, 1], [3, 6]] }, {
      id: 279,
      symbol: 'D',
      bassString: 3,
      soundedStrings: [4, 5, 6],
      mutedStrings: [1, 2],
      diagram: [[2, 4], [3, 5], [2, 6]]
    }, {
      id: 178,
      symbol: 'C',
      bassString: 2,
      soundedStrings: [3, 4, 5, 6],
      mutedStrings: [1],
      diagram: [[3, 2], [2, 3], [1, 5]]
    }, { id: 4, symbol: 'E', bassString: 1, soundedStrings: [2, 3, 4, 5, 6], diagram: [[1, 4], [2, 2], [2, 3]] }, {
      id: 1,
      symbol: 'A',
      bassString: 2,
      soundedStrings: [3, 4, 5, 6],
      mutedStrings: [1],
      diagram: [[2, 3], [2, 4], [2, 5]]
    }
  ]
};


const lyricDemo = `
Parece est[C#m]ranho
Sinto o m[A7M]undo girando
Ao contr[E]ário
Foi o am[G#m]or que fugiu
Da sua c[C#m]asa
E tudo s[A7M]e perdeu no tempo
É tr[B]iste e real
Eu vejo gente se enfrentando
Por um pr[G#m]ato de comida
[C#m7]Água é saliva

Segunda Parte

[E]Êxtase é alívio

Traz o fim dos dias
E enqu[C#m]anto muitos dormem
[A9]Outros se contorcem
É o fr[E9]io que segue o rumo[G9] [Bb9]
E com ele a sua s[A7M(9)]orte

Pré-Refrão

Você não v[C#m]iu?
Qua[C#m4]ntas vezes já te alert[E9]aram
Que a Terra vai sair de cart[C#m]az
E com [C#m4]ela todos que atuaram?
E [E9]nada muda, é sempre tão igual
A vida segue a sin[C#m]a

Mães enterram f[C#m4]ilhos

Filhos perdem amigos
Am[E9]igos matam primos
Jogam os [C#m]corpos nas margens
Dos rios contaminados
P[C#m4]or gigantes barcos
A[E9]quilo no retrato é
Sangue ou óleo n[C#m7(9)]egro?

Refrão

[A9]Aqui jaz um coraç[B9]ão
Que bat[C#m4]eu na sua porta

Às 7 da manhã
Q[A9]uerendo sua atençã[B9]o
Pedi[C#m4]ndo a esmola de

Um simples amanhã
F[A9]aça uma criança
Pl[B9]ante uma semente
Es[C#m]creva um livro e que
Ele ensine algo de bom
A v[A9]ida é mais que
Um mero po[B9]ema
Ela é real[C#m]

Interlúdio

É pão e c[C#m]irco, veja
A cada d[C#m4(7)]ose destilada
Um acide[E9]nte que alcooliza
O ambi[C#m]ente
Estraga qu[C#m4]alquer face limpa
De bal[E9]ada em balada vale tudo

E as meninas
Das barr[C#m]igas tiram filhos
C[C#m4]alam seus meninos
S[E9]elam seus destinos
São apenas mais d[C#m]uas

Histórias destruídas
Há t[C#m4]antas cores vivas
Caç[E9]ando outras peles
Movimentando a grife

A m[F#7]oda agora é [Dm]
O humilh[A9]ado
Engraxando seu s[C#m]apato

Em qualquer caso é
Ap[E]enas mais um chato

Refrão

[A9]Aqui jaz um coraç[B9]ão
Que bat[C#m4]eu na sua porta

Às 7 da manhã
Q[A9]uerendo sua atençã[B9]o
Pedi[C#m4]ndo a esmola de

Um simples amanhã
F[A9]aça uma criança
Pl[B9]ante uma semente
Es[C#m]creva um livro e que
Ele ensine algo de bom
A v[A9]ida é mais que
Um mero po[B9]ema
Ela é real[C#m]

E a[A7M]inda que a velha
Man[A]ia de sair pela tangente
Sai[C#m]a pela culatra
O que se fa[C#m4]z aqui
Ainda se p[A7M]aga aqui

Deus deu mais que ar
Coração e l[C#m]ar

Deu livre arbítrio
E o que você f[C#m7]az?

A7M  C#m  C#m4(7)`.replace(/[ˆ#]/g, '\\#');

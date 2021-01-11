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
      id: 22621,
      symbol: 'G#m',
      bassString: 2,
      soundedStrings: [3, 4, 5],
      mutedStrings: [1, 6],
      diagram: [[1, 2], [1, 5], [2, 4]]
    },
    {
      id: 22622,
      symbol: 'E',
      bassString: 2,
      soundedStrings: [3, 4, 5],
      mutedStrings: [1, 6],
      diagram: [[1, 2], [1, 5], [2, 4]]
    },
    {
      id: 22623,
      symbol: 'C#m',
      bassString: 2,
      soundedStrings: [3, 4, 5],
      mutedStrings: [1, 6],
      diagram: [[1, 2], [1, 5], [2, 4]]
    },
    {
      id: 22624,
      symbol: 'Abm7',
      bassString: 2,
      soundedStrings: [3, 4, 5],
      mutedStrings: [1, 6],
      diagram: [[1, 2], [1, 5], [2, 4]]
    },
    {
      id: 2262,
      symbol: 'A#maj9',
      bassString: 2,
      soundedStrings: [3, 4, 5],
      mutedStrings: [1, 6],
      diagram: [[1, 2], [1, 5], [2, 4]]
    },
    {
      id: 2245,
      symbol: 'G#m7(9)(11)',
      bar: 22,
      bassString: 1,
      soundedStrings: [2, 3, 4, 5],
      mutedStrings: [6],
      diagram: [[3, 4], [4, 1], [4, 3]]
    }, {
      id: 2244,
      symbol: 'F#m7(9)(11)',
      bassString: 1,
      soundedStrings: [2, 3, 4, 5],
      mutedStrings: [6],
      diagram: [[1, 4], [2, 1], [2, 3]]
    }, {
      id: 2243,
      symbol: 'D#m7(9)(11)',
      startFret: 4,
      bar: 13,
      bassString: 2,
      soundedStrings: [3, 4, 5],
      mutedStrings: [1],
      diagram: [[3, 2], [3, 4], [3, 5]]
    }, {
      id: 2242,
      symbol: 'C#m7(9)(11)',
      bar: 23,
      bassString: 2,
      soundedStrings: [3, 4, 5, 6],
      mutedStrings: [1],
      diagram: [[4, 2], [4, 4], [4, 5]]
    }, {
      id: 2241,
      symbol: 'A#m7(9)(11)',
      startFret: 4,
      bar: 12,
      bassString: 1,
      soundedStrings: [2, 3, 4, 5],
      diagram: [[2, 4], [3, 1], [3, 3]]
    }, {
      id: 2240,
      symbol: 'Gbm7(9)(11)',
      bassString: 1,
      soundedStrings: [2, 3, 4, 5],
      mutedStrings: [6],
      diagram: [[1, 4], [2, 1], [2, 3]]
    }, {
      id: 2239,
      symbol: 'Ebm7(9)(11)',
      startFret: 4,
      bar: 13,
      bassString: 2,
      soundedStrings: [3, 4, 5],
      mutedStrings: [1],
      diagram: [[3, 2], [3, 4], [3, 5]]
    }, {
      id: 2238,
      symbol: 'Dbm7(9)(11)',
      bar: 23,
      bassString: 2,
      soundedStrings: [3, 4, 5, 6],
      mutedStrings: [1],
      diagram: [[4, 2], [4, 4], [4, 5]]
    }, {
      id: 2237,
      symbol: 'Bbm7(9)(11)',
      startFret: 4,
      bar: 12,
      bassString: 1,
      soundedStrings: [2, 3, 4, 5],
      diagram: [[2, 4], [3, 1], [3, 3]]
    }, {
      id: 2236,
      symbol: 'Abm7(9)(11)',
      bar: 22,
      bassString: 1,
      soundedStrings: [2, 3, 4, 5],
      mutedStrings: [6],
      diagram: [[3, 4], [4, 1], [4, 3]]
    }, {
      id: 2235,
      symbol: 'Gm7(9)(11)',
      bar: 12,
      bassString: 1,
      soundedStrings: [2, 3, 4, 5],
      mutedStrings: [6],
      diagram: [[2, 4], [3, 1], [3, 3]]
    }, {
      id: 2234,
      symbol: 'Fm7(9)(11)',
      startFret: 6,
      bar: 13,
      bassString: 2,
      soundedStrings: [3, 4, 5],
      mutedStrings: [1],
      diagram: [[3, 2], [3, 4], [3, 5]]
    }, {
      id: 2233,
      symbol: 'Em7(9)(11)',
      startFret: 5,
      bar: 13,
      bassString: 2,
      soundedStrings: [3, 4, 5],
      mutedStrings: [1],
      diagram: [[3, 2], [3, 4], [3, 5]]
    }, {
      id: 2232,
      symbol: 'Dm7(9)(11)',
      bar: 33,
      bassString: 2,
      soundedStrings: [3, 4, 5, 6],
      mutedStrings: [1],
      diagram: [[5, 2], [5, 4], [5, 5]]
    }, {
      id: 2231,
      symbol: 'Cm7(9)(11)',
      bar: 13,
      bassString: 2,
      soundedStrings: [3, 4, 5, 6],
      mutedStrings: [1],
      diagram: [[3, 2], [3, 4], [3, 5]]
    }, {
      id: 2230,
      symbol: 'Bm7(9)(11)',
      bassString: 2,
      soundedStrings: [3, 4, 5, 6],
      mutedStrings: [1],
      diagram: [[2, 2], [2, 4], [2, 5]]
    }, {
      id: 2229,
      symbol: 'Am7(9)(11)',
      bassString: 1,
      soundedStrings: [2, 3, 4, 5],
      mutedStrings: [6],
      diagram: [[3, 2], [4, 4], [5, 1], [5, 3]]
    }, {
      id: 2228,
      symbol: 'G#m(b6)',
      startFret: 4,
      bar: 11,
      bassString: 1,
      soundedStrings: [2, 3, 4, 5],
      diagram: [[2, 5], [3, 3], [4, 2]]
    }, {
      id: 2227,
      symbol: 'F#m(b6)',
      bar: 21,
      bassString: 1,
      soundedStrings: [2, 3, 4, 5, 6],
      diagram: [[3, 5], [4, 3], [5, 2]]
    }]
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

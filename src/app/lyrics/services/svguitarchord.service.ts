import { Injectable } from '@angular/core';
import { Chord, ChordStyle, FretLabelPosition, SVGuitarChord } from 'svguitar';
import { ChordsModel } from '../../shared/models/chords.model';

@Injectable({
  providedIn: 'root'
})
export class SvguitarchordService {
  settings = settings;

  constructor() {
  }

  public formatChord(chordApi: ChordsModel) {

    // id: 2245,
    // symbol: 'G#m7(9)(11)',
    // bar: [2,2],
    // bassString: 1,
    // startFret: 4,
    // soundedStrings: [2, 3, 4, 5],
    // mutedStrings: [6],
    // diagram: [[3, 4], [4, 1], [4, 3]]

    const { diagram, mutedStrings, soundedStrings, symbol, bar = 1, startFret = 1, bassString = 0 } = chordApi;
    const diagramF = this.chordDiagramOrder(diagram);
    const mutedStringsF = this.chordMutedString(mutedStrings);
    const soundedStringsF = this.chordSoundedStrings(soundedStrings);
    const bassStringF = this.chordBassString(bassString);
    const barF = this.chordBar(bar);


    const chord: Chord = {
      // @ts-ignore
      fingers: [...soundedStringsF, ...bassStringF, ...diagramF, ...mutedStringsF],
      barres: [],
      title: symbol,
      position: startFret
    };

    const [fret, toString] = barF;
    const barres = {
      fromString: this.getMinMax('max', soundedStrings),
      toString,
      fret
    };

    if (bar > 1) {
      chord.barres.push(barres);
    }

    return { chord, chordApi };
  }

  public getChord(chord: Chord, selector?: string | number) {
    setTimeout(() => {
      new SVGuitarChord(`#chord-${ selector }`)
        .chord(chord)
        .configure(this.settings)
        .draw();
    });
  }

  private getReverseNumber(n: number | string) {
    const reverseNumber: any = {
      1: 6,
      2: 5,
      3: 4,
      4: 3,
      5: 2,
      6: 1
    };
    return reverseNumber[n];
  }

  private getMinMax(type: 'min' | 'max', arr: any[] = []) {
    const applyToArray = (func: any, array: any[]) => func.apply(Math, array);
    if (type === 'min') {
      return applyToArray(Math.min, arr);
    }

    if (type === 'max') {
      return applyToArray(Math.max, arr);
    }
  }

  private chordDiagramOrder(diagram: ChordsModel['diagram']) {
    // diagram: [[3, 4], [4, 1], [4, 3]]
    if (diagram) {
      return diagram.map(d => {
        const arr: any = d || [];
        const [stringValue, position] = arr as any;
        return [this.getReverseNumber(position), stringValue];
      });
    }
    return [];
  }

  private chordMutedString(mutedStrings: ChordsModel['mutedStrings'] = []) {
    // mutedStrings: [6],
    return mutedStrings.map(d => {
      return [
        this.getReverseNumber(d),
        'x'
      ];
    });
  }

  private chordSoundedStrings(soundedStrings: ChordsModel['soundedStrings'] = []) {
    // mutedStrings: [6],
    return soundedStrings.map(d => {
      return [
        this.getReverseNumber(d),
        0
      ];
    });
  }

  private chordBassString(bassString: ChordsModel['bassString']) {
    // mutedStrings: 6,
    if (bassString) {
      return [
        [
          this.getReverseNumber(bassString),
          '0'
        ]
      ];
    }
    return [];
  }

  private chordBar(bar: ChordsModel['bar']) {
    // mutedStrings: 62,
    if (bar) {
      const barArr = bar.toString().split('');
      return barArr.map(b => parseInt(b, 10));
    }
    return [0, 0];
  }
}


const settings = {

  /**
   * Select between 'normal' and 'handdrawn'
   */
  style: ChordStyle.normal,

  /**
   * The number of strings
   */
  strings: 6,

  /**
   * The number of frets
   */
  frets: 5,
  /**
   * Default position if no positon is provided (first fret is 1)
   */
  position: 1,

  /**
   * These are the labels under the strings. Can be any string.
   */
  tuning: ['E', 'A', 'D', 'G', 'B', 'E'],

  /**
   * The position of the fret label (eg. "3fr")
   */
  fretLabelPosition: FretLabelPosition.RIGHT,

  /**
   * The font size of the fret label
   */
  fretLabelFontSize: 38,

  /**
   * The font size of the string labels
   */
  tuningsFontSize: 28,

  /**
   * Size of a nut relative to the string spacing
   */
  nutSize: 0.65,

  /**
   * Color of a finger / nut
   */
  nutColor: '#000',

  /**
   * The color of text inside nuts
   */
  nutTextColor: '#FFF',

  /**
   * The size of text inside nuts
   */
  nutTextSize: 22,

  /**
   * stroke color of a nut. Defaults to the nut color if not set
   */
  nutStrokeColor: '#000000',

  /**
   * stroke width of a nut
   */
  nutStrokeWidth: 0,

  /**
   * stroke color of a barre chord. Defaults to the nut color if not set
   */
  barreChordStrokeColor: '#000000',

  /**
   * stroke width of a barre chord
   */
  barreChordStrokeWidth: 0,

  /**
   * Height of a fret, relative to the space between two strings
   */
  fretSize: 1.5,

  /**
   * The minimum side padding (from the guitar to the edge of the SVG) relative to the whole width.
   * This is only applied if it's larger than the letters inside of the padding (eg the starting fret)
   */
  sidePadding: 0.2,

  /**
   * The font family used for all letters and numbers
   */
  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',

  /**
   * Default title of the chart if no title is provided
   */
  title: 'F# minor',

  /**
   * Font size of the title. This is only the initial font size. If the title doesn't fit, the title
   * is automatically scaled so that it fits.
   */
  titleFontSize: 48,

  /**
   * Space between the title and the chart
   */
  titleBottomMargin: 0,

  /**
   * Global color of the whole chart. Can be overridden with more specifig color settings such as
   * @link titleColor or @link stringColor etc.
   */
  color: '#000000',

  /**
   * The background color of the chord diagram. By default the background is transparent.
   * To set the background to transparent either set this to 'none' or undefined
   */
  backgroundColor: 'none',

  /**
   * Barre chord rectangle border radius relative to the nutSize (eg. 1 means completely round endges, 0 means not rounded at all)
   */
  barreChordRadius: 0.25,

  /**
   * Size of the Xs and Os above empty strings relative to the space between two strings
   */
  emptyStringIndicatorSize: 0.6,

  /**
   * Global stroke width
   */
  strokeWidth: 2,

  /**
   * The width of the top fret (only used if position is 1)
   */
  topFretWidth: 10,

  /**
   * The color of the title (overrides color)
   */
  titleColor: '#000000',
  /**
   * The color of the strings (overrides color)
   */
  stringColor: '#000000',
  /**
   * The color of the fret position (overrides color)
   */
  fretLabelColor: '#000000',
  /**
   * The color of the tunings (overrides color)
   */
  tuningsColor: '#000000',
  /**
   * The color of the frets (overrides color)
   */
  fretColor: '#000000',
  /**
   * When set to true the distance between the chord diagram and the top of the SVG stayes the same,
   * no matter if a title is defined or not.
   */
  fixedDiagramPosition: false

};

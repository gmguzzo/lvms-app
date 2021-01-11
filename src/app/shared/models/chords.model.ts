import { FingerOptions } from 'svguitar';

export interface ChordsModel {
  id?: number | undefined;
  symbol?: string | undefined;
  startFret?: number | undefined;
  bassString?: number | undefined;
  soundedStrings?: number[] | undefined;
  mutedStrings?: number[] | undefined;
  diagram?: Finger;
  bar?: number | undefined;
}


export declare type SilentString = 'x';
export declare type OpenString = 0;
export declare type Finger = [number, number | OpenString | SilentString, (string | FingerOptions)?];

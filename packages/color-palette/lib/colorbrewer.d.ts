/**
    ColorBrewer colors for chroma.js

    Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
    Pennsylvania State University.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software distributed
    under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
    CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
 */
declare const _colorbrewer: {
    OrRd: string[];
    PuBu: string[];
    BuPu: string[];
    Oranges: string[];
    BuGn: string[];
    YlOrBr: string[];
    YlGn: string[];
    Reds: string[];
    RdPu: string[];
    Greens: string[];
    YlGnBu: string[];
    Purples: string[];
    GnBu: string[];
    Greys: string[];
    YlOrRd: string[];
    PuRd: string[];
    Blues: string[];
    PuBuGn: string[];
    Viridis: string[];
    Spectral: string[];
    RdYlGn: string[];
    RdBu: string[];
    PiYG: string[];
    PRGn: string[];
    RdYlBu: string[];
    BrBG: string[];
    RdGy: string[];
    PuOr: string[];
    Set2: string[];
    Accent: string[];
    Set1: string[];
    Set3: string[];
    Dark2: string[];
    Paired: string[];
    Pastel2: string[];
    Pastel1: string[];
    EchartThemeR6C1: string[];
    DataVizSet1: string[];
};
declare type IColorBrewer_ = {
    readonly [K in keyof typeof _colorbrewer]: readonly string[];
};
export interface IColorBrewer extends IColorBrewer_ {
    readonly [K: string]: readonly string[];
}
export declare const colorbrewer: IColorBrewer;
export default colorbrewer;

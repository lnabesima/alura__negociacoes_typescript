import { Imprimivel } from '../utils/imprimivel.js';
import { Comparável } from './comparavel.js';

export interface Modelo<T> extends Imprimivel, Comparável<T> {}

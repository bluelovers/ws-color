/**
 * Created by user on 2020/6/17.
 */
import { IInterpolationMode } from '../types';
declare function splitModeChannel<T extends IInterpolationMode>(mc: string): [T, string, number | -1];
export default splitModeChannel;

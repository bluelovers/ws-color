import type from './type';

import limit from './limit';

import clip_rgb from './clip_rgb';

import unpack from './unpack';

import last from './last';

export {
	clip_rgb,
	limit,
	type,
	unpack,
	last,
}

export const PI = Math.PI;

export const TWOPI = PI * 2;
export const PITHIRD = PI / 3;
export const DEG2RAD = PI / 180;
export const RAD2DEG = 180 / PI;

export default {
	clip_rgb,
	limit,
	type,
	unpack,
	last,
	PI,
	TWOPI,
	PITHIRD,
	DEG2RAD,
	RAD2DEG,
}



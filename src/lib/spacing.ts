import {
	calculateSpaceScale,
	type UtopiaSpaceScale,
	type UtopiaSize,
} from "utopia-core";
import { pandaToken, extendedLabel } from "./utils";
import type {CreateSpacingScaleOptions, UtopiaLabelStyle} from "../options";

const extendedPairLabel = (pair: string) => {
	let [fromLabel, toLabel] = pair.split("-");
	const extendedLabels = {
		s: 'sm',
		m: 'md',
		l: 'lg',
		base: 'md'
	}

	fromLabel = extendedLabels[fromLabel as keyof typeof extendedLabels] ?? fromLabel;
	toLabel = extendedLabels[toLabel as keyof typeof extendedLabels] ?? toLabel;
	return `${fromLabel}-${toLabel}`;
}

const sizeToken = (size: Pick<UtopiaSize, 'label' | 'clamp'>, labelStyle: UtopiaLabelStyle, extend?: boolean) => {
	switch(labelStyle) {
		case 'tshirt':
			return pandaToken(extend ? extendedLabel(size.label) : size.label, size.clamp);
		case 'tailwind':
			return pandaToken(extendedLabel(size.label, true), size.clamp);
		default:
			return pandaToken(size.label, size.clamp);
	}
}

const pairToken = (pair: Pick<UtopiaSize, 'label' | 'clamp'>, labelStyle: UtopiaLabelStyle, extend?: boolean) => {
	switch(labelStyle) {
		case 'tshirt':
			return pandaToken(extend ? extendedPairLabel(pair.label) : pair.label, pair.clamp);
		case 'tailwind':
			return pandaToken(extendedPairLabel(pair.label), pair.clamp);
		default:
			return pandaToken(pair.label, pair.clamp);
	}
}


export const createSpaceScaleTokens = (options: CreateSpacingScaleOptions) => {
	const { labelStyle = 'utopia', longerShirtLabels = false, ...rest } = options;
	const spaceScale: UtopiaSpaceScale = calculateSpaceScale(rest);
	const sizesTokens = spaceScale.sizes.reduce(
		(acc, size) =>
			Object.assign(acc, sizeToken(size, labelStyle, longerShirtLabels)),
		{},
	);
	const oneUpPairsTokens = spaceScale.oneUpPairs.reduce(
		(acc, size) =>
			Object.assign(acc, pairToken(size, labelStyle, longerShirtLabels)),
		{},
	);
	const customPairsTokens = spaceScale.customPairs.reduce(
		(acc, size) =>
			Object.assign(acc, pairToken(size, labelStyle, longerShirtLabels)),
		{},
	);
	return Object.assign({}, sizesTokens, oneUpPairsTokens, customPairsTokens);
};

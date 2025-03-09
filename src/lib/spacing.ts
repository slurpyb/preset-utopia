import {
	calculateSpaceScale,
	type UtopiaSpaceScale,
	type UtopiaSize,
} from "utopia-core";
import { upgradeShirtKey } from "./utils";
import type { CreateSpacingScaleOptions } from "../options";
const transformSize = (size: UtopiaSize, longerLabel?: boolean) => ({
	[longerLabel ? upgradeShirtKey(size.label) : size.label]: {
		value: size.clamp,
	},
});

export const createSpaceScaleTokens = (options: CreateSpacingScaleOptions) => {
	const spaceScale: UtopiaSpaceScale = calculateSpaceScale(options);
	const sizesTokens = spaceScale.sizes.reduce(
		(acc, size) =>
			Object.assign(acc, transformSize(size, options.longerShirtLabels)),
		{},
	);
	const oneUpPairsTokens = spaceScale.oneUpPairs.reduce(
		(acc, size) =>
			Object.assign(acc, transformSize(size, options.longerShirtLabels)),
		{},
	);
	const customPairsTokens = spaceScale.customPairs.reduce(
		(acc, size) =>
			Object.assign(acc, transformSize(size, options.longerShirtLabels)),
		{},
	);
	return Object.assign({}, sizesTokens, oneUpPairsTokens, customPairsTokens);
};

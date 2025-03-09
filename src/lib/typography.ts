import { calculateTypeScale, type UtopiaStep } from "utopia-core";
import { upgradeShirtKey } from "./utils";
import type { CreateTypeScaleOptions, UtopiaLabelStyle } from "../options";

const transformStep = (
	step: UtopiaStep,
	labelStyle?: UtopiaLabelStyle,
	longerLabel?: boolean,
) => ({
	[labelStyle === "tshirt" && longerLabel
		? upgradeShirtKey(step.label)
		: step.label]: { value: step.clamp },
});

export const createTypeScaleTokens = (options: CreateTypeScaleOptions) => {
	return calculateTypeScale(options).reduce(
		(acc, step) =>
			Object.assign(
				acc,
				transformStep(step, options.labelStyle, options.longerShirtLabels),
			),
		{},
	);
};
//
// createTypeScaleTokens({
//     minFontSize: 12,
//     maxFontSize: 24,
//     minWidth: 320,
//     maxWidth: 1440,
//     positiveSteps: 5,
//     negativeSteps: 5,
//     minTypeScale: 1.2,
//     maxTypeScale: 1.5,
//     labelStyle: 'tshirt',
// });

import { calculateTypeScale, type UtopiaStep } from "utopia-core";
import {extendedLabel, pandaToken } from "./utils";
import type { CreateTypeScaleOptions, UtopiaLabelStyle } from "../options";

const fontToken = (step: Pick<UtopiaStep, 'label' | 'clamp'>, labelStyle: UtopiaLabelStyle, extend?: boolean) => {
	switch(labelStyle) {
		case 'tshirt':
			return pandaToken(extend ? extendedLabel(step.label) : step.label, step.clamp);
		case 'tailwind':
			return pandaToken(step.label, step.clamp);
		default:
			return pandaToken(step.label, step.clamp);
	}
}

export const createTypeScaleTokens = (options: CreateTypeScaleOptions) => {
	const { labelStyle = 'utopia', longerShirtLabels = false, ...rest } = options;
	return calculateTypeScale({labelStyle, ...rest}).reduce(
		(acc, step) =>
			Object.assign(
				acc,
				fontToken(step, labelStyle, longerShirtLabels),
			),
		{},
	);
};

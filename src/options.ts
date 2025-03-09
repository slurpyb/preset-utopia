import type { UtopiaSpaceConfig, UtopiaTypeConfig } from "utopia-core";

export type UtopiaRelativeTo = "viewport" | "container" | "viewport-width";
export type UtopiaLabelStyle = "utopia" | "tailwind" | "tshirt";

export type CreateTypeScaleOptions = UtopiaTypeConfig & {
	longerShirtLabels?: boolean;
};
export type CreateSpacingScaleOptions = UtopiaSpaceConfig & {
	labelStyle?: UtopiaLabelStyle;
	longerShirtLabels?: boolean;
};
export interface UtopiaPresetOptions {
	minFontSize?: number;
	maxFontSize?: number;
	minWidth?: number;
	maxWidth?: number;
	minTypeScale?: number;
	maxTypeScale?: number;
	customSizes?: string[];
	positiveSteps?: number;
	negativeSteps?: number;
	positiveSpacingSteps?: number[];
	negativeSpacingSteps?: number[];
	labelStyle?: UtopiaLabelStyle;
	longerShirtLabels?: boolean;
}

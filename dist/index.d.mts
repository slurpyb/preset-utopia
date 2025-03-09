import { Preset } from '@pandacss/types';

type UtopiaLabelStyle = "utopia" | "tailwind" | "tshirt";
interface UtopiaPresetOptions {
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

declare function createPreset(options?: UtopiaPresetOptions): Promise<Preset>;

export { type UtopiaPresetOptions, createPreset as createUtopiaPreset, createPreset as default };

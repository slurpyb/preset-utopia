export const pandaToken = (label: string, clamp: string) => ({[label]: {value: clamp}})

export const extendedLabel = (label: string, tw?: boolean) => {
	switch (label) {
		case "s":
			return "sm";
		case "m":
			return "md";
		case "l":
			return "lg";
		case "base":
			return tw ? label : "base";
		default:
			return label;
	}
}

export const upgradeShirtKey = (key: string) => {
	switch (key) {
		case "s":
			return "sm";
		case "m":
			return "md";
		case "l":
			return "lg";
		default:
			if (key.startsWith("s-")) {
				return `sm-${key.slice(2)}`;
			}
			if (key.startsWith("m-")) {
				return `md-${key.slice(2)}`;
			}
			if (key.startsWith("l-")) {
				return `lg-${key.slice(2)}`;
			}
			return key;
	}
};

# Preset Utopia
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Further Reading & Tips](#further-reading--tips)
- [Attributions / Acknowledgements](#attributions--acknowledgements)
- [Contributing](#contributing)
- [License](#license)

PandaCSS preset for utopia.fyi / utopia-core set of tools. Creates font-size and spacing tokens via utopia-core package.

## Installation

Install with your package manager of choice.

```bash
npm install @slurpyb/preset-utopia
pnpm install @slurpyb/preset-utopia
yarn install @slurpyb/preset-utopia

```

Include the preset creation function in your PandaCSS configuration.

```typescript
/* panda.config.ts */
import {defineConfig} from '@pandacss/dev';
import { createUtopiaPreset } from '@slurpyb/preset-utopia';


export default defineConfig({
    presets: [
        /* Make sure to include the panda presets if you want to retain all default features. eg. @pandacss/preset-panda */
        createUtopiaPreset(),       /* Options are not required but highly recommended! */
    ],

    /* rest of your config */
    /* ... */

})


```
## Usage

### Generated tokens
You will get tokens such as...

#### Font Sizes
```json
{
    "fontSizes.2xl": {
        "value": "clamp(2.3686rem, 1.4815rem + 4.4357vw, 5.03rem)",
        "variable": "var(--font-sizes-2xl)"
    },
    "fontSizes.xl": {
        "value": "clamp(1.7769rem, 1.3329rem + 2.2198vw, 3.1088rem)",
        "variable": "var(--font-sizes-xl)"
    },
    "fontSizes.lg": {
        "value": "clamp(1.333rem, 1.1369rem + 0.9806vw, 1.9214rem)",
        "variable": "var(--font-sizes-lg)"
    },
    "fontSizes.md": {
        "value": "clamp(1rem, 0.9375rem + 0.3125vw, 1.1875rem)",
        "variable": "var(--font-sizes-md)"
    },
    "fontSizes.sm": {
        "value": "clamp(0.7339rem, 0.7556rem + -0.0271vw, 0.7502rem)",
        "variable": "var(--font-sizes-sm)"
    },
    "fontSizes.xs": {
        "value": "clamp(0.4536rem, 0.5992rem + -0.182vw, 0.5628rem)",
        "variable": "var(--font-sizes-xs)"
    },
    "fontSizes.2xs": {
        "value": "clamp(0.2803rem, 0.4695rem + -0.2364vw, 0.4222rem)",
        "variable": "var(--font-sizes-2xs)"
    }
}
```

#### Spacing
```json
{
    "spacing.sm": {
        "value": "clamp(1rem, 0.9375rem + 0.3125vw, 1.1875rem)",
        "variable": "var(--spacing-sm)"
    },
    "spacing.md": {
        "value": "clamp(1.5rem, 1.3958rem + 0.5208vw, 1.8125rem)",
        "variable": "var(--spacing-md)"
    },
    "spacing.lg": {
        "value": "clamp(3rem, 2.8125rem + 0.9375vw, 3.5625rem)",
        "variable": "var(--spacing-lg)"
    },
    "spacing.xl": {
        "value": "clamp(4.5rem, 4.2083rem + 1.4583vw, 5.375rem)",
        "variable": "var(--spacing-xl)"
    },
    "spacing.2xl": {
      "value": "clamp(6rem, 5.625rem + 1.875vw, 7.125rem)",
      "variable": "var(--spacing-2xl)"
    }
}
```

Spacing size steps
```json
{
    "spacing.sm-md": {
        "value": "clamp(1rem, 0.7292rem + 1.3542vw, 1.8125rem)",
        "variable": "var(--spacing-sm-md)"
    },
    "spacing.md-lg": {
        "value": "clamp(1.5rem, 0.8125rem + 3.4375vw, 3.5625rem)",
        "variable": "var(--spacing-md-lg)"
    }
}
```

Custom spacing size steps
```json
{
    "spacing.xs-lg": {
        "value": "clamp(0.5rem, -0.5208rem + 5.1042vw, 3.5625rem)",
        "variable": "var(--spacing-xs-lg)"
    },
    "spacing.2xl-6xl": {
        "value": "clamp(6rem, 3.25rem + 13.75vw, 14.25rem)",
        "variable": "var(--spacing-2xl-6xl)"
    }
}
```

```tsx
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
// 
<Stack gap='sm-md'>
    <h1 class={css({fontSize: '2xl'})}>Hello World</h1>
    <p class={css({fontSize: 'sm'})}>This is a paragraph</p>
</Stack>
```

### Available Options

```typescript

    export interface UtopiaPresetOptions {
        minFontSize?: number;                   /* Font size (px) at lowest end of viewport (minWidth). Default: 16 */
        maxFontSize?: number;                   /* Font size (px) at highest end of viewport (maxWidth). Default: 19 */
        minWidth?: number;                      /* Minimum viewport width in px. Default: 320 */
        maxWidth?: number;                      /* Maximum viewport width in px. Default: 1280 */
        minTypeScale?: number;                  /* Type scale at lowest end of viewport (minWidth). Default: 1.125  */
        maxTypeScale?: number;                  /* Type scale at highest end of viewport (maxWidth). Default: 1.333 */
        customSizes?: string[];                 /* Create custom space pairs. NOTE: must use utopia's tshirt labelling style (e.g. s-l, m-xl). If tailwind labelStyles are applied, this transformation is done AFTER creating the clamps. Default: [] */
        positiveSteps?: number;                 /* Set the number of positive steps. Default: 11  */
        negativeSteps?: number;                 /* Set the number of positive steps. Default: 4  */
        positiveSpacingSteps?: number[];        /* Positive multipliers (n=positiveSteps). e.g. [1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5] */
        negativeSpacingSteps?: number[];        /* Negative multipliers (n=negativeSteps). Move backwards from 0. e.g. [0.5, 0.25, 0.125] */
        labelStyle?: UtopiaLabelStyle;          /* Label style for generated tokens. Can be 'tshirt', 'tailwind', or 'utopia. Default: 'tshirt' (recommended) */
        longerShirtLabels?: boolean;            /* By default, the small, medium and large labels are 's', 'm', and 'l'. Set this to true to make them 'sm', 'md', and 'lg'. Useful for compatibility with other presets and libraries (e.g. park-ui). Default: false  */
    }

```

## Further Reading & Tips
- This preset basically wraps the utopia-core package. For more information on how to use the core package, please refer to the [utopia-core documentation](https://github.com/trys/utopia-core).
- The [Utopia](https://utopia.fyi) website provides a great playground to test you values and see how they look. The [blog](**https://utopia.fyi/blog) has some excellent write ups and guides on the system and how to use it effectively.


## Attributions / Acknowledgements
- [Segun Adebayo](https://adebayosegun.com) for creating the [PandaCSS](https://pandacss.dev) framework.
- [Trys Mudford](https://twitter.com/trysmudford) & [James Gilyead](https://www.hustlersquad.net/) for creating the Utopia system & [utopia-core](https://github.com/trys/utopia-core) package.
- [@milandekruijf](https://github.com/milandekruijf) for creating some panda presets I referenced while creating this preset.

## TODO
- [ ] Add tests
- [ ] Add more examples
- [ ] Allow users to create preset via Utopia.fyi URL (e.g. ```https://utopia.fyi/type/calculator?c=320,18,1.2,1240,20,1.25,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12```)
- [ ] Forward WCAG compliance warnings to user

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
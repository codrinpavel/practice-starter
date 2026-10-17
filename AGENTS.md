# Agent instructions

## Project structure

- All source code lives in `src`.
- The project uses Liquid templates, SCSS, vanilla JavaScript, Lenis, and custom icons.
- A website module normally consists of exactly one Liquid file and one SCSS file:
  - `src/includes/modules/<module-name>.liquid`
  - `src/assets/sass/03.modules/_<module-name>.scss`
- Register each module stylesheet in `src/assets/sass/03.modules/index.scss`. Do not import styles from a Liquid or Markdown template.
- Do not add JavaScript, TypeScript, JSON configuration, helper files, or extra stylesheets for a module unless explicitly requested.
- Do not use inline styles, except when setting a CSS custom property for an element, such as `style="--index: 1"`.

## Skills

- When the user supplies HTML and CSS to convert into a project module, follow `.codex/skills/refactor-module/SKILL.md`.
- When the user supplies design screenshots to guide a module, follow `.codex/skills/design-module/SKILL.md`.
- Follow the applicable skill alongside these project instructions. The skill governs its workflow; this file governs project implementation.

## Module files and integration

- If a module name already exists and the user requests another variant, add a numbered suffix, such as `hero-05`.
- When revising or rerunning an existing module, update its current files. Preserve manual changes unless they conflict with the request.
- If the user specifies a target page, integrate the module there. Otherwise, create the module and register its stylesheet without changing page content. Report the Liquid include syntax.
- Update affected includes and the SCSS index when needed.
- Before deleting an asset, check whether other source files reference it. Remove only assets used exclusively by the module being changed.

## Design system

- Never create or modify design tokens. Do not change `src/assets/sass/05.site/_tokens.scss`.
- Inspect and reuse the existing system in:
  - `src/assets/sass/05.site/_tokens.scss`
  - `src/assets/sass/05.site/_props.scss`
  - `src/assets/sass/05.site/_fonts.scss`
  - `src/assets/sass/05.site/_typography.scss`
  - `src/assets/sass/mixins/`
- Express existing design tokens as CSS variables in module styles.
- Do not invent colors, font families, font sizes, font weights, line heights, spacing, gaps, padding, margins, borders, radii, shadows, easings, breakpoints, container widths, button styles, CSS custom properties, or SCSS tokens.
- Use the closest established token when an exact match is unavailable. Briefly report any material visual compromise.
- Existing size tokens may be combined with `calc()`, including negative values.
- Only when existing sizes and their combinations cannot reasonably express a required dimension, consider the project's `fluid()` function in `src/assets/sass/mixins/_fluid.scss`. Do not use it to introduce a new design scale.
- Use the existing easing values in `_props.scss` when the task calls for transitions.
- Before making a new button or link style, inspect the components registered in `src/assets/sass/02.components/index.scss`.

## Layout and responsive styling

- Build mobile first and make modules usable at the project's existing breakpoints.
- Prefer `.wrapper` from `src/assets/sass/02.components/_wrapper.scss` for content containers.
- Prefer `.columns` and the project's column utilities from `src/assets/sass/01.base/_columns.scss` for column layouts. A typical structure is `section > .wrapper > .columns > div.md:columns-6`.
- Prefer normal document flow and Flexbox for structural layout. Use Grid, absolute positioning, transforms, negative margins, or fixed dimensions when the design materially requires them.
- Reuse existing image utilities, mixins, functions, breakpoints, and components rather than recreating them.

## Content, HTML, and Liquid

- Preserve supplied text unless explicitly asked to edit or translate it. Do not invent content. Replace odd spacing characters such as `&nbsp;` with normal spaces where appropriate.
- Use semantic HTML. Prefer `<hr>` to an empty decorative `<div>`, and use `<ol>` or `<ul>` with list styling rather than hardcoded numbers in `<span>` elements.
- Remove unnecessary wrappers.
- Use Liquid loops for genuinely repeated structures. Keep small static content directly in the template.
- Introduce Liquid variables for values that need to be dynamic, customizable, or reused. Keep conditionals readable and render optional fields conditionally.
- Do not add ARIA where native HTML semantics suffice. Preserve meaningful accessibility attributes and address clear accessibility problems.
- For supplied placeholder images, retain only `src` and `alt=""` unless the task requires other attributes.

## SVG and icons

- Use the project's Icon `{% icon %}` shortcode for common interface icons when an equivalent exists.
- Place custom SVG artwork in `src/assets/svg/client/` and render it with `{% svg %}`.

## SCSS

- Scope styling to the module and use descriptive, shallow class names.
- Use SCSS nesting where it improves readability; do not nest more than three levels.
- Do not use IDs for styling or `!important`.
- Prefer inheritance or parent layout over extra child classes where possible.
- Prefer an existing utility from `src/assets/sass/04.utilities/` when an element needs only one simple rule. For example, use `mt-auto` or `h-100%` instead of making a new class for that declaration.
- Remove unused selectors, duplicate declarations, unnecessary resets, browser-specific junk, and remnants of an external CSS framework.
- Avoid speculative defensive declarations. Add them when a specific layout need warrants them.

## Validation

- Compile Sass after module changes.
- Do not run Eleventy for straightforward markup or styling work unless explicitly requested or needed to resolve a concrete issue.
- Do not create tests or preview pages for straightforward module work.
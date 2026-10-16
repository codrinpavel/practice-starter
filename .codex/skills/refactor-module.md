---
name: refactor-module
description: Convert supplied HTML and CSS for a website section into one Liquid module and one SCSS module using the current project's conventions. Use when the user provides existing markup and styles to adapt or refactor.
---

# Refactor Module

Follow the project's `AGENTS.md` for file locations, tokens, layout primitives, content handling, integration, and validation.

## Goal

Convert the supplied HTML and CSS into a native project module while preserving its content and visual composition as closely as the existing design system allows.

## Workflow

1. Inspect the supplied markup, styles, and any existing version of the module.
2. Inspect the relevant project data, components, utilities, tokens, and Liquid conventions.
3. Separate the source design's meaningful structure and styling from framework code, resets, and unrelated behavior.
4. Implement one complete Liquid file and one complete SCSS file.
5. Register the SCSS file. Integrate the Liquid file into a page only when a target page is specified.
6. Compile Sass and report any material visual compromise caused by mapping source values to project tokens.

## Source content and assets

- Keep supplied text as written unless the user requests changes.
- Leave externally hosted placeholder images remote. Do not download them.
- Replace source framework utility classes with the project's existing utilities or module styles.
- Convert common interface SVG icons to the project's Lucide shortcode. Extract other custom SVG artwork according to `AGENTS.md`.
- For placeholder images, follow the project's placeholder-image rule.

## Visual and interaction rules

- Preserve the layout, spacing relationships, type hierarchy, image treatment, and visual composition as closely as possible.
- Preserve relevant hover and focus interactions and their transitions when they are present in the supplied code.
- Do not recreate source animations.
- Do not add JavaScript.
- Preserve absolute positioning when it is essential to the supplied design.
- Use the closest existing design tokens. Do not copy source CSS custom properties into the module.

## Liquid implementation

- Use loops for repeated items where they simplify the template.
- Keep small amounts of static content directly in the template.
- Introduce variables only when a value needs reuse or customization.
- Avoid complicated abstractions and CMS configuration unless requested.

## Reruns and cleanup

- On a rerun, treat the current module files as authoritative and preserve unrelated manual changes.
- Create a numbered variant only when the user asks for a separate variant.
- Remove source framework remnants, unused selectors, duplicated rules, unrelated animations, unnecessary resets, and browser-specific junk.
- Check references before removing any module asset.
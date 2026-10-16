# Skill: Import Article

Use this skill when I provide HTML for an article that needs to be converted into this project's Markdown/Liquid structure.

If instead I provide an article URL, use the HTML found by this js selector:
`section.noticiaInteriorAa > .container > .row > div.col-md-8`

The md filename should match the article URL, with the .md extension replacing .html,
for example: "72-innovacion-para-tu-salud-dental-ventajas-de-la-odontologia-digital.md"

## Objective

Convert the supplied article HTML into a single Markdown file using:

* YAML frontmatter
* Standard Markdown syntax
* Existing Liquid shortcodes where appropriate
* Locally downloaded article images

Preserve the original article content exactly unless a structural change is required to represent it correctly in Markdown/Liquid.

## Target file

If I specify an existing article page file:

* Update that file.
* Integrate the converted content into it.
* Preserve unrelated existing page content unless the conversion requires a syntax fix.

If no article file is specified:

* Create a new `.md` article file.
* name it based on the article title, as a slug.md format
* Do not modify other project files except where required to download article assets.

## Frontmatter

Add or update the following frontmatter:

```yaml
---
title: "Article title"
date: YYYY-MM-DD
hero_image: filename.jpg
---
```

Rules:

* `title` must always be surrounded by quotes.
* `date` must use `YYYY-MM-DD`.
* Convert Spanish or human-readable dates into this format.
* Use the first article image as `hero_image`.
* `hero_image` should reference the local downloaded image, following the project's existing frontmatter convention.
* Do not add a `layout` key.
* Preserve useful existing frontmatter unless it conflicts with these rules.

## Content preservation

Do not:

* Rewrite the article.
* Proofread it.
* Correct grammar.
* Change wording.
* Summarize it.
* Translate it.
* Remove meaningful content.

Only make changes required for:

* Markdown syntax
* Liquid shortcode syntax
* Heading hierarchy
* Structural layout
* Local image paths
* Valid HTML/Markdown output

The final text should contain the same substantive content as the source.

## Markdown conversion

Convert HTML into normal Markdown wherever possible.

Use Markdown syntax for:

* `##` headings
* `###` headings
* paragraphs
* links
* images
* bold text
* italic text
* unordered lists
* ordered lists
* tables

Avoid retaining HTML when Markdown can represent the same structure cleanly.

Read the article semantically rather than performing a literal HTML-to-Markdown conversion.

Infer the intended hierarchy from the content and source markup.

For example, text that visually or semantically introduces a section should become an appropriate Markdown heading even if the source HTML does not use the correct heading element.

Do not create unnecessary headings.

Heading should never include bolds or underlines inside the heading text. You are free to steer away from other rules that won't let you edit content for this exact purpose.

## Preferred visual structure

Use the project's standard two-column prose layout for article sections, including the introduction. Do not use `prose_columns_centered`.

Use:

```liquid
{% prose_columns %}

{% prose_column %}

## Section headline

{% endprose_column %}

{% prose_column %}

Section content goes here.

Markdown such as **bold text**, [links](https://example.com), lists, and tables can be used normally.

{% endprose_column %}

{% endprose_columns %}
```

This produces:

```text
Section headline | Section content
```

### Column rules

Put each major article section, including the introduction, inside `prose_columns` with two `prose_column` blocks.

Normally:

* Left column: section heading and/or related image.
* Right column: body content.

Images generally belong beneath the section heading in the left column.

Keep related paragraphs, lists, tables, and accordions logically grouped.

### Introductions without headings

Use the same two-column structure: an `##` heading on the left and the introductory body content on the right.

Prefer promoting a suitable existing question, statement, or phrase into the heading. If the source has no suitable wording, write a short descriptive heading in the article's tone, as permitted under "Creating section headings". Preserve the original body text when adding a new heading.

A missing heading or the removal of a hero image from the body is not a reason to use centered prose, leave an empty left column, or omit the two-column structure.


### Related Columns

Avoid very long right side content. A common structure is:

Left column: heading
Right column: heading + content + heading + content repeatedly

In this case the right column will end up very tall.
Avoid this by using a new columns module for each of the headlines.

For the entire group of columns use a background parameter `bg-surface-100` as shown below:

```
{% prose_columns "bg-surface-100" %}
{% prose_column %}
## Heading
{% endprose_column %}
{% prose_column %}
Content
{% endprose_column %}
{% endprose_columns %}
{% prose_columns "bg-surface-100" %}
{% prose_column %}
### Subheading
{% endprose_column %}
{% prose_column %}
Content
{% endprose_column %}
{% endprose_columns %}
```

This connects a group of related columns.

All such columns should have the background parameter set, even the first one with the h2 title on the left side.

## Creating section headings

Sometimes the source article contains long uninterrupted content without usable headings.

When necessary for the two-column structure, you may promote an existing sentence or paragraph into a heading.

Only do this when needed to represent the article structure clearly.

Prefer:

* A short existing statement.
* An existing question.
* A concise phrase already present in the source text.

If no content can be extracted to be used as a heading, write a short heading describing the content that goes in the right columns. It can be a statement or a question. Keep it in tone with the rest of the article.

Only invent new headings if absolutely necessary.

## Accordions

Use the existing accordion shortcode:

```liquid
{% accordion "Accordion title" %}

Accordion content.

{% endaccordion %}
```

Use accordions when content is naturally secondary, expandable, or question-and-answer based.

Typical examples:

* FAQs
* Explanations attached to a short question
* Repetitive informational sections
* Groups of related optional details

Each expandable item must use its own accordion shortcode.

Multiple accordions may appear consecutively:

```liquid
## Preguntas frecuentes

{% accordion "Question one" %}

Answer one.

{% endaccordion %}

{% accordion "Question two" %}

Answer two.

{% endaccordion %}
```

Do not hide important primary article content inside accordions without a structural reason.

## Lists

Choose the representation that best matches the meaning of the content.

Possible representations are:

1. Standard unordered Markdown list.
2. Standard ordered Markdown list.
3. Separate `###` subsections.
4. Individual accordions.

Preserve ordered sequences as ordered lists when the order matters.

Use headings or accordions instead of a list when each item contains substantial explanatory content.

## Images

Identify every article image, including:

* `<img>` elements
* `<picture>` sources when relevant
* lazy-loaded image attributes
* CSS `background-image` URLs
* inline style background images

Reuse existing, valid image downloads.

Download article images into:

```text
./src/assets/img/uploads/noticias/
```

Do not leave remote image URLs in the converted article.

Convert article images to Markdown image syntax:

```markdown
![Alt text](/assets/img/uploads/noticias/example.jpg)
```

Use the project's public asset path rather than the source filesystem path.

Preserve meaningful source alt text when available.

If no useful alt text exists, use an empty alt attribute:

```markdown
![](/assets/img/uploads/noticias/example.jpg)
```

Do not invent descriptive alt text unless required.

### Hero image

The first article image must be used as the `hero_image` frontmatter value.

Do not duplicate the hero image in the article body.

### Image filenames

Prefer clean, stable filenames.

Preserve the original filename when practical.

If filenames must be changed:

* Use lowercase.
* Use hyphens instead of spaces.
* Preserve the correct file extension.
* Avoid collisions with existing files.

## Tables

Convert HTML tables to Markdown tables whenever possible.

Place tables in the right-hand prose column associated with their section.

Example:

```markdown
| Treatment | Duration |
| --- | --- |
| Example A | 30 min |
| Example B | 60 min |
```

Preserve all table data.

If a table cannot be represented correctly using Markdown, retain only the minimum HTML necessary to preserve its structure.

## Links

Preserve all meaningful links.

Convert normal HTML links into Markdown:

```markdown
[Link text](https://example.com)
```

Check that URLs have not been truncated, corrupted, or accidentally converted to local paths.

Do not preserve tracking attributes or unrelated HTML attributes.

## Heading hierarchy

Use a logical document hierarchy.

The article title comes from frontmatter and should not normally be repeated as `#`.

Article content should generally begin with:

```markdown
## Main section
```

Nested sections should use:

```markdown
### Subsection
```

Avoid skipping heading levels without a structural reason.

## Liquid syntax

Preserve valid Liquid syntax exactly.

Make sure every opening shortcode has its matching closing shortcode.

In particular verify:

* `prose_columns`
* `prose_column`
* `accordion`

Do not place Markdown inside Liquid structures in a way that causes Markdown to be interpreted as code blocks.

Avoid unnecessary indentation inside paired shortcodes.

Prefer:

```liquid
{% prose_column %}
## Heading

Content.
{% endprose_column %}
```

rather than deeply indenting Markdown content.

## Encoding

Use UTF-8 for all reads and writes.

Preserve Spanish characters correctly, including:

* á
* é
* í
* ó
* ú
* ü
* ñ
* ¿
* ¡

Do not rely on PowerShell's default text encoding.

If PowerShell is used, explicitly read and write UTF-8.

## Validation

Before considering the import complete:

1. Compare the source article against the converted Markdown and confirm no meaningful content was lost. Account separately for any new headings permitted by this skill; they must not replace or rewrite the source body text.
2. Verify the title.
3. Verify the converted `YYYY-MM-DD` date.
4. Verify the first article image is used for `hero_image`.
5. Verify all images were downloaded successfully.
6. Verify all image paths are local.
7. Verify all links.
8. Verify heading hierarchy and that the introduction uses a heading-left/body-right `prose_columns` structure, with no `prose_columns_centered` shortcodes in the article.
9. Verify Markdown lists and tables.
10. Verify every Liquid shortcode is correctly opened and closed.
11. Verify UTF-8 characters were preserved.
12. Check that no accidental `<pre>` or `<code>` blocks were produced by indentation.
13. Check that unrelated page content was not modified.
14. Run:

```bash
npm run build:11ty
```

15. Resolve any build errors caused by the imported article.

The task is complete only when the article builds successfully and its content matches the supplied source.

---
name: import-homepage
description: Gather verified content from a client's live website to populate an existing Eleventy/Liquid homepage redesign, including client.js data, collection page frontmatter, and copy inside existing modules. Use when importing or migrating client content into provided website templates.
---

# Import Homepage

Act as an intelligent content ingestion system for a website redesign. Visit the client's live website, collect real information, and fit it into the project's existing homepage templates. Use the new homepage's structure to guide content discovery; the old site's layout does not dictate the new layout.

## Inspect the destination

- Read applicable project instructions. Identify the target project, live client URL, and homepage entrypoint from the request and workspace. Ask for any essential missing or ambiguous input; do not assume that a template's sample business is the intended client.
- Inspect `src/data/client.js`, the homepage's includes, and the relevant files in `src/includes/modules`. Follow nested includes and data references to find where displayed content actually originates.
- Identify collection loops and inspect their page files, frontmatter, directory data, and collection registration. Use the existing field names and collection membership rules.
- Build a compact content map: destination field or module, purpose, content type, source URL, and any missing information. A module can combine structured, collection, and freeform content; classify each part separately.
- Before editing, describe the files and intended content changes. Follow any applicable user approval requirements without adding a separate approval gate of your own.

## Gather client content

Visit the live homepage and follow relevant navigation and internal links. Read the actual pages, not just search snippets. Use available web tools; use browser inspection when content requires rendering or interaction.

Gather as much relevant client content as possible for the destination: identity, contact details, address, opening hours, services, team, differentiators, process, calls to action, and other information required by the existing modules. Check contact, about, service, team, FAQ, and legal pages as useful. Legal pages may establish a company name distinct from the public site name.

If the new homepage has more modules than the original, search other client pages for suitable content. Match by meaning and module purpose rather than copying the old homepage section for section. Stop expanding the search when the needed content is covered or the relevant accessible pages have been exhausted.

Keep source URLs and enough evidence to trace imported facts and copy. Prefer the client's own published information. Report conflicting facts that cannot be resolved from context instead of silently choosing one. Distinguish information that was not found after inspection from information that could not be checked because a page was inaccessible.

Never invent facts to fill space or satisfy a template: this includes people, services, credentials, statistics, prices, awards, reviews, business details, and URLs. Do not treat existing sample records as verified client content.

## Route content to its source of truth

### 1. Structured content: `src/data/client.js`

This existing JavaScript object holds client-specific information such as site name, company name, email, physical address, social links, and opening hours.

- Replace placeholders with verified client data. Preserve the existing export style, nesting, value types, and field conventions where applicable.
- Remove keys for which no client data was found. Remove unsupported nested fields and sample array entries as well; do not retain fake defaults, empty placeholder strings, or invented values to complete the schema.
- Preserve known client data supported by the user's supplied material. An inaccessible source is not evidence that an existing verified value is false; report verification gaps.
- Inspect references to removed keys. Make minimal conditional-rendering changes where necessary to avoid broken links, empty contact rows, or undefined output. Do not restore fabricated values to make a template render.
- Keep structured values centralized. Preserve existing `client` references in modules instead of replacing them with duplicated literals.

### 2. Content generated from Eleventy collections

When a module loops over collection pages, populate those pages rather than hardcoding cards in the module.

- Never use custom lists or custom data loops for treatments, services, team members, blog articles, or news articles. These exist as real pages under `src/pages`; use existing Eleventy collections wherever possible.
- Inspect these pages, their frontmatter, directory data, and collection registration even when the module currently uses hardcoded cards or a custom list. Replace those cards or lists with the appropriate collection loop. If an expected collection is unavailable, inspect the existing setup and report the gap rather than substituting a custom list.
- Preserve collection loops, filters, sorting, limits, and dynamic links.
- Update the relevant collection pages' frontmatter using the fields actually consumed by the module. Update page bodies when the imported content belongs there.
- Create collection pages for real source entities when needed, following existing layout, tags, permalink, and directory-data conventions. Do not create fictional records to reach a desired card count.
- Identify and replace sample records within the affected collection. Do not overwrite or delete unrelated real pages; report any ambiguous records.
- Preserve `item.url` or the project's equivalent so cards point to the corresponding generated pages.

For example, a team module that loops over four member pages must continue looping. Names, roles, biographies, and other supported fields belong in those member pages' frontmatter, not in four hardcoded cards.

### 3. Freeform content inside modules

Update raw copy in the existing files under `src/includes/modules` when that is where the content is authored. Preserve dynamic references when a module already reads content from another source.

- Match content to the module's purpose: a hero introduces the client and main proposition; a CTA invites a supported action; service, about, FAQ, and testimonial modules retain their corresponding roles.
- Prefer source wording. Adapt or shorten copy only as needed to fit the provided module without changing its meaning or adding claims. Preserve the source language unless translation is requested. When the user requests verbatim copy, preserve it verbatim.
- Keep quotations and testimonials faithful and attributed. Do not generate reviews or infer unsupported benefits.
- Use verified destinations for buttons and links. Map links to corresponding new internal pages where they exist, and retain appropriate verified external destinations. Do not invent routes or use `#` as a completed destination.
- Preserve module order, includes, markup structure, classes, styling, and interactions except for minimal changes required to render imported or optional content correctly. This is content ingestion, not a module redesign.
- Check whether edited includes are shared with other pages and account for their impact.

### Liquid loop inputs

When a repeated structure needs a list built with `split` or other filters, assign the result to a named variable first, then loop over that variable. Never put a string literal or a filter expression directly in a `for` tag. This does not permit custom lists for the page-backed entities above.

For example, for a verified static partner list:

```liquid
{% assign partners = "Santalucía,Padican,AXA,Generali,Dentyred,Santander,Catalana Occidente,Aegon,BNP" | split: "," %}
{% for partner in partners %}
  {{ partner }}
{% endfor %}
```

If no suitable content exists for a module after searching relevant client pages, report that specific gap. Do not force unrelated copy into it or present placeholder content as completed work. Request direction when filling the gap would require new claims, substantive new copy, or changing the homepage structure.

## Validate and report

- Confirm treatments, services, team members, blog articles, and news articles use real page collections rather than custom lists, and that any filtered loop inputs are assigned to variables before iteration.
- Review the diff for unsupported claims, leftover sample content in affected areas, unintended layout changes, and accidentally replaced collection loops.
- Check JavaScript syntax and frontmatter validity, removed-field references, link destinations, and UTF-8 text preservation.
- Use applicable project checks. When changing collection membership or data propagation, validate the actual Eleventy render/build where permitted; a mock Liquid render alone does not prove collection integration.
- Inspect the rendered homepage when available for missing content, empty optional elements, collection cards, and copy that does not fit. Distinguish build/render verification from browser appearance and interaction verification.
- Report the files changed, source pages used, collection records added or updated, unsupported structured keys removed, remaining gaps, and checks performed. Clearly state inaccessible sources and anything left unverified.

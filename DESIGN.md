---
name: Martino Ferrero Portfolio
description: A restrained, dark portfolio for software engineering and AI work.
colors:
  background: "#090a0f"
  foreground: "#f5f5f7"
  muted: "#b2b5c3"
  subtle: "#9297a9"
  line: "#343743"
  accent: "#a2aef4"
typography:
  display:
    fontFamily: "Geom, sans-serif"
    fontSize: "clamp(3.4rem, 6.65vw, 6rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geom, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  portrait: "6px"
  control: "10px"
spacing:
  page-gutter: "24px"
  section-gap: "clamp(125px, 15vw, 205px)"
components:
  outlined-link:
    textColor: "#e0e8ff"
    rounded: "{rounded.control}"
    padding: "0 28px"
    height: "62px"
---

## Overview

**Creative North Star: "Quiet continuity"**

The portfolio uses a dark continuous canvas, centered introduction, and readable project descriptions. Movement supports the reading sequence without overwhelming the content.

**Key Characteristics:**

- Near-black background with restrained cool accents.
- Clear sans-serif typography and generous vertical spacing.
- A small portrait and sparse connection lines.
- Lists and timelines instead of cards or overlays.

## Colors

The neutral background and white foreground carry the page. Muted text provides hierarchy, while cool accent colors identify links and fine connection lines.

## Typography

Geom is self-hosted and used throughout. The display title is large and centered; body text remains comfortably readable with a generous line height.

## Layout

The content width is capped at 1132px with 24px minimum side gutters. Project and skill rows use two columns on larger screens and stack below 720px. The portrait remains small within the About section.

## Elevation & Depth

The page is predominantly flat. The fixed navigation uses a translucent dark background, and subtle background shading adds depth without separating the page into panels.

## Shapes

Controls have modest rounding. Thin horizontal dividers and a simple timeline organize content; connection lines are secondary to the text.

## Components

The outlined project link is the primary action. Inline links use a small arrow and a restrained hover transition. Navigation remains fixed and marks the current section.

At widths up to 960px, a hamburger button reveals the section links and social links in a vertical panel below the header. Language and theme controls stay visible, with touch targets of at least 44px. The panel closes when choosing a section, clicking outside, pressing Escape, or leaving the header with the keyboard. Escape returns focus to the menu button.

## Do's and Don'ts

- Do keep content visible and legible when motion is reduced.
- Do use scroll motion to support the reading sequence.
- Don't surround the portrait with decorative effects.
- Don't turn project lists into grids of cards or modal overlays.

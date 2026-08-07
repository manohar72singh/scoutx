// lib/extractHeadings.js — pulls H2/H3 headings out of blog HTML and tags them
// with anchor ids, so a table of contents can jump to each section.

import { slugify } from './slugify';

export function extractHeadings(html) {
  const headings = [];
  let counter = 0;

  const processedHtml = (html || '').replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (match, level, inner) => {
    const plainText = inner.replace(/<[^>]*>/g, '').trim();
    if (!plainText) return match;

    const id = `${slugify(plainText) || 'section'}-${counter++}`;
    headings.push({ id, text: plainText, level: Number(level) });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  return { html: processedHtml, headings };
}

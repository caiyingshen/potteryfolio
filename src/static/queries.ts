
export function fetchAllQuery(type: string) {
    return `*[
    _type == "${type}"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;
}

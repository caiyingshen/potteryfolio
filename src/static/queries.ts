export const allPortfolioEntriesQuery = '*[_type == "portfolioEntry"]{ name, slug, publishedAt, image, body, pieceIds }';

export const portfolioEntryQuery = `*[_type == "portfolioEntry" && slug.current == $slug][0]`;

export const updatesQuery = `*[_type == "update"  && count((pieceIds[]._ref)[@ in $pieceIdArray]) > 0]{ 
    pieceIds, 
      notes, 
      image,
      updatedAt
      }`

export const groupNewsBySource = (news) => {
  const sourceMap = {
    "WSJ.com: World News": "WSJ",
    "RSSOpinion": "WSJ",
    "NYT > World News": "NYT",
    "NYT > U.S. > Politics": "NYT",
    "CNN.com - RSS Channel": "CNN",
    "Latest World News on Fox News": "FOX",
    "Latest Political News on Fox News": "FOX",
    "World News – Latest Breaking Headlines, Photos, Videos | New York Post": "NYPost",
    "Politics – Latest US Political News & Headlines | New York Post": "NYPost",
    "World news | The Guardian": "Guardian",
    "Politics | The Guardian": "Guardian",
    "The Grayzone": "TGZ",
    "The Daily Wire - Breaking News, Videos & Podcasts": "Dwire",
    "News - Washington Examiner": "Wexam",
    "NPR Topics: News": "NPR"
  };

  return news.reduce((acc, article) => {
    // Use mapped name or fallback to last part after " | "
    const rawSource = article.source || "";
    const mainSource = sourceMap[rawSource] || rawSource.split(" | ").pop().trim();

    if (!acc[mainSource]) {
      acc[mainSource] = { articles: [], logo: article.logo || null };
    }
    acc[mainSource].articles.push(article);
    return acc;
  }, {});
};

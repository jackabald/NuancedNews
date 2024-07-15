export const groupNewsBySource = (news) => {
    const sourceMap = {
      "WSJ.com: World News":"WSJ",
      "RSSOpinion":"WSJ",
      "NYT > World News":"NYT",
      "NYT > U.S. > Politics":"NYT",
      "CNN.com - RSS Channel - World":"CNN",
      "CNN.com - RSS Channel - Politics":"CNN",
      "Latest World News on Fox News":"FOX",
      "Latest Political News on Fox News":"FOX",
      "World News \u2013 Latest Breaking Headlines, Photos, Videos | New York Post":"NYPost",
      "Politics \u2013 Latest US Political News & Headlines | New York Post":"NYPost",
      "World news | The Guardian":"Gaurdian",
      "Politics | The Guardian":"Gaurdian",
      // Sources for More page
      "The Grayzone":"TGZ",
      "The Daily Wire - Breaking News, Videos & Podcasts":"Dwire",
      "News - Washington Examiner":"Wexam",
      "NPR Topics: News":"NPR"
    };
  
    return news.reduce((acc, article) => {
      const mainSource = sourceMap[article.source] || article.source;
      if(!acc[mainSource]){
        acc[mainSource] = []
      }
      acc[mainSource].push(article);
      return acc;
  }, {})
  }
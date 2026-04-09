export const searchArticles = (articles, keyword) => {
    return articles.filter(item =>
        item.title.toLowerCase().includes(keyword.toLowerCase())
    );
};
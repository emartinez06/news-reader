const apiKey = '';
const apiUrl = 'https://newsapi.org/v2/everything?q=';
const apiParameters = '&language=en&sortBy=relevancy&apiKey=';
const defaultSearch = 'web+development';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sources');
//const searchSelector = document.querySelector('#search');

window.addEventListener('load', e => {
    sourceSelector.addEventListener('change', evt => updateNews(evt.target.value));
    updateNewsSources().then(() => {
        sourceSelector.value = defaultSearch;
        updateNews();
    });
});

async function updateNews(search = defaultSearch){
    const response = await fetch(apiUrl + search + apiParameters + apiKey);
    const json = await response.json();

    main.innerHTML = json.articles.map(createArticle).join("\n");
}

async function updateNewsSources() {
    sourceSelector.innerHTML = createTopic;
}

function createArticle(article){
    let articleTitle = article.title;
    let articleUrl = article.url;
    let articleImage = article.urlToImage;
    let articleDiv = '<div class="article">\n' +
        '        <a href="'+ articleUrl +'" target="_blank">\n' +
        '         <h2>' + articleTitle +'</h2>\n' +
        '         <img src="'+ articleImage +'" />\n' +
        '        </a>\n' +
        '      </div>';
    return articleDiv;
}

function createTopic(){
    let topics = '<option value="web+development">Web Dev</option>\n' +
        '<option value="microsoft">Microsoft</option>\n' +
        '<option value="Linux">Linux</option>\n ' +
        '<option value="bitcoin">Bitcoin</option>\n' +
        '<option value="iot">IoT</option>\n      ' +
        '<option value="android">Android</option>\n' +
        '<option value="ios">iOS</option>\n ' +
        '<option value="technology">Technology</option>';
    return topics;
}
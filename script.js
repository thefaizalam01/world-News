const source_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=6d73ba11fada471c8fd3730f707c221c";


const MenuBTN = document.querySelector(".hamburger");
const navBar = document.querySelector(".nav-list");
const readmoreBTN = document.querySelector(".button");


// for scrolling the window
let stopScrolling = () => {
    console.log(window.scrollbars.visible = false)
}


MenuBTN.addEventListener("click", () => {
    if (!navBar.classList.contains("active")) {
        navBar.classList.add("active")
        MenuBTN.childNodes[1].setAttribute("src", "assets/images/icon-menu-close.svg");

    } else {
        navBar.classList.remove("active")
        MenuBTN.childNodes[1].setAttribute("src", "assets/images/icon-menu.svg")
    }

    stopScrolling();
})


let gettinDatainheadlines = (data) => {
    let choosingRandomData = data[Math.floor(Math.random() * data.length)];
    let title = choosingRandomData.title;
    let content = choosingRandomData.content;
    let url = choosingRandomData.url;
    let urlImg = choosingRandomData.urlToImage;

    const headlines = document.querySelector(".headline");
    //for uploading an immage for the headlines
    headlines.querySelector(".heading-images").innerHTML = `<img src="${urlImg}" alt="">`
    //for the headlines
    headlines.querySelector(".news").querySelector(".headline-text").innerHTML = `<h1>${title}</h1>`;
    // for the url images
    headlines.querySelector(".news .newsPara p").innerText = `${content}`
    // for readmore 
    readmoreBTN.innerHTML = `<p><a href="${url}">READ MORE</a></p>`

}


// for the side news

const newData = document.querySelector("#new_news");
const sideNews = document.querySelector(".side-news")
let updateNew = (data) => {
    for (let news of data) {
        //if news of content =null not print it  
        if (news.content === null) {
            news.content = "";
        }
        let newNews = document.createElement("div");
        newNews.classList.add("news");
        newNews.innerHTML = ` <h3><a href="${news.url}">${news.title}</a></h3>
        <p>${news.content}</p>`;
        newData.append(newNews);
    }
}

// for updation of bottom
let updateBottom = (data) => {
    const bottom = document.querySelector(".bottom")
    let index = 1;
    for (let news of data) {
        if (news.content != null && news.urlToImage != null) {
            let newsList = document.createElement("div");
            newsList.classList.add("news");
            newsList.innerHTML = `<div class="bottom-news-img">
            <img src="${news.urlToImage}" alt="">
          </div>
          <div class="bottom-news">
            <h1>${index}</h1>
            <h2><a href="${news.url}">${news.title}</a></h2>
            <p>${news.content}</p>
          </div>`;
            bottom.append(newsList)
            index++;
        }
    }
}




let printjson = (jsonOBJ) => {
    const data = jsonOBJ.articles;

    gettinDatainheadlines(data);
    updateNew(data)
    updateBottom(data)

}






//getting the news

fetch(source_URL).then((response) => {
    return response;
}).then((response) => {
    return response.json();
}).then((jsonOBJ) => {
    printjson(jsonOBJ);
})


const headline = document.querySelector(".headline");
console.log(headline.width);
var bars = document.querySelectorAll(".bar");
var cards = document.querySelectorAll(".card");
var data;
var date = new Date();

async function getData(url){
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data
}

async function addData(){
    data = await getData("data.json");
    
    var amounts = []
    for(let j = 0; j < data.length; j++){
        amounts.push(data[j].amount);
    }  
    console.log(amounts);
    console.log(Math.max(...amounts));
    var max_amount = (Math.max(...amounts))
    console.log((max_amount / max_amount) * 100);
    console.log(((data[0].amount / max_amount) * 100));
    
    for(let i = 0; i < bars.length; i++){
        bars[i].style.height = (((data[i].amount / max_amount) * 60) + "%");
        cards[i].innerHTML = "$" + data[i].amount;
        if(i == date.getDay()){
            bars[i].classList.add("today");
        }
    }
    return
}

addData();

for(let i = 0; i < bars.length; i++){
    bars[i].addEventListener("mouseover", mouseOver);
    bars[i].addEventListener("mouseleave", mouseLeave);
   }

function mouseOver(x){
    console.log(x.target);
    console.log(bars[0]);
    let card = x.target.parentElement.querySelector(".card");
    card.classList.add("show");
    let space = ("calc(50px" + " + " + x.target.style.height + ")")
    card.style.bottom = space;
}

function mouseLeave(x){
    let card = x.target.parentElement.querySelector(".card");
    card.classList.remove("show");
}
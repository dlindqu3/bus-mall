'use strict'; 

// console.log('hello');

//Global Variables 
// let votesAllowed = 5; 
let votesAllowed = 25; 

//Product storage
let allProducts = []; 

//DOM REFERENCES
let myContainer = document.getElementById('container'); 
let imgOne = document.getElementById('img-one'); 
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three'); 
console.log(imgOne); 
let resultsBtn = document.getElementById('show-results-btn'); 
let showResults = document.getElementById('show-results-list'); 

//Constructor (name, filepath of img, times shown)
function Product (name, fileExtension='jpg'){
  this.name = name; 
  this.views = 0; 
  this.clicks = 0;
  this.src =  `img/${name}.${fileExtension}`; 
  allProducts.push(this);
}

new Product('bag'); 
new Product('banana'); 
new Product('bathroom'); 
new Product('boots'); 
new Product('breakfast'); 
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen'); 
new Product('pet-sweep');
new Product('scissors');
new Product('shark'); 
new Product('sweep', 'png'); 
new Product('tauntaun'); 
new Product('unicorn'); 
new Product('water-can'); 
new Product('wine-glass'); 

console.log(allProducts); 

//Executable Code 
//get a random product
function getRandomIndex(){
  return Math.floor(Math.random() * allProducts.length);
}

//for / while (includes)

let randomNums = []; 

function getRandomNums(){
  for (let i = 0; i < 4; i++){
    let currentNum = Math.floor(Math.random() * allProducts.length);
    while (!randomNums.includes(currentNum)){
        randomNums.push(currentNum); 
    }
  }
}


//render images 
function renderProducts(){
  getRandomNums();
  let productOneIndex = randomNums.pop(); 
  let productTwoIndex = randomNums.pop(); 
  let productThreeIndex = randomNums.pop(); 

  imgOne.src = allProducts[productOneIndex].src;
  imgOne.alt = allProducts[productOneIndex].name;
  allProducts[productOneIndex].views++;

  imgTwo.src = allProducts[productTwoIndex].src;
  imgTwo.alt = allProducts[productTwoIndex].name;
  allProducts[productTwoIndex].views++;

  imgThree.src = allProducts[productThreeIndex].src;
  imgThree.alt = allProducts[productThreeIndex].name;
  allProducts[productThreeIndex].views++;
}

renderProducts(); 

//Event listeners 
function handleClicks(event){
  votesAllowed--; 
  let imgClicked = event.target.alt; 
  for (let i=0; i < allProducts.length; i++){
    if (imgClicked === allProducts[i].name){
      allProducts[i].clicks++; 
    }
  }
  renderProducts(); 
}



if (votesAllowed === 0){
  myContainer.removeEventListener('click', handleClicks);
}

function handleShowResults(){
  if(votesAllowed === 0){
    for(let i =0; i < allProducts.length; i++){
      let li = document.createElement('li'); 
      li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes, and was seen ${allProducts[i].views} times.`
      showResults.appendChild(li); 
    }
  }
}

//step 2: grab what we listen to 
myContainer.addEventListener('click', handleClicks); 
resultsBtn.addEventListener('click', handleShowResults); 
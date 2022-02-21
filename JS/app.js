'use strict'; 

// console.log('hello');

//Global Variables 
let votesAllowed = 5; 
// let votesAllowed = 25; 

//Product storage
let allProducts = []; 

//DOM REFERENCES
let myContainer = document.getElementById('container'); 
let imgOne = document.getElementById('img-one'); 
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three'); 
console.log(imgOne); 
let resultsBtn = document.getElementById('show-results-btn'); 
let displayResults = document.getElementById('show-results-list'); 

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

//render images 
function renderProducts(){
  
}
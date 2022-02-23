'use strict'; 

// console.log('hello');

//Global Variables 
let votesAllowed = 8; 
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
let showResults = document.getElementById('show-results-list'); 

//local storage: 
//local storage step 3: get it out of local storage 
let retrievedProducts = localStorage.getItem('products'); 
console.log(retrievedProducts); 

//local storage step 4: parse the data 
let parsedProducts = JSON.parse(retrievedProducts);
console.log('parsed products', parsedProducts);

//Constructor (name, filepath of img, times shown)
function Product (name, fileExtension='jpg'){
  this.name = name; 
  this.views = 0; 
  this.clicks = 0;
  this.src =  `img/${name}.${fileExtension}`; 
  allProducts.push(this);
}

//local storage: 
//local storage step 5: use the data that we got from localStorage
if(retrievedProducts){
  allProducts = parsedProducts; 
} else {
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
}

console.log(allProducts); 

//Executable Code 
//get a random product
function getRandomIndex(){
  return Math.floor(Math.random() * allProducts.length);
}

//for / while (includes)

let randomNums = []; 



// function getRandomNums(){ 
//   for (let i = 0; i < 3; i++){
//     let currentNum = Math.floor(Math.random() * allProducts.length);
//     while (!randomNums.includes(currentNum)){
//         randomNums.push(currentNum); 
//     }
//   }
// }

function getRandomNums(){
  while(randomNums.length < 6){
    let trialNum = getRandomIndex(); 
    while(!randomNums.includes(trialNum)){
      randomNums.push(trialNum); 
    }
  }
}

//perhaps change the below renderProducts to shift, compare within an array of 6 indexes to see if initial 3 are repeated at all in next 3 (push, shift)

//render images 
function renderProducts(){
  getRandomNums();
  // let productOneIndex = randomNums.pop(); 
  // let productTwoIndex = randomNums.pop(); 
  // let productThreeIndex = randomNums.pop(); 

  let productOneIndex = randomNums.shift(); 
  let productTwoIndex = randomNums.shift(); 
  let productThreeIndex = randomNums.shift(); 

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
  getViewsData();
  getClicksData(); 
  renderChart(); 

  //local storage begins 
//local storage step 1: stringify our data 
let stringifiedProducts = JSON.stringify(allProducts); 
console.log('stringified products ', stringifiedProducts); 

//local storage step 2: set the item into local storage
localStorage.setItem('products', stringifiedProducts); 

}

let namesArr = [];

function getNames (){
  for (let i = 0; i < allProducts.length; i++){
    namesArr.push(allProducts[i].name); 
  }
}
getNames();

console.log(namesArr); 

//chart 
function renderChart(){
  
let chartData = {
  type: 'bar',
  data: {
      labels: namesArr,
      datasets: [{
          label: '# of Views',
          data: viewsArr,
          backgroundColor: 'red',
          borderColor: 'black',
          borderWidth: 1
      },
      {
        label: '# of Clicks',
        data: clicksArr,
        backgroundColor: 'blue',
        borderColor: 'black',
        borderWidth: 1
    }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
}
new Chart(ctx, chartData);
}


let clicksArr = [];
let viewsArr = []; 

function getClicksData(){ 
  for (let i = 0; i < allProducts.length; i++){
    clicksArr.push(allProducts[i].clicks); 
  }
  console.log(clicksArr); 
}



function getViewsData(){
  for (let i = 0; i < allProducts.length; i++){
    viewsArr.push(allProducts[i].views);
  }
  console.log(viewsArr); 
}


const ctx = document.getElementById('my-chart').getContext('2d');

// let chartData = {
//   type: 'bar',
//   data: {
//       labels: allProducts,
//       datasets: [{
//           label: '# of Views',
//           data: viewsArr,
//           backgroundColor: 'red',
//           borderColor: 'black',
//           borderWidth: 1
//       },
//       {
//         label: '# of Clicks',
//         data: clicksArr,
//         backgroundColor: 'blue',
//         borderColor: 'black',
//         borderWidth: 1
//     }]
//   },
//   options: {
//       scales: {
//           y: {
//               beginAtZero: true
//           }
//       }
//   }
// }

// const myChart = new Chart(ctx, chartData);





//step 2: grab what we listen to 
myContainer.addEventListener('click', handleClicks); 
resultsBtn.addEventListener('click', handleShowResults);; 
"use strict"

let displayDays = document.querySelectorAll(".head")
let headMother = document.querySelector(".headMother")
let search = document.querySelector(".input-search");
let locatioon = document.querySelector(".location");
let sum = document.querySelector(".sum");
let sum2 = document.querySelectorAll(".sum2");
let custom = document.querySelector(".custom");
let gustKph = document.querySelector(".gustKph");
let gustmph = document.querySelector(".gustmph");
let sumTwoDay = document.getElementById("sum")
let indexDay;
let allData;
let getData;
let getTempc;
let days;
let dayMonth;


search.addEventListener("keyup" , function(e){
  search = e.target.value
  gitData(search)
})

async function gitData(item){

  if (item == null){
    allData = await fetch("https://api.weatherapi.com/v1/forecast.json?key=88129e3b9f504400a79231033223005&q=cairo&days=3&fbclid=IwAR2MPxeQ6BLNcxVBj7_P0ttruXPXHUJpYJA12BZBd94_tRS54XWKVGNd_sU")
  }
  else if (item == ""){
    allData = await fetch("https://api.weatherapi.com/v1/forecast.json?key=88129e3b9f504400a79231033223005&q=cairo&days=3&fbclid=IwAR2MPxeQ6BLNcxVBj7_P0ttruXPXHUJpYJA12BZBd94_tRS54XWKVGNd_sU")
  }
  else{
    allData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=88129e3b9f504400a79231033223005&q=${item}&days=3&fbclid=IwAR2MPxeQ6BLNcxVBj7_P0ttruXPXHUJpYJA12BZBd94_tRS54XWKVGNd_sU`)
  }
  allData = await allData.json()
  
  getData = {
    getLocation: allData.location.name,
    getIcone: allData.current.condition.icon,
    tempC: allData.current.temp_c,
    condition: allData.current.condition.text,
    getGustmph: allData.current.gust_mph,
    getGustmph: allData.current.gust_mph,
    getGustKph: allData.forecast.forecastday[0].day.avgvis_miles
  }

  getTempc = {
    min1: allData.forecast.forecastday[1].day.mintemp_c,
    min2: allData.forecast.forecastday[2].day.mintemp_c,
    max1: allData.forecast.forecastday[1].day.maxtemp_c,
    max2: allData.forecast.forecastday[2].day.maxtemp_c,
    icon1: allData.forecast.forecastday[1].day.condition.icon,
    icon2: allData.forecast.forecastday[2].day.condition.icon,
    text1: allData.forecast.forecastday[1].day.condition.text,
    text2: allData.forecast.forecastday[2].day.condition.text
  }
  
    let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let m = new Date();
    let name = month[m.getMonth()];
    const y = new Date();
    let day = y.getDate();
    const d = new Date;
    indexDay = [d.getDay()]
    dayMonth = day+name
  
    display()
}
gitData()


function display(){
  for( let i=0 ; i<displayDays.length ; i++){

    if (indexDay > 6){
        indexDay == 0
      }
      let day = {
        day1: days[indexDay++]
      }
      displayDays[i].innerHTML = `
      <div>${day.day1}</div>
      `

      headMother.innerHTML = `
      <div>${dayMonth}</div>`

   }

  locatioon.innerHTML = `
  <h4>${getData.getLocation}</h4>`

  sum.innerHTML = `
  <h2>${getData.tempC}</h2>
  <sup>O</sup>
    <h2>C</h2>
    <img src="${getData.getIcone}" alt="">`

  custom.innerHTML = `${getData.condition}`

  gustKph.innerHTML = `
  <i class="fa-solid fa-umbrella"></i>
      ${getData.getGustKph}%`

  gustmph.innerHTML = `
  <i class="fa-solid fa-wind"></i>
  ${getData.getGustmph}km/h`

  sum2[0].innerHTML = `
  <img src="${getTempc.icon1}" alt="">
  <div class="d-flex w-100 text-center justify-content-center">
                  <h2 class="text-center">${getTempc.min1}</h2>
                  <sup class="text-center">O</sup>
                  <h2 class="text-center w-">C</h2>
                </div>
              <p class="text-center d-flex text-white-50">${getTempc.max1}<sub>o</sub></p>
              <div class="custom mt-2 mainColor w-100">
                  ${getTempc.text1}
                </div>`

  sum2[1].innerHTML = `
  <img src="${getTempc.icon2}" alt="">
  <div class="d-flex w-100 text-center justify-content-center">
                  <h2 class="text-center">${getTempc.min2}</h2>
                  <sup class="text-center">O</sup>
                  <h2 class="text-center w-">C</h2>
                </div>
              <p class="text-center d-flex text-white-50">${getTempc.max2}<sub>o</sub></p>
              <div class="custom mt-2 mainColor w-100">
                  ${getTempc.text2}
                </div>`
              
}

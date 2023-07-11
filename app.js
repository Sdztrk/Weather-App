
//Selectors
const text = document.querySelector(".input")
const cities= document.getElementsByClassName("cities")
const msg = document.querySelector(".msg")

//eventlistener for the submit button
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault()
  renderCity(text.value)
  e.target.reset()
})
//console.log(text.value)

//function for the rendering the cities
const renderCity = async (city) => {

//Assinging api to a variable
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2b6b2c75790565a4f251171556ece413&units=metric`;


try {
  //fething
  const response = await axios.get(url)
  const data = response.data
  console.log(data)
  const {name,weather,main,sys} = data

  const cityElements = document.querySelectorAll(".city")
  //console.log(typeof cityElements)
  const arrCityElements= Array.from(cityElements)
  console.log(arrCityElements)
  console.log(Array.isArray(arrCityElements) )
  if( arrCityElements.length > 0 ){
    console.log("we have cities")
    // console.log(arrCityElements)
    const filtered = arrCityElements.filter(item=>item.querySelector('.city-name span').innerText==name)
  console.log(filtered)
  if(filtered.length > 0){
    console.log("you already have this city")
    msg.innerText="You already have this city in your list, please choose another one"
    setTimeout(()=> {msg.innerText=""},5000)
    return
  } 
  }
  const li = document.createElement("li")
  li.classList.add("city")
  li.innerHTML=
  `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      <figure>
        <img class="city-icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg" alt="${weather[0].description}">
        <figcaption>${weather[0].description}</figcaption>
      </figure>
  `
  
  cities[0].appendChild(li)

}
catch(err) {
  console.log(err)
  msg.innerText=err
  setTimeout(()=> {msg.innerText=""},5000)
}

}


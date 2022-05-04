window.onload = () => {
  let button = document.querySelector("#btn");

  // Function for calculating BMI
  button.addEventListener("click", calculateBMI);
};

function calculateBMI() {
  /* Getting input from user into height variable.
    Input is string so typecasting is necessary. */
  let height = parseInt(document.querySelector("#height").value);

  /* Getting input from user into weight variable. 
    Input is string so typecasting is necessary.*/
  let weight = parseInt(document.querySelector("#weight").value);

  let result = document.querySelector("#result");

  // Checking the user providing a proper
  // value or not
  if (height === "" || isNaN(height))
    result.innerHTML = "Please provide a valid Height!";
  else if (weight === "" || isNaN(weight))
    result.innerHTML = "Please provide a valid Weight!";
  // If both input is valid, calculate the bmi
  else {
    // Fixing upto 2 decimal places
    let bmi = (weight / ((height * height) / 10000)).toFixed(2);

    // Dividing as per the bmi conditions
    if (bmi < 18.6)
      result.innerHTML = `Under Weight- eat a Bagel! : <span>${bmi}</span>`;
    else if (bmi >= 18.6 && bmi <= 24.9)
      result.innerHTML = `Normal - Keep it up! : <span>${bmi}</span>`;
    else if (bmi >= 25 && bmi <= 29.9)
      result.innerHTML = `Overweight - exercise more! : <span>${bmi}</span>`;
    else if (bmi >= 30 && bmi <= 39.9)
      result.innerHTML = `Obese - get off the couch! : <span>${bmi}</span>`;
    else if (bmi >= 40)
      result.innerHTML = `Morbidly Obese - take action! : <span>${bmi}</span>`;
    else
      result.innerHTML = `Please check your input values, BMI cannot be calculated. : <span>${bmi}</span>`;
  }
}

const axios = require("axios");

const options = {
  method: "POST",
  url: "https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi",
  headers: {
    "content-type": "text/plain",
    "X-RapidAPI-Host": "mycookbook-io1.p.rapidapi.com",
    "X-RapidAPI-Key": "fd9989ee8cmshc3a8aa8e2bfefb1p124755jsnc1459418779b",
  },
  data: "https://www.jamieoliver.com/recipes/vegetables-recipes/superfood-salad/",
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

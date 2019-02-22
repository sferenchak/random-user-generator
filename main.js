const img = document.querySelector("#avatar");
const fullname = document.querySelector("#fullname");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const city = document.querySelector("#city");
const btn = document.querySelector("#btn");
const url = "https://randomuser.me/api/";

btn.addEventListener("click", function() {
    fetchUser();
});

const fetchUser = function() {
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(printError);
};

function handleErrors(request) {
  if (!request.ok) {
    throw Error(request.status);
  }
  return request.json();
}

function parseJSON(json) {
  let results = json.results[0];
  let data = {
    img: results.picture.medium,
    name: results.name.first + results.name.last,
    username: results.login.username,
    email: results.email,
    city: results.location.city
  };
  return data;
}

function updateProfile(data) {
  img.src = data.img;
  fullname.innerHTML = data.name;
  username.innerHTML = data.username;
  email.innerHTML = data.email;
  city.innerHTML = data.city;
}

function printError(err) {
  console.log("There was an error...", err);
}

document.addEventListener("DOMContentLoaded", function(event) {
    fetchUser();
})
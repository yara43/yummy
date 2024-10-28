let data = document.getElementById("displayData");
let displaySearch = document.getElementById("displaySearch");
let slideBarInnerWidth = $(".slideBar-inner").outerWidth();;

$(document).ready(function() {
    DisplaySearchByName("").then(function() {
        $(".loading-sec").fadeOut(300);
        $(".loading-screen").fadeOut(500);
        $("body").css("overflow", "visible");
    })


});
$("#slideBar").css("left", -slideBarInnerWidth);
$(".spinner").fadeOut(function() {
    $("#loading").fadeOut(function() {
        $("body").css("overflow", "auto");
        $("#loading").remove();
    });
});

$("#slideBar i").click(function() {

    $(".links li").animate({ top: "300px" }, 100);
    if ($("#slideBar").css("left") == "0px") {
        closeNav();

    } else {
        openNav();

    }
});

function closeNav() {

    $("#slideBar").animate({ left: -slideBarInnerWidth }, 500);
    $(".open-close-i").addClass("fa-align-justify");
    $(".open-close-i").removeClass("fa-x");
    $(".links li").animate({ top: "300px" }, 600);
}


function openNav() {
    $("#slideBar").animate({ left: "0px" }, 500);
    $(".open-close-i").removeClass("fa-align-justify");
    $(".open-close-i").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({ top: "0px" }, (i + 6) * 100);
    }
}
async function getMeals() {
    $(".loading-sec").fadeIn(300);
    data.innerHTML = "";
    let mainMeals = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    let response = await mainMeals.json();
    displayMeals(response.meals.slice(0, 20));

    console.log(response.meals[0]);
}
getMeals();

function displayMeals(meal) {
    var cartons = "";
    for (let i = 0; i < meal.length; i++) {
        cartons += `
        <div class="col-md-3 ">
        <div onclick="getMealDetails('${meal[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer ">
        <img src="${meal[i].strMealThumb}" class="w-100 " alt="">
        <div class="layer position-absolute d-flex  align-items-center text-black p-2 rounded-3">
        <h3>${meal[i].strMeal}</h3>
        </div>
        </div>
    </div>
        `;
    }
    data.innerHTML = cartons;
}

async function getMealDetails(mealID) {
    closeNav();
    $(".loading-sec").fadeIn(300);
    data.innerHTML = "";
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    );
    response = await response.json();

    displayMealDetails(response.meals[0]);
    $(".loading-sec").fadeOut(300);
}

function displayMealDetails(meal) {

    displaySearch.innerHTML = "";
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += ` <li class= "alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      }${meal[`strIngredient${i}`]}</li>`;
    }
  }
  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let tagStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagStr += `
        <li class="alert alert-danger me-2 py-1 px-2">${tags[i]}</li>`;
  }

  let cartoons = "";
  cartoons += ` 
    <div class=" col-md-5 col-lg-4 text-white">
    <div class="pic w-100 ">
    <img src="${meal.strMealThumb}" class="rounded-2 w-100" alt="">
    </div>
    <h2>${meal.strMeal}</h2>
    </div>
    <div class=" col-md-7 col-lg-8 text-white">
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
    <h3><span class="fw-bolder">Category  : </span>${meal.strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="comp list-unstyled d-flex g-3 flex-wrap">${ingredients}</ul>
    <h3 class="mb-3">Tags :</h3>
    <ul class="list-unstyled d-flex ">${tagStr}</ul>
<a href="${meal.strSource}" target="_blank" class="btn btn-success me-1" rel="source">Source</a>
<a href="${meal.strYoutube}" target="_blank" class="btn btn-danger"  rel="video">Youtube</a>
</div>`;
  data.innerHTML = cartoons;
}
async function getCategories() {
     $(".loading-sec").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  console.log(response.categories);
  displayCategories(response.categories);
   $(".loading-sec").fadeOut(300);
}

function displayCategories(meal) {
  let cartona = ``;
  for (let i = 0; i < meal.length; i++) {
    cartona += `<div class="col-md-4 col-lg-3">
                <div onclick="getCategoryMeals('${
                  meal[i].strCategory
                }')"  class="position-relative cursor-pointer meal overflow-hidden">
                    <img src="${
                      meal[i].strCategoryThumb
                    }"class="w-100 rounded-3 meal-img" alt="">
                    <div class="layer position-absolute d-flex flex-column justify-data-center text-center text-black p-2 rounded-3 ">
                        <h3 >${meal[i].strCategory}</h3>
                       <p>${meal[i].strCategoryDescription
                         .split(" ")
                         .slice(0, 8)
                         .join(" ")}</p>
                    </div>
                </div>
            </div>`;
  }

  data.innerHTML = cartona;
}

$("#categories").click(function () {
      closeNav();
  getCategories();
  displaySearch.innerHTML = "";

});
// ----------------------------------------------------------------
// Api used to get Area//SECTION
async function getAreas() {
     $(".loading-sec").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  console.log(response.meals);
  displayArea(response.meals.slice(0, 20));
   $(".loading-sec").fadeOut(300);
}

$("#area").click(function () {
      closeNav();
  getAreas();
  displaySearch.innerHTML = "";
});
// ----------------------------------------------------------------
// Api used to Display Area//SECTION
function displayArea(meal) {
  let cartona = ``;
  for (let i = 0; i < meal.length; i++) {
    console.log(i);
    cartona += `<div class="col-md-3">
                <div onclick="getAreaMeals('${meal[i].strArea}')" class="text-center cursor-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3 >${meal[i].strArea}</h3>
                </div>
            </div>`;
  }
  data.innerHTML = cartona;
} // ----------------------------------------------------------------
// Api used to GET Ingredients//SECTION
async function getIngredients() {
     $(".loading-sec").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  console.log(response.meals);
  displayIngredients(response.meals.slice(0, 20));
   $(".loading-sec").fadeOut(300);
}

$("#ingredient").click(function () {
      closeNav();
  getIngredients();
  displaySearch.innerHTML = "";
});
// ----------------------------------------------------------------
// Api used to Display Ingredients//SECTION
function displayIngredients(meal) {

  let cartona = ``;
  for (let i = 0; i < meal.length; i++) {
    console.log(i);

    cartona += `<div class="col-md-3 ">
                <div  onclick="getIngredientsMeals('${
                  meal[i].strIngredient
                }')" class="text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3 >${meal[i].strIngredient}</h3>
                <p>${meal[i].strDescription
                  .split(" ")
                  .slice(0, 15)
                  .join(" ")}</p>
                </div>
            </div>`;
  }
  data.innerHTML = cartona;
}
async function getCategoryMeals(category) {
  
     $(".loading-sec").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  console.log(response.meals);
  displayMeals(response.meals.slice(0, 20));
   $(".loading-sec").fadeOut(300);
}
// ----------------------------------------------------------------
// Api used to get AreaMeals//SECTION
async function getAreaMeals(area) {

     $(".loading-sec").fadeIn(300);
  data.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  console.log(response.meals);
  displayMeals(response.meals.slice(0, 20));
   $(".loading-sec").fadeOut(300);
}
// ----------------------------------------------------------------
// Api used to get Ingredients Meals//SECTION
async function getIngredientsMeals(ingredient) {
  closeNav();
     $(".loading-sec").fadeIn(300);
  data.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  response = await response.json();
  console.log(response.meals);
  displayMeals(response.meals.slice(0, 20));
   $(".loading-sec").fadeOut(300);
}
// ----------------------------------------------------------------
// display SearchSec //SECTION
function displaySearchSec() {
  displaySearch.innerHTML = `<div class="row py-4 searchSec">
                <div class="col-md-6 ">

                    <input onkeyup="DisplaySearchByName(this.value)" title="search" type="text" class="form-control bg-transparent text-white" placeholder="Search By Name">
                </div>
                <div class="col-md-6 ">

                    <input onkeyup="DisplaySearchByNameLetter(this.value)" maxlength="1" title="search" type="search" class="form-control bg-transparent text-white " placeholder="Search By First Letter">
                </div>
            </div>`;
  data.innerHTML = "";
}
$("#search").click(function () {
      closeNav();
  displaySearchSec();
}); // ----------------------------------------------------------------
// Api used to SEARCH BY Name//SECTION
async function DisplaySearchByName(term) {
  closeNav();
     $(".loading-sec").fadeIn(300);
  console.log(term);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  console.log(response.meals);
  response.meals ? displayMeals(response.meals) : displayMeals([]);
   $(".loading-sec").fadeOut(300);
}
// ----------------------------------------------------------------
// Api used to SEARCH BY Letter//SECTION
async function DisplaySearchByNameLetter(term) {
  closeNav();
     $(".loading-sec").fadeIn(300);
  console.log(term);
  if (term == "") {
    term = "b";
  }
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();
  console.log(response.meals);
  response.meals ? displayMeals(response.meals) : displayMeals([]);
   $(".loading-sec").fadeOut(300);
}
// ----------------------------------------------------------------
// CONTACT NAV Click//SECTION
$("#contactSec").click(function () {
    showContacts();
  closeNav();
  $(".open-close-i").addClass("fa-align-justify");
  $(".open-close-i").removeClass("fa-x");


});
// ----------------------------------------------------------------
//  SHOW CONTACT SEC //SECTION
function showContacts() {
  data.innerHTML = ` <div class="min-vh-100 d-flex justify-content-center align-items-center ">
                    <div class="contact-content ">
                        <div class="container text-center ">
                            <div class="row g-4 ">
                                <div class="col-md-6 ">
                                    <input id="nameData" title="name" type="text" class="form-control text-black " placeholder="Enter Your Name">
                                    <div id="nameInvalid" class="alert alert-danger w-100 mt-2  d-none">
                                        Special characters and numbers not allowed
                                    </div>
                                </div>
                                <div class="col-md-6 ">
                                    <input id="emailData" title="Email" type="email" class="form-control text-black" placeholder="Enter Your Email">
                                    <div id="emailInvalid" class="alert alert-danger w-100 mt-2  d-none">
                                        Email not valid *exemple@yyy.zzz
                                    </div>
                                </div>
                                <div class="col-md-6 ">
                                    <input id="phoneData" title="Phone" type="number" class="form-control text-black " placeholder="Enter Your Phone">
                                    <div id="phoneInvalid" class="alert alert-danger w-100 mt-2  d-none">
                                        Enter valid Phone Number
                                    </div>
                                </div>
                                <div class="col-md-6 ">
                                    <input id="ageData" title="Age" type="number" class="form-control text-black" placeholder="Enter Your Age ">
                                    <div id="ageInvalid" class="alert alert-danger w-100 mt-2  d-none">
                                        Enter valid age
                                    </div>
                                </div>
                                <div class="col-md-6 ">
                                    <input id="passwordData" title="password" type="password" class="form-control text-black "placeholder="Enter Your Password">
                                    <div id="passwordInvalid" class="alert alert-danger w-100 mt-2  d-none">
                                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <input id="rePasswordData" title="rePassword" type="password" class="form-control text-black" placeholder="Repassword">
                                    <div id="rePasswordInvalid" class="alert alert-danger w-100 mt-2  d-none">
                                        Enter valid rePassword
                                    </div>
                                </div>
                            </div>
                            <button disabled id="submitBtn" class="btn btn-outline-danger mt-3">Submit</button>
                        </div>
                    </div>
                </div>`;
  $("input").keyup(function () {
    validation();
  });
  $("#nameData").focus(function () {
    nameInputFocused = true;
    console.log("hello");
  });
  $("#emailData").focus(function () {
    emailInputFocused = true;
    console.log("hello");
  });

  $("#phoneData").focus(function () {
    phoneInputFocused = true;
    console.log("hello");
  });

  $("#ageData").focus(function () {
    ageInputFocused = true;
    console.log("hello");
  });

  $("#passwordData").focus(function () {
    passwordInputFocused = true;
    console.log("hello");
  });

  $("#rePasswordData").focus(function () {
    rePasswordInputFocused = true;
    console.log("hello");
  });
}

let nameInputFocused = false;
let emailInputFocused = false;
let phoneInputFocused = false;
let ageInputFocused = false;
let passwordInputFocused = false;
let rePasswordInputFocused = false;

function validation() {
    if (nameInputFocused == true) {
        if (validName() == true) {
        document.getElementById("nameInvalid").classList.replace("d-block", "d-none");
    }   else {
        document.getElementById("nameInvalid").classList.replace("d-none", "d-block");
    }
    }
    if (emailInputFocused == true) {
        if (validEmail() == true) {
        document.getElementById("emailInvalid").classList.replace("d-block", "d-none");
    }   else {
        document.getElementById("emailInvalid").classList.replace("d-none", "d-block");
      }
    }
    if (phoneInputFocused == true) {
        if (validPhone() == true) {
        document.getElementById("phoneInvalid").classList.replace("d-block", "d-none");
    }    else {document.getElementById("phoneInvalid").classList.replace("d-none", "d-block");
    }
    }
    if (ageInputFocused == true) {
    if (validAge() == true) {
        document.getElementById("ageInvalid").classList.replace("d-block", "d-none");
    } else {
        document.getElementById("ageInvalid").classList.replace("d-none", "d-block");
    }
    }
    if (passwordInputFocused == true) {
        if (validPassword() == true) {
        document.getElementById("passwordInvalid").classList.replace("d-block", "d-none");
    } else {
        document.getElementById("passwordInvalid").classList.replace("d-none", "d-block");
    }
    }
    if (rePasswordInputFocused == true) {
      if (rePasswordValidation() == true) {
        document.getElementById("rePasswordInvalid").classList.replace("d-block", "d-none");
    }   else {
        document.getElementById("rePasswordInvalid").classList.replace("d-none", "d-block");
        }
    }
    if (
    validName() &&
    validEmail() &&
    validPhone() &&
    validAge() &&
    validPassword() &&
    rePasswordValidation()
  ) {
    console.log("valid");
    $("#submitBtn").removeAttr("disabled");
  } else {
    console.log("invalid");
    $("#submitBtn").attr("disabled", "true");
  }
  function validName() {
    let x = document.getElementById("nameData").value;
    console.log(x);
    let regex = /^[a-zA-Z ]+$/;
    return regex.test(x);
  }
  function validEmail() {
    let x = document.getElementById("emailData").value;
    console.log(x);
    let regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(x);
  }
  function validPhone() {
    let x = document.getElementById("phoneData").value;
    console.log(x);
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test(x);
  }
  function validAge() {
    let x = document.getElementById("ageData").value;
    console.log(x);
    let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|)$/;
    return regex.test(x);
  }
  function validPassword() {
    let x = document.getElementById("passwordData").value;
    console.log(x);
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(x);
  }

  function rePasswordValidation() {
    return (
      document.getElementById("rePasswordData").value ==
      document.getElementById("passwordData").value
    );
  }
}
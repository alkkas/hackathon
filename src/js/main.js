const name = document.querySelector("#name");
const phone = document.querySelector("#phone");
const form = document.querySelector("form");
const submit = document.querySelector(".form-submit__btn");
const phonePattern =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

form.addEventListener("keydown", (event) => {
  if (
    name.value.length >= 3 &&
    name.value.length <= 20 &&
    phone.value.match(phonePattern)
  ) {
    submit.classList.remove("btn--disabled");
    submit.removeAttribute("disabled");
  } else {
    submit.classList.add("btn--disabled");
    submit.setAttribute("disabled", true);
  }
});

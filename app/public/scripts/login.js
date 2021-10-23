window.addEventListener('DOMContentLoaded', () => {
  let emailInput = document.querySelector("#email");
  let passwordInput = document.querySelector("#password");

  emailInput.addEventListener('focus', () => {
      emailInput.placeholder = "";
  });
  emailInput.addEventListener('blur', () => {
      emailInput.placeholder = "Email";
  });
  passwordInput.addEventListener('focus', () => {
      passwordInput.placeholder = "";
  });
  passwordInput.addEventListener('blur', () => {
    passwordInput.placeholder = "Password";
});


});
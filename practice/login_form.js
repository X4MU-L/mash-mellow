const selectElements = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`Something went wrong, make sure that ${selector}
  exists or is typed correctly`);
};

selectElements("#sign-up-btn").addEventListener("click", (e) => {
  e.preventDefault();
  selectElements(".signsup-form").style.display = "block";
  selectElements(".login-form").style.display = "none";
});
selectElements("#sign-in-btn").addEventListener("click", (e) => {
  selectElements(".login-form").style.display = "block";
  selectElements(".signsup-form").style.display = "none";
});

function setLoginMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".login-error");
  messageElement.textContent = message;
  messageElement.classList.remove("message-error", "message-success");
  messageElement.classList.add(`message-${type}`);
}

function setSignUpMessage(formElement, type, message) {
  const messageElement = formElement.querySelector("#signup-error");
  messageElement.textContent = message;
  messageElement.classList.remove("message-error", "message-success");
  messageElement.classList.add(`message-${type}`);
}
function setInputError(inputElement, message) {
  const nextError = inputElement.parentElement;
  nextError.classList.add("input-error-focus");
  // const errMessage = nextError.querySelector(".error-message");
  // errMessage.textContent = message;
}

const validateEmail = (typedEmail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(typedEmail)) {
    return true;
  }
  return false;
};

document.querySelectorAll(".input").forEach((inputElement) => {
  inputElement.addEventListener("blur", () => {
    selectElements("#login").addEventListener("click", () => {
      inputElement.parentElement.classList.remove("input-error-focus");
      setLoginMessage(selectElements(".login-form"), "", ``);
      const userName = selectElements("#username").value;
      const password = selectElements("#pwd").value;

      if (userName.length < 8) {
        setInputError(inputElement);
        setLoginMessage(
          selectElements(".login-form"),
          "error",
          `username must be more that 8 characters`
        );
        return false;
      }
      if (password.trim() === "") {
        setInputError(inputElement);
        setLoginMessage(
          selectElements(".login-form"),
          "error",
          `please enter password`
        );
        return false;
      }

      const getUser = JSON.parse(localStorage.getItem("newUser"));
      console.log({getUser,userName,password})
      // if (userName.toString() !== getUser.createUserName.toString() ||
      if (userName === getUser?.createEmail && password === getUser?.createPassword) {
          setLoginMessage(
            selectElements(".login-form"),
            "success",
            `login succesful ✔`
          );
          setTimeout(() => {
            window.location.href = "./new2.html";
          }, 2000);
        }else{
        setLoginMessage(
          selectElements(".login-form"),
          "error",
          `incorrect username or password`
        );
      } 
    });
    selectElements(".signs-up").addEventListener("click", () => {
      localStorage.removeItem("newUser");
      inputElement.parentElement.classList.remove("input-error-focus");
      setSignUpMessage(selectElements(".signsup-form"), "", ``);
      const fullName = selectElements("#fullname").value;
      const createEmail = selectElements("#email").value;
      const createUserName = selectElements("#create-username").value;
      const createPassword = selectElements("#createpwd").value;
      const confirmPassword = selectElements("#confirmpwd").value;
      if (fullName.trim().length < 3) {
        setInputError(inputElement);
        setSignUpMessage(
          selectElements(".signsup-form"),
          "error",
          `please enter your fullname`
        );
        return false;
      }
      if (createEmail.trim() === "") {
        setInputError(inputElement);
        setSignUpMessage(
          selectElements(".signsup-form"),
          "error",
          `please enter your email`
        );
        return false;
      }
      const isValid = validateEmail(createEmail);
      if (!isValid) {
        setInputError(inputElement);
        setSignUpMessage(
          selectElements(".signsup-form"),
          "error",
          `please enter a valid Email`
        );
        return false;
      }
      if (createUserName.trim().length < 8) {
        setInputError(inputElement);
        setSignUpMessage(
          selectElements(".signsup-form"),
          "error",
          `username must be more that 8 characters`
        );
        return false;
      }
      if (createPassword.trim().length === 0) {
        setInputError(inputElement);
        setSignUpMessage(
          selectElements(".signsup-form"),
          "error",
          `please create password`
        );
        return false;
      } else if (createPassword.trim().length < 8) {
        setInputError(inputElement);
        setSignUpMessage(
          selectElements(".signsup-form"),
          "error",
          `password must be up to 8 characters`
        );
        return false;
      } else if (confirmPassword.trim().length < 0) {
        setInputError(inputElement);
        setSignUpMessage(
          selectElements(".signsup-form"),
          "error",
          `confirm password`
        );
        return false;
      }
      if (confirmPassword !== createPassword) {
        setInputError(inputElement);
        setSignUpMessage(
          selectElements(".signsup-form"),
          "error",
          `password does not match`
        );
        return false;
      } else {
        const user = {
          fullName,
          createEmail,
          createUserName,
          createPassword,
          confirmPassword,
        };
        const setUser = localStorage.setItem("newUser", JSON.stringify(user));
        setTimeout(() => {
          selectElements(".signsup-form")
            .querySelector("#signup-error")
            .classList.remove("message-error");
          setSignUpMessage(
            selectElements(".signsup-form"),
            "success",
            `Account Successful created ✔`
          );
          setTimeout(() => {
            window.location.href = "./new2.html";
          }, 2000);
        }, 1000);
      }
    });
  });
});

import { fetchApi } from "./utils.js";

// seleccionamos el boton de ingresar para autenticar los datos ingresados por el
// usuario
document.getElementById("btn_login").addEventListener("click", (event) => {
  event.preventDefault();
  authLogin();
});

const authLogin = async () => {
  const emailField = document.getElementById("email").value;
  const passwordField = document.getElementById("password").value;
  await fetchUser(emailField, passwordField);
};

// una vez tengamos el correo y contraseña realizamos el fetch, almacenamos en memoria
// el token y el usuario
const fetchUser = async (email, password) => {
  const res = await fetchApi(
    "POST",
    "login",
    JSON.stringify({ email: email, password: password }),
    { "Content-Type": "application/json" }
  );
  if (res && res?.accessToken?.stsTokenManager?.accessToken) {
    localStorage.setItem(
      "accessToken",
      JSON.stringify(res?.accessToken?.stsTokenManager?.accessToken)
    );
    localStorage.setItem("user", JSON.stringify(res));
    window.location.replace("/grupos/grupos.html");
  } else {
    localStorage.setItem("accessToken", JSON.stringify({ accessToken: false }));
    const error = document.getElementById("error");
    error.innerText =
      "No se ha podido ingresar a la cuenta, por favor ingrese nuevamente.";
  }
};

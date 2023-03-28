import { fetchApi } from "../utils.js";

let token;

// buscamos los grupos una vez obtenido el token de acceso
const fetchGrupos = async (accesToken) => {
  const arrayGrupos = await fetchApi("GET", "grupos", null, {
    "Content-Type": "Application/json",
    Authorization: `bearer ${accesToken}`,
  });
  return arrayGrupos
    ? displayGrupos(arrayGrupos)
    : alert("No se ha logrado encontrar los grupos.");
};

// buscamos los miembros del grupo pasado a través del parámetro
const fetchMiembros = async (grupoId) => {
  const res = await fetchApi("GET", `grupos/${grupoId}`, null, {
    "Content-Type": "Application/json",
    Authorization: `bearer ${token}`,
  });
  res
    ? localStorage.setItem(
        "miembros",
        JSON.stringify(res)
      )(window.location.replace("/miembros/miembros.html"))
    : alert("No se ha podido encontrar los usuarios, intente nuevamente.");
};

// renderizamos los grupos en la lista vacia del html
const displayGrupos = (arrayGrupos) => {
  // lista vacio
  const base = document.getElementById("grupos_list");
  arrayGrupos.map((grupo) => {
    // creamos li
    const li = document.createElement("li");
    li.className = "carta";
    // creamos span
    const span = document.createElement("span");
    span.className = "grupos";
    span.innerText = grupo.descripcion;
    // creamos otro span
    const span1 = document.createElement("span");
    span1.className = "grupos1";
    span1.innerText = "Ver miembros";
    // agregamos los elementos creados al li
    li.appendChild(span);
    li.appendChild(span1);
    // agregamos un evento, que cuando hagamos click va a realizar una funcion para ver los miembros
    li.addEventListener("click", () => fetchMiembros(grupo.id));
    return base.appendChild(li);
  });
};

// chequeamos si tenemos el token de acceso en memoria
const checkAccessToken = () => {
  const error = document.getElementById("error1");
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    fetchGrupos(JSON.parse(accessToken));
    token = JSON.parse(accessToken);
  } else {
    alert("¡Debe ingresar a su cuenta de adviters para ver los grupos!");
  }
};

checkAccessToken();

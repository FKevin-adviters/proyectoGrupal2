import { checkUserLogged } from "../utils.js";

const displayMiembros = (arrayMiembros) => {
  const base = document.getElementById("miembros_list");
  return arrayMiembros.map((miembro) => {
    const { apellido, imagen, nombre, telefono, email, descripcion } = miembro;

    const li = document.createElement("li");
    li.className = "miembro_item";
    // IMAGEN O PLACEHOLDER
    const img = document.createElement("img");
    img.src =
      imagen ||
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
    img.alt = `${nombre} ${apellido}`;
    img.className = "miembro_img";
    // TITULO CON NOMBRE Y APELLIDO
    const h2 = document.createElement("h2");
    h2.innerText = `${nombre} ${apellido}`;
    h2.className = "miembro_title";
    // NUMERO DE TELEFONO DE LA PERSONA
    const span = document.createElement("span");
    span.innerText = telefono;
    span.className = "miembro_tel";
    // EMAIL DE LA PERSONA
    const span2 = document.createElement("span");
    span.innerText = email;
    span.className = "miembro_email";
    // DESCRIPCION SI TIENE SU PERFIL
    const p = document.createElement("p");
    p.innerText = descripcion || "No tiene descripción.";
    p.className = "miembro_des";
    const arr = [img, h2, span, span2, p].forEach((elem) =>
      li.appendChild(elem)
    );
    return base.appendChild(li);
  });
};

const checkMiembros = () => {
  if (localStorage.getItem("miembros")) {
    return displayMiembros(JSON.parse(localStorage.getItem("miembros")));
  } else {
    return alert(
      "¡Debe ingresar a su cuenta de adviters y seleccionar un grupo!"
    );
  }
};

checkUserLogged();
checkMiembros();

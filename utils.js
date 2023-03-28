const fetchApi = async (metodo = "GET", endpoint, body, headers) => {
  let res;
  if ((metodo === "POST" || metodo === "PUT") && body) {
    res = await fetch(`https://bootcamp-adviters.herokuapp.com/${endpoint}`, {
      method: metodo,
      body: body,
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch(() => (res = false));
  } else {
    res = await fetch(`https://bootcamp-adviters.herokuapp.com/${endpoint}`, {
      method: metodo,
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch(() => (res = false));
  }

  return res;
};

export { fetchApi };

// chequea si tenemos el user del localstorage para poder renderizar en el navbar
// el nombre e imagen si tiene
export const checkUserLogged = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const nav = document.getElementById("navbar");
    const li = document.createElement("li");
    li.innerText = JSON.parse(user)?.nombre;
    nav.appendChild(li);
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return;
  }
};

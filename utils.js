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
// const checkUserLogged = () => {
//   if (localStorage.getItem("user")) {
//     return JSON.parse(localStorage.getItem("user"));
//   } else {
//     return false;
//   }
// };

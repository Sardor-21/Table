const url = "https://jsonplaceholder.typicode.com/users";
const title = document.getElementById("title");
const email = document.getElementById("email");
const address = document.getElementById("address");
const suite = document.getElementById("suite");
const phone = document.getElementById("phone");
const website = document.getElementById("website");
const group = document.getElementById("group");
const company = document.getElementById("company");
const table = document.getElementById("table");

const getInfo = async () => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Xatolik yuz berdi" + error);
    return [];
  }
};
const tbody = document.getElementById("tbody");
tbody.innerHTML = "";

const setInfo = async () => {
  const res = await getInfo();
  console.log(res);

  res.map((value, index) => {
    const newTd = document.createElement("tr");
    newTd.innerHTML = `
    <td><p class="name">${value.name}</p> <p <p class="username">${value.username}</p> </td>
        <td><a href="#">${value.email}</a></td>
        <td>${value.address.city}</td>
        <td>${value.address.street}</td>
        <td>${value.phone}</td>
        <td><a href="#">${value.website}</a></td>
        <td>${value.company.name}</td>
        <td>${value.company.catchPhrase}</td>
        <td>
        <button class="btn btn-success" onclick="editTask(${value.id})"><i class="fas fa-pencil-alt"></i></button>
        <button class="btn btn-danger" onclick="deletValue()"><i class="fas fa-times-circle"></i></button>
        <button class="btn btn-danger" onclick="deleteTask(${value.id})"><i class="fas fa-trash"></i></button>
        </td>
`;
    tbody.appendChild(newTd);
  });
};
setInfo();

const postTr = () => {
  const title = document.getElementById("title").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const suite = document.getElementById("suite").value;
  const phone = document.getElementById("phone").value;
  const website = document.getElementById("website").value;
  const group = document.getElementById("group").value;
  const company = document.getElementById("company").value;
  axios
    .post(`https://jsonplaceholder.typicode.com/users`, {
      name: title,
      email: email,
      address: address,
      suite: suite,
      phone: phone,
      website: website,
      group: group,
      company: company,
    })
    .then((res) => {
      console.log(res);
      setInfo();
    })
    .catch((error) => {
      console.error(error);
      alert("Xatolik yuz berdi");
    });
  deletValue();
};

let editingTask;
const editTask = async (id) => {
  try {
    const res = await axios.get(url + "/" + id);
    title.value = res.data.name;
    email.value = res.data.email;
    address.value = res.data.address.city;
    suite.value = res.data.address.street;
    phone.value = res.data.phone;
    website.value = res.data.website;
    group.value = res.data.company.name;
    company.value = res.data.company.catchPhrase;
    editingTask = res.data;
  } catch (error) {
    console.error("Xatolik yuz berdi" + error);
  }
};
const putTr = () => {
  console.log(JSON.stringify(editingTask));
  axios
    .put(`https://jsonplaceholder.typicode.com/users` + "/" + editingTask.id, {
      name: title.value,
      email: email.value,
      address: address.value,
      suite: suite.value,
      phone: phone.value,
      website: website.value,
      group: group.value,
      company: company.value,
    })
    .then((res) => {
      console.log(res);
      setInfo();
    })
    .catch((error) => {
      console.error(error);
      alert("Xatolik yuz berdi");
    });
  deletValue();
};

const deletValue = () => {
  document.getElementById("title").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
  document.getElementById("suite").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("website").value = "";
  document.getElementById("group").value = "";
  document.getElementById("company").value = "";
};

const valid = () => {
  if (
    title.value == 0 &&
    email.value == 0 &&
    address.value == 0 &&
    suite.value == 0 &&
    phone.value == 0 &&
    website.value == 0 &&
    group.value == 0 &&
    company.value == 0
  ) {
    error.innerHTML = `Malumotlarni to'liq kiriting   <i class="far fa-times-circle"></i>`;
    error1.innerHTML = ``;
  } else {
    error.innerHTML = "";
    error1.innerHTML = `Malumot kiritildi <i class="far fa-check-circle"></i>`;
  }
};
const urluser = "https://jsonplaceholder.typicode.com/users";

const deleteTask = async (id) => {
  try {
    const res = await axios.delete(urluser + "/" + id);
    if (res.status == 200) {
      alert("Muvaffaqiyatli O'chirildi");
    } else {
      console.error("error");
      throw "xatolik yuz berdi";
    }
    return res;
  } catch (error) {
    console.log("Xatolik yuz berdi");
    alert("error");
  }
};

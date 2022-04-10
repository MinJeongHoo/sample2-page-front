const baseUrl = "http://localhost:3000";
const insertData = async () => {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  if (!name || !price) {
    alert("데이터를 입력하시오~!!");
    return;
  }
  const data = await fetch(`${baseUrl}/insert`, {
    method: "POST", // or 'PUT'
    body: JSON.stringify({ name, price }), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await data.json();
  console.log(result);
  makeHtml(result);
};

const deleteBurger = async () => {
  const data = await fetch(`${baseUrl}/delete`, {
    method: "DELETE",
  });
  const result = await data.json();
  if (result.status == "SUCCESS") {
    location.reload();
  }
};

const makeHtml = (data) => {
  const conatianer = document.querySelector("#conatianer");
  let html = "";
  if (data.length > 0) {
    data.forEach((item) => {
      html += `
            <div>
                <p>${item.name}</p>
                <p>${item.price}</p>
            </div>
            `;
    });
  } else {
    html = "<div>데이터가 없습니다.</div>";
  }
  conatianer.innerHTML = html;
};

const init = async () => {
  const url = `${baseUrl}/`;
  const data = await fetch(url);
  const result = await data.json();
  makeHtml(result);
};
init();

document.addEventListener("DOMContentLoaded", () => {
  const updateBtn = document.querySelector(".update_btn");
  const deleteBtn = document.querySelector(".delete_btn");
  updateBtn.addEventListener("click", async () => {
    insertData();
  });
  deleteBtn.addEventListener("click", async () => {
    deleteBurger();
  });
});

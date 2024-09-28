//User
//Adds a new user
async function handleAddUser(ev) {
  ev.preventDefault();
  const name = ev.target.elements.name.value;
  const email = ev.target.elements.email.value;
  const password = ev.target.elements.password.value;
  ev.target.reset();
  const newUser = { name: name, email: email, password: password };
  await fetch("/user/addUser", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if(data.isExits) {
      alert("User name already exits")
    }
  })
}

//Logs in
async function handleLogInUser(ev) {
  ev.preventDefault();
  const name = ev.target.elements.name.value;
  const password = ev.target.elements.password.value;
  ev.target.reset();

  await fetch("/user/logIn", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name:name,password:password}),
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if(data.admin){
      window.location.href = "./addProduct.html"
    }
    if(data.message == "Not found") {
      alert("User name or password are incorrect")
    }
    if(data.message == "Found" && !data.admin) {
      const helloMessageDiv = document.getElementById("helloMessage");
      helloMessageDiv.innerHTML = `Hello ${data.user.name}`
      document.getElementById("logIn_logOut").innerHTML = 
      `
        <button onclick="handleLogOut()">Log Out</button>
        <a href="./checkout.html"><button>To check out</button></a>
      `
      document.getElementById("signUpForm").style.display = "none"
    }
  })

  await fetch("/userProduct/getUserProducts", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
  })
}

//Logs out
async function handleLogOut() {
  await fetch("/user/logOut", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .then((data) => {
    if(data.isLoggedOut) {
      // const html = 
      // `
      //   <form method="get" onsubmit="handleLogInUser(event)">
      //       <input type="text" name="name" placeholder="Name" required>
      //       <input type="password" name="password" placeholder="password" required>
      //       <input type="submit" value="Send">
      //   </form>
      // `
      // document.getElementById("logIn_logOut").innerHTML = html
      // document.getElementById("helloMessage").innerHTML = "Hello"
      window.location.href = "./index.html"
      loadStore()
    }
  })
}



//Product
//Load store
async function loadStore() {
  await fetch("/product/getProducts", {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data.allProducts);
    const products = data.allProducts;
    const allProductsDiv = document.getElementById("allProducts");
    const html = products.map((product) => {
      if(product.amount > 0) {
        return `
        <div class="product">
          <h2 class="productTitle">${product.title}</h2>
          <img class="productImg" src="${product.img}" alt="">
          <p class="productText">${product.description}</p>
          <h5 class="productPrice">${product.price}$</h5>
          <h5 class="productAmount">${product.amount} in stock</h5>
          <h5 class="productCategory">Category: ${product.category}</h5>
          <button onclick="handleAddToCart('${product._id}')">Add to cart</button>
          <button onclick="getProductToProductPage('${product._id}')">View</button>
        </div>
      `
      } else {
        return `
        <div class="product">
          <h2 class="productTitle">${product.title}</h2>
          <img class="productImg" src="${product.img}" alt="">
          <p class="productText">${product.description}</p>
          <h5 class="productPrice">${product.price}$</h5>
          <h5 class="productAmount">${product.amount} in stock</h5>
          <h5 class="productCategory">Category: ${product.category}</h5>
          <button onclick="getProductToProductPage('${product._id}')">View</button>
        </div>
      ` 
      }
    }).join(" ")
    allProductsDiv.innerHTML = html;
  })

  await fetch("/user/isLoggedIn", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .then((data) => {
    if(data.isFound) {
      const helloMessageDiv = document.getElementById("helloMessage");
      helloMessageDiv.innerHTML = `Hello ${data.user.name}`
      document.getElementById("logIn_logOut").innerHTML = 
        `
          <button onclick="handleLogOut()">Log Out</button>
          <a href="./checkout.html"><button>To check out</button></a>
        `
      document.getElementById("signUpForm").style.display = "none"
    }
  })
}

//Load admin page
async function loadAdminStore() {
    await fetch("/product/getProducts", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data.allProducts);
    const products = data.allProducts;
    const allProductsDiv = document.getElementById("allProducts");
    const html = products.map((product) => {
      return `
        <div class="product">
          <h2 class="productTitle">${product.title}</h2>
          <img class="productImg" src="${product.img}" alt="">
          <p class="productText">${product.description}</p>
          <h5 class="productPrice">${product.price}$</h5>
          <h5 class="productAmount">${product.amount} in stock</h5>
          <h5 class="productCategory">Category: ${product.category}</h5>
          <button onclick="handleUpdateProduct('${product.title}', '${product.description}', '${product.price}', '${product.amount}', '${product.img}', '${product._id}')">Uptade ${product.title}</button>
          <button onclick="handleDeleteProduct('${product._id}')">Delete ${product.title}</button>
        </div>
      `
    }).join(" ")
    allProductsDiv.innerHTML = html;
  })
}

//Adds product
async function handleAddProduct(ev) {
  ev.preventDefault();
  const title = ev.target.elements.title.value;
  const description = ev.target.elements.description.value;
  const price = ev.target.elements.price.value;
  const amount = ev.target.elements.amount.value;
  const img = ev.target.elements.img.value;
  const category = ev.target.elements.category.value;
  ev.target.reset();
  const newProduct = { title: title, description: description, price: price, amount:amount, img:img, category:category };
  await fetch("/product/addProduct", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if(data.isExits) {
      alert("Product already exits")
    } else {
      loadAdminStore()
    }
  })
}

//Updates product
function handleUpdateProduct(title,description,price,amount,img,id) {
  window.location.href = '#updateProduct'
  const updateDiv = document.getElementById("updateProduct");
  updateDiv.style.display = "block";
  updateDiv.innerHTML = 
    `
      <form method="post" onsubmit="handleUpdateProductHelper(event)">
            <input type="text" name="title" value="${title}">
            <textarea name="description" cols="10" rows="1">${description}</textarea>
            <input type="number" name="price" value="${price}">
            <input type="number" name="amount" value="${amount}">
            <input type="text" name="img" value="${img}">
            <select name="category">
              <option value="Fruits">Fruits</option>
              <option value="Dairy">Dairy</option>
              <option value="Hot Girls">Hot Girls</option>
            </select>
            <input type="text" name="_id" value="${id}" style="display: none;">
            <input type="submit" value="Send">
        </form>
    `;
}

async function handleUpdateProductHelper(ev) {
  ev.preventDefault();
  const title = ev.target.elements.title.value;
  const description = ev.target.elements.description.value;
  const price = ev.target.elements.price.value;
  const amount = ev.target.elements.amount.value;
  const img = ev.target.elements.img.value;
  const category = ev.target.elements.category.value;
  const _id = ev.target.elements._id.value;
  ev.target.reset();
  await fetch("/product/updateProduct", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title,description,price,amount,img,category,_id}),
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const updateDiv = document.getElementById("updateProduct");
    updateDiv.style.display = "none";
    window.location.href = "#top"
    loadAdminStore()
  })
}

//Delets product
async function handleDeleteProduct(id) {
  await fetch("/product/deleteProduct", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({_id: id}),
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    loadAdminStore()
  })
}

//Sets product cookie
async function getProductToProductPage(productId) {
  await fetch("/product/setProductCookie", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({productId: productId}),
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.location.href = "./productPage.html"
  })
}

//Load product page
async function loadProductPage() {
  await fetch("/product/getProductFromCookie", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const product = data.product
    const viewProductDiv = document.getElementById("viewProduct");
    const html = 
    `
      <div class="product">
        <h2 class="productTitle">${product.title}</h2>
        <img class="productImg" src="${product.img}" alt="">
        <p class="productText">${product.description}</p>
        <h5 class="productPrice">${product.price}$</h5>
        <h5 class="productAmount">${product.amount} in stock</h5>
        <h5 class="productCategory">Category: ${product.category}</h5>
      </div>
    `
    viewProductDiv.innerHTML = html;
  })
}

//Filter by category
async function handleCategorySearch() {
  const categoryFilterSearch = document.getElementById("categoryFilterSearch").value
  if(categoryFilterSearch == 'all products') {
    loadStore()
    return
  }
  await fetch("/product/getProductsByCategory", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({productsCategory: categoryFilterSearch}),
    })
    .then((res) => res.json())
    .then((data) => {
      const products = data.products;
      const allProductsDiv = document.getElementById("allProducts");
      const html = products.map((product) => {
        if(product.amount > 0) {
          return `
          <div class="product">
            <h2 class="productTitle">${product.title}</h2>
            <img class="productImg" src="${product.img}" alt="">
            <p class="productText">${product.description}</p>
            <h5 class="productPrice">${product.price}$</h5>
            <h5 class="productAmount">${product.amount} in stock</h5>
            <h5 class="productCategory">Category: ${product.category}</h5>
            <button onclick="handleAddToCart('${product._id}')">Add to cart</button>
            <button onclick="getProductToProductPage('${product._id}')">View</button>
          </div>
        `
        } else {
          return `
          <div class="product">
            <h2 class="productTitle">${product.title}</h2>
            <img class="productImg" src="${product.img}" alt="">
            <p class="productText">${product.description}</p>
            <h5 class="productPrice">${product.price}$</h5>
            <h5 class="productAmount">${product.amount} in stock</h5>
            <h5 class="productCategory">Category: ${product.category}</h5>
            <button onclick="getProductToProductPage('${product._id}')">View</button>
          </div>
        ` 
        }
      }).join(" ")
      allProductsDiv.innerHTML = html;
    })
  
    await fetch("/user/isLoggedIn", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.isFound) {
        const helloMessageDiv = document.getElementById("helloMessage");
        helloMessageDiv.innerHTML = `Hello ${data.user.name}`
        document.getElementById("logIn_logOut").innerHTML = 
          `
            <button onclick="handleLogOut()">Log Out</button>
            <a href="./checkout.html"><button>To check out</button></a>
          `
        document.getElementById("signUpForm").style.display = "none"
      }
    })
}


//User product(cart)
//Adds a product to cart
async function handleAddToCart(productId) {
  await fetch("/userProduct/addProductToCart", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({productId: productId}),
  })
  .then((res) => res.json())
  .then((data) => {
    if(data.isProductAdded){
      alert("Product added!")
    }
  })

  await fetch("/product/addProductToCart", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({productId: productId}),
  })
  .then((res) => res.json())
  .then((data) => {
    loadStore()
  })
}

//Load checkout page
async function loadCheckoutPage() {
  await fetch("/userProduct/getUserProducts", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .then(async (data) => {
    const allUseerProductsDiv = document.getElementById("allUseerProducts");
    if(!data.products[0]) {
      allUseerProductsDiv.innerHTML = 
      `
        <h2>Cart is empty!</h2>
      `
    } else {
      console.log(data)
      var productsAmount = [];
      var productsIds = [];
      for (let index = 0; index < data.products.length; index++) {
        productsIds[index] = data.products[index].productId;
        productsAmount[index] = data.products[index].amount;
      }

      var allProducts = [];
      for (let index = 0; index < productsIds.length; index++) {
        await fetch("/product/getProductById", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({productId: productsIds[index]}),
        })
        .then((res) => res.json())
        .then((data) => {
          allProducts[index] = data.product
        })
      }
      console.log(allProducts)
      const allUseerProductsDiv = document.getElementById("allUseerProducts");
      const html = allProducts.map((product,index) => {
        return `
          <div class="product">
            <h2 class="productTitle">${product.title}</h2>
            <img class="productImg" src="${product.img}" alt="">
            <p class="productText">${product.description}</p>
            <h5 class="productPrice">${product.price}$</h5>
            <h5 class="productAmount">Amount in cart: ${productsAmount[index]}</h5>
            <h5 class="productCategory">Category: ${product.category}</h5>
            <button onclick="handleRemoveFromCart('${product._id}')">Remove from cart</button>
          </div>
        `
      }).join(" ")
      allUseerProductsDiv.innerHTML = html
      console.log(allProducts[1])
      console.log(productsAmount)
    }
  })
}

//Removes product from cart
async function handleRemoveFromCart(productId) {
  await fetch("/userProduct/deleteFromCart", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({productId: productId}),
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    loadCheckoutPage()
  })

  await fetch("/product/removeProductFromCart", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({productId: productId}),
  })
  .then((res) => res.json())
  .then((data) => {
    loadStore()
  })
}
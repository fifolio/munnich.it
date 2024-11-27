// --- INITIALIZE CART FROM LOCAL STORAGE --- //
/**
 * Retrieves the cart from local storage and initializes it. 
 * If no cart is found, initializes an empty array.
 */
function initializeCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCart();
}

// --- STORE FETCHED DATA --- //
/**
 * Variables to store products fetched from an external API.
 */
let topSellingProducts = [];
let moreProducts = [];
let cart = [];

// --- FETCH PRODUCTS --- //
/**
 * Fetches product data from an external API and stores the top-selling and additional products in respective arrays.
 * Then it renders the products to the UI.
 */
function getProducts() {
  fetch('https://gist.githubusercontent.com/fifolio/9c0f61fd410a92b053e093877044a019/raw/e1fcd2b3de8cad6c3e446f62af73b18b32ef335f/products.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (data.topSelling) topSellingProducts = [...data.topSelling];
      if (data.more) moreProducts = [...data.more];
    })
    .then(renderProducts)
    .catch(error => console.error('Error fetching products:', error));
}

// --- RENDER PRODUCTS --- //
/**
 * Renders the fetched products to the UI, dividing them into 'Top Selling' and 'More Products' sections.
 */
function renderProducts() {
  const topSellingProductsElement = document.getElementById('topSelling');
  const moreProductsElement = document.getElementById('moreProducts');

  // Clear existing content in the product sections
  topSellingProductsElement.innerHTML = '';
  moreProductsElement.innerHTML = '';

  /**
   * Creates and returns a product card element.
   * @param {Object} product - The product data to be displayed.
   * @param {String} badge - The badge to display (e.g., 'Top Selling', 'More Products').
   * @returns {HTMLElement} - The product card element.
   */
  const createProductCard = (product, badge) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-key', product.id);

    productCard.innerHTML = `
      <div class="badge">${badge}</div>
      <div class="product-tumb">
        <img src="${product.img_url}" alt="${product.name}">
      </div>
      <div class="product-details">
        <span class="product-category">${product.category}</span>
        <h4><a href="#">${product.name}</a></h4>
        <p>${product.desc}</p>
        <div class="product-bottom-details">
          <div class="product-price">
            <small>${product.old_price || ''}</small>${product.price}
          </div>
          <div class="product-links">
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;

    return productCard;
  };

  // Render 'Top Selling' products
  topSellingProducts.forEach(product => {
    const productCard = createProductCard(product, 'Top Selling');
    topSellingProductsElement.appendChild(productCard);
  });

  // Render 'More Products' products
  moreProducts.forEach(product => {
    const productCard = createProductCard(product, 'More Products');
    moreProductsElement.appendChild(productCard);
  });

  // Add event listeners for 'Add to Cart' buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', handleAddToCart);
  });
}

// --- CHECK IF CART EMPTY --- //
/**
 * Checks if the cart is empty and updates the display accordingly (e.g., hide/show buttons).
 */
function checkOnCartState() {
  const displayControl = document.getElementById('displayControl');
  const deleteAll_btn = document.getElementById('deleteAll_btn');
  const checkout_btn = document.getElementById('checkout_btn');
  const cartEmpty = document.getElementById('cartEmpty');
  
  // Toggle visibility of elements based on cart state
  if (cart.length === 0) {
    displayControl.style.display = 'none';
    deleteAll_btn.style.display = 'none';
    checkout_btn.style.display = 'none';
    cartEmpty.style.display = 'block';
  } else {
    cartEmpty.style.display = 'none';
    displayControl.style.display = 'block';
    deleteAll_btn.style.display = 'block';
    checkout_btn.style.display = 'block';
  }  
}

// --- ADD TO CART FUNCTION --- //
/**
 * Handles adding a product to the cart. If the product already exists, it increases its quantity.
 * Updates the local storage and re-renders the cart.
 */
function handleAddToCart(e) {
  const productId = e.target.dataset.id;
  const product = [...topSellingProducts, ...moreProducts].find(p => p.id == productId);

  if (product) {
    const existingProductIndex = cart.findIndex(item => item.id == product.id);

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    checkOnCartState();
  }
}

// --- DELETE ITEM FROM CART --- //
/**
 * Handles the deletion of an item from the cart.
 * It removes the item from the cart array and updates the local storage.
 */
function handleDeleteItemFromCart(e) {
  const item = e.target.closest('.item');
  const dataKey = item.dataset.key;

  cart = cart.filter(cartItem => cartItem.id != dataKey);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  checkOnCartState();
}

// --- UPDATE ITEM COUNT --- //
/**
 * Updates the quantity of a product in the cart. It either increases or decreases the quantity.
 * Also updates the cart in local storage.
 * @param {Event} e - The event triggered by the button click.
 * @param {String} action - The action to perform ('add' or 'subtract').
 */
function changeItemCount(e, action) {
  const item = e.target.closest('.item');
  const dataKey = item.dataset.key;

  const itemIndex = cart.findIndex(cartItem => cartItem.id == dataKey);

  if (itemIndex > -1) {
    if (action === 'add') {
      cart[itemIndex].quantity += 1;
    } else if (action === 'subtract' && cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
}

// --- UPDATE CART UI --- //
/**
 * Updates the cart UI by displaying all items currently in the cart.
 * Each item is displayed with its details and actions (e.g., add/remove).
 */
function updateCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  const selectedItemsElement = document.querySelector('.selected_items');
  selectedItemsElement.innerHTML = '';

  // Render each item in the cart
  cart.forEach(item => {
    const itemCard = document.createElement('div');
    itemCard.className = 'item';
    itemCard.setAttribute('data-key', item.id);

    itemCard.innerHTML = `
      <div class="img">
        <img src="${item.img_url}" alt="${item.name}">
      </div>
      <div class="details">
        <div class="titleAndRemoveBtn">
          <h5>${item.name}</h5>
          <img id="deleteItem" src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="Delete" />
        </div>
        <h5 id="pre_price">
          <span>$${item.price}</span> x <span>${item.quantity}</span>
        </h5>
        <div class="addAndTotal">
          <div class="actions">
            <button id="subt">-</button>
            <span>${item.quantity}</span>
            <button id="add">+</button>
          </div>
          <h5 class="total">$${(item.price * item.quantity).toFixed(2)}</h5>
        </div>
      </div>
    `;

    itemCard.querySelector('#deleteItem').addEventListener('click', handleDeleteItemFromCart);
    itemCard.querySelector('#subt').addEventListener('click', e => changeItemCount(e, 'subtract'));
    itemCard.querySelector('#add').addEventListener('click', e => changeItemCount(e, 'add'));

    selectedItemsElement.appendChild(itemCard);
  });

  updateTotalPrice();
}

// --- UPDATE TOTAL PRICE --- //
/**
 * Calculates and updates the total price of all items in the cart.
 */
function updateTotalPrice() {
  const totalPriceElement = document.querySelector('.total-price');
  if (!totalPriceElement) return;

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// --- DELETE ALL ITEMS FROM CART --- //
/**
 * Clears the entire cart by removing all items from the cart array and updating the local storage.
 */
function deleteAllItems() {
  localStorage.removeItem('cart');
  cart = [];
  updateCart();
  checkOnCartState();
}

// --- SETUP EVENT LISTENERS --- //
/**
 * Sets up event listeners for buttons and actions, including adding items to the cart and deleting them.
 */
function setupEventListeners() {
  document.getElementById('deleteAll_btn').addEventListener('click', deleteAllItems);
  document.getElementById('checkout_btn').addEventListener('click', () => alert('Proceeding to checkout'));
}

// Initialize the cart and fetch products when the page loads
initializeCart();
getProducts();
checkOnCartState();
setupEventListeners();

// --- SIDEBAR SECTION --- //

const openBtn = document.getElementById('cart-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const mask = document.getElementById('mask');

// Function to open the sidebar
function openSidebar() {
  sidebar.classList.add('open');
  mask.style.display = 'block';
}

// Function to close the sidebar
function closeSidebar() {
  sidebar.classList.remove('open');
  mask.style.display = 'none';
}

// Event listeners
openBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
mask.addEventListener('click', closeSidebar);



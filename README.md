# Munnich.it Store

Munnich.it Store is an interactive single-page e-commerce application that allows users to browse a selection of products, add them to a shopping cart, and manage their cart dynamically. The cart data is persisted using local storage, ensuring a seamless user experience even after refreshing the page.

**URL:**  [munnichit.netlify.app](https://munnichit.netlify.app/ "This is a link to your screenshot")

## Project Assessment

**Assessment Project: Single Store Page with Shopping Cart and Local Storage Functionality**

### Objective

The goal of this project is to create an interactive single-page store application where users can view products, add items to a shopping cart, and manage their cart contents dynamically. The cart data should be persisted using local storage.

### Requirements

1.  **Header Section**
    
    -   Display the store's name.
    -   Include a shopping cart icon. Clicking the icon toggles the visibility of a side panel that displays the cart's contents.
2.  **Main Content**
    
    -   Product Cards:
        -   Display 5–6 product cards on the page.
        -   Each card includes:
            -   A picture of the product.
            -   The product name.
            -   The product price.
            -   An "Add to Cart" button.
        -   Use CSS variables for styling.
3.  **Cart Side Panel**
    
    -   The cart side panel appears when the shopping cart icon is clicked. It includes:
        -   A list of added products with name, price, and quantity.
        -   Buttons to remove individual items and clear all items from the cart.
4.  **Local Storage Integration**
    
    -   The cart data is stored in local storage to persist across sessions.
    -   When the page reloads, the cart contents are restored.
5.  **Interaction and Validation**
    
    -   Ensure the "Add to Cart" button updates the cart dynamically and functions correctly.

### Deliverables

-   **Codebase**: Clean, well-commented HTML, CSS, and JavaScript codebase.
-   **Demo**: A functional, responsive, and visually appealing project.

### Evaluation Criteria

-   **Functionality**: Proper implementation of the shopping cart with local storage, smooth toggling of the cart side panel, and correct cart item addition/deletion.
-   **User Interface**: Visually appealing and responsive design.
-   **Code Quality**: Clean, modular, and well-documented code.

## Features

-   **Add to Cart**: Users can add products to the cart, which is persisted in local storage.
-   **Persistent Cart**: Cart items persist across sessions, even when the page is refreshed.
-   **Dynamic Cart Update**: Users can modify the quantity of items in the cart, and the total price is updated accordingly.
-   **Product Fetching**: Data is fetched from an external API to populate the product cards.
-   **Responsive Design**: The design is optimized for both desktop and mobile devices.
-   **Cart Indicator**: The cart displays an indicator when it is empty or contains items.

## Technologies Used

-   **HTML5**: Used for structuring the content of the page.
-   **CSS3**: Used for styling the application, including CSS variables.
-   **Vanilla JavaScript**: Used for handling product fetching, cart management, and local storage functionality.

## Installation

1.  **Clone the repository**:
      
    `git clone https://github.com/fifolio/munnich.it.git` 
    
2.  **Navigate to the project folder**:
    
    `cd munnich.it` 
    
3.  **Open the `main.html` file** in your browser to view the application.
    

## Features Breakdown

### 1. **Cart Initialization & Local Storage**

The cart is initialized from `localStorage` when the page loads. If no cart exists, an empty cart is created. Updates to the cart (adding/removing items) are automatically saved to `localStorage`.

    `function initializeCart() {   cart = JSON.parse(localStorage.getItem('cart')) || [];   updateCart(); }`

### 2. **Product Fetching**

The products are fetched from an external API, and both "Top Selling" and "More Products" categories are displayed.

    `function getProducts() {
      fetch('https://api.example.com/products')
        .then(response => response.json())
        .then(data => {
          topSellingProducts = [...data.topSelling];
          moreProducts = [...data.more];
        })
        .then(renderProducts)
        .catch(error => console.error('Error fetching products:', error));
    }` 

### 3. **Cart Management**

-   **Add to Cart**: Products are added to the cart stored in `localStorage`.
-   **Modify Cart**: Users can adjust the quantity of items or remove them.

  ```
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
      }
    }
```

## Improvements and Future Enhancements

While the application meets the requirements of the project assessment, there is always room for improvement. Here are some ideas for future enhancements:

1.  **Product Carousel**: Add a carousel to the product cards to display more product images, rather than just one. This would enhance the visual appeal and provide a better user experience.
    
2.  **Notifications**: Implement notifications based on user actions, such as when a user adds, updates, or removes an item from the cart. This would make the interaction more interactive and informative.
    
3.  **Loading State**: Add a loading state to improve the user experience when data is being fetched from the API. This will provide a smooth transition and make the app feel more responsive.
    
4.  **React Upgrade**: The current version of the project uses vanilla JavaScript. Moving to a framework like React would provide better performance, better structure, and a more scalable solution for managing state and handling complex UI interactions.
    
5.  **State Management with Zustand**: State management could be improved by using a library like Zustand, which provides a simple and effective way to manage state across the app. Zustand would help centralize the cart state and make the app more maintainable.
    
6.  **Product Filtering and Sorting**: Adding features such as sorting products by price or filtering by categories (e.g., electronics, clothing) would provide more flexibility for users.
    
7.  **Enhanced Mobile Experience**: While the app is already responsive, there could be further optimization for mobile users, such as a better touch experience and more intuitive interactions.

## Contact

For any inquiries, feel free to reach out to FirasDabbabi@gmail.com.

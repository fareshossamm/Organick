$(document).ready(function () {
    // Close the navbar collapse when close icon is clicked
    $('.close-icon').on('click', function () {
        $('#navbarNav').removeClass('show');
    });

    // Close the navbar collapse when a nav-link is clicked (optional)
    $('.navbar-nav .link').on('click', function () {
        $('#navbarNav').removeClass('show');
    });
});


//go to cart 

function addToCart(title, price, imgSrc) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ title, price, imgSrc });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${title} has been added to your cart!`);
}

    document.addEventListener('DOMContentLoaded', function() {
        const cartCountElement = document.getElementById('cart-count');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Update cart count on page load
        cartCountElement.textContent = cart.length;

        // Function to add item to cart
        function addToCart(product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            cartCountElement.textContent = cart.length;
        }

        // Example add-to-cart buttons (replace with your actual product data and event listeners)
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const product = {
                    imgSrc: this.dataset.imgSrc,
                    title: this.dataset.title,
                    price: parseFloat(this.dataset.price),
                    category: this.dataset.category,  // Added category
                    rating: parseInt(this.dataset.rating) // Added rating
                };
                addToCart(product);
            });
        });
    });

    //cart page 
    document.addEventListener('DOMContentLoaded', function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalContainer = document.getElementById('cart-total');
        const item = document.getElementsByClassName('grid-item');
        const deleteAllBtn = document.getElementById('delete-all-btn');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        let total = 0;

        function updateCart() {
            cartItemsContainer.innerHTML = '';
            total = 0;

            if (cart.length === 0) {
                emptyCartMessage.style.display = 'block';
                deleteAllBtn.style.display = 'none';
                cartTotalContainer.style.display = 'none';
            } else {
                emptyCartMessage.style.display = 'none';
                deleteAllBtn.style.display = 'block';
                cartTotalContainer.style.display = 'block';

                cart.forEach((item, index) => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';

                    const img = document.createElement('img');
                    img.src = item.imgSrc;
                    cartItem.appendChild(img);

                    const info = document.createElement('div');
                    info.className = 'cart-item-info';

                    const title = document.createElement('div');
                    title.className = 'title';
                    title.textContent = item.title;
                    info.appendChild(title);


                    cartItem.appendChild(info);

                    const price = document.createElement('div');
                    price.className = 'cart-item-price';
                    price.textContent = `$${item.price.toFixed(2)}`;
                    cartItem.appendChild(price);

                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.textContent = 'X';
                    deleteBtn.addEventListener('click', function() {
                        cart.splice(index, 1);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCart();
                    });
                    cartItem.appendChild(deleteBtn);

                    cartItemsContainer.appendChild(cartItem);
                    total += item.price;
                });

                cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;
                localStorage.setItem('cartTotal', total.toFixed(2));
            }
        }

        deleteAllBtn.addEventListener('click', function() {
            cart.length = 0;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });

        updateCart();
    });

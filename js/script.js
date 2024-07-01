
$(document).ready(function () {
    $('.navbar-nav .nav-item .link').click(function () {
        $('.navbar-collapse').collapse('hide');
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('.grid-item');

    products.forEach(product => {
        product.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('.card-title').textContent;
            const category = this.querySelector('.category').textContent;
            const oldPrice = this.querySelector('.old').textContent;
            const price = this.querySelector('.price').textContent;
            const rating = this.querySelector('.star').innerHTML;

            localStorage.setItem('productImgSrc', imgSrc);
            localStorage.setItem('productTitle', title);
            localStorage.setItem('productCategory', category);
            localStorage.setItem('productOldPrice', oldPrice);
            localStorage.setItem('productPrice', price);
            localStorage.setItem('productRating', rating);

            window.location.href = 'product-details.html';
        });
    });

    if (window.location.pathname.includes('product-details.html')) {
        const imgSrc = localStorage.getItem('productImgSrc');
        const title = localStorage.getItem('productTitle');
        const category = localStorage.getItem('productCategory');
        const oldPrice = localStorage.getItem('productOldPrice');
        const price = localStorage.getItem('productPrice');
        const rating = localStorage.getItem('productRating');

        document.getElementById('product-image').src = imgSrc;
        document.getElementById('product-title').textContent = title;
        document.getElementById('product-category').textContent = category;
        document.getElementById('product-old-price').textContent = oldPrice;
        document.getElementById('product-price').textContent = price;
        document.getElementById('product-rating').innerHTML = rating;
    }
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
        const item = document.getElementsByClassName('grid-item');
        const deleteAllBtn = document.getElementById('delete-all-btn');
        const emptyCartMessage = document.getElementById('empty-cart-message');

        function updateCart() {
            cartItemsContainer.innerHTML = '';

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
                });

            }
        }

        deleteAllBtn.addEventListener('click', function() {
            cart.length = 0;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });

        updateCart();
    });

    
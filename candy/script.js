const candyData = [
    {
        id: 1,
        name: "Snow Caps",
        price: 1.50,
        image: "media/snowCaps.jpg",
        category: "chocolate",
        description: "Delicious chocolate with a snowy white coating",
        flavors: ["Original"]
    },
    {
        id: 2,
        name: "Gummy Fish",
        price: 1.00,
        image: "media/gummyFish.jpg",
        category: "gummy",
        description: "Tasty fish-shaped gummy candies",
        flavors: ["Assorted"]
    },
    {
        id: 3,
        name: "Malt Balls",
        price: 1.25,
        image: "media/maltBalls.jpg",
        category: "chocolate",
        description: "Crunchy malted milk balls covered in chocolate",
        flavors: ["Original"]
    },
    {
        id: 4,
        name: "Kitkat",
        price: 1.75,
        image: "media/kitkat.jpg",
        category: "chocolate",
        description: "Classic crispy wafer chocolate bar",
        flavors: ["Normal", "Mini", "Donut"]
    }
];

let cart = [];

function populateCandies() {
    const candiesDiv = document.querySelector('.candies');
    candiesDiv.innerHTML = '';
    
    candyData.forEach(candy => {
        const candyElement = document.createElement('div');
        candyElement.className = `candy-item ${candy.category}`;
        candyElement.setAttribute('data-id', candy.id);
        candyElement.innerHTML = `
            <h3>${candy.name}</h3>
            <p class="price">$${candy.price.toFixed(2)}</p>
            <p class="description">${candy.description}</p>
            <button class="add-btn" onclick="openPopup(${candy.id})">View & Add to Cart</button>
        `;
        candiesDiv.appendChild(candyElement);
    });
}

function openPopup(candyId) {
    const candy = candyData.find(c => c.id === candyId);
    if (!candy) return;

    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    popup.id = `popup-${candyId}`;
    
    const flavorOptions = candy.flavors.map((flavor, index) => `
        <label>
            <input type="radio" name="flavor" value="${flavor}" ${index === 0 ? 'checked' : ''}>
            ${flavor}
        </label>
    `).join('');

    popup.innerHTML = `
        <div class="popup-content">
            <span class="close" onclick="closePopup(${candyId})">&times;</span>
            <h2>${candy.name}</h2>
            <p class="popup-price">Price: $${candy.price.toFixed(2)}</p>
            <p class="popup-description">${candy.description}</p>
            
            <div class="flavor-selection">
                <h4>Select Flavor:</h4>
                ${flavorOptions}
            </div>
            
            <div class="quantity-selection">
                <label for="quantity-${candyId}">Quantity:</label>
                <input type="number" id="quantity-${candyId}" min="1" value="1">
            </div>
            
            <button class="add-cart-btn" onclick="addToCart(${candyId})">Add to Cart</button>
        </div>
    `;
    
    document.body.appendChild(popup);
    popup.style.display = 'flex';
    
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup(candyId);
        }
    });
}

function closePopup(candyId) {
    const popup = document.getElementById(`popup-${candyId}`);
    if (popup) {
        popup.remove();
    }
}

function addToCart(candyId) {
    const candy = candyData.find(c => c.id === candyId);
    const flavorInput = document.querySelector(`#popup-${candyId} input[name="flavor"]:checked`);
    const quantityInput = document.querySelector(`#quantity-${candyId}`);
    
    const flavor = flavorInput ? flavorInput.value : candy.flavors[0];
    const quantity = parseInt(quantityInput.value) || 1;
    
    const cartItem = {
        candyId: candyId,
        name: candy.name,
        flavor: flavor,
        price: candy.price,
        quantity: quantity,
        total: candy.price * quantity
    };
    
    cart.push(cartItem);
    closePopup(candyId);
    updateCartDisplay();
    alert(`${quantity}x ${candy.name} (${flavor}) added to cart!`);
}

function updateCartDisplay() {
    const kartSection = document.querySelector('.kart');
    let cartHTML = '<h2>Checkout</h2>';
    
    if (cart.length === 0) {
        cartHTML += '<p>Your selected items will appear here.</p>';
    } else {
        let total = 0;
        cartHTML += '<ul class="cart-items">';
        
        cart.forEach((item, index) => {
            cartHTML += `
                <li>
                    ${item.quantity}x ${item.name} - ${item.flavor} - $${item.total.toFixed(2)}
                    <button onclick="removeFromCart(${index})">Remove</button>
                </li>
            `;
            total += item.total;
        });
        
        cartHTML += '</ul>';
        cartHTML += `<p class="cart-total"><strong>Total: $${total.toFixed(2)}</strong></p>`;
    }
    
    kartSection.innerHTML = cartHTML;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', populateCandies);
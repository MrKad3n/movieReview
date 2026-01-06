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


let one;
             let two;
             let three;
             const four = 'kitkat';
             const five = "hershey's"

              function checkCandy() {

            let candy = prompt("What type of candy are you looking for? Type one for our chocolate selection or two for gummies, three for our selection of m&ms, four for kitkats, and five for hershey's.");

           

            if (candy === 'one') {
                alert("We have a wide variety of chocolates! We have Snow Caps and Malt Balls");
            } else if (candy === 'two') {
                alert("We have Gummy Fish!");
            } 
            
            else if (candy === 'three') {
                alert("We have M&Ms! We have Normal, Mini, and Peanut!");
                let mnms = prompt("Which one would you like? One for normal, two for mini, and three for peanut.");
                if (mnms === 'one') {
                    alert("You selected Normal M&Ms.");
                } else if (mnms === 'two') {
                    alert("You selected Mini M&Ms.");
                } else if (mnms === 'three') {
                    alert("You selected Peanut M&Ms.");
                }
            } 
            
            else if (candy === 'four') {
                let kitkat;
                alert("We have KitKats! We have Normal, Mini, and Chocolate Frosted Donut!");
                prompt("Which one would you like? One for normal, two for mini, and three for chocolate frosted donut.");
                if (kitkat === 'one') {
                    alert("You selected Normal KitKat.");
                } else if (kitkat === 'two') {
                    alert("You selected Mini KitKat.");
                } else if (kitkat === 'three') {
                    alert("You selected Chocolate Frosted Donut KitKat.");
                }
            } 
            
            else if (candy === 'five') {
                let hersheys
                alert("We have Hershey's! We have Milk Chocolate, Kisses, and Cookies n' Creme!");
                prompt("Which one would you like? One for Milk Chocolate, two for Kisses, and three for Cookies n' Creme.");
                if (hersheys === 'one') {
                    alert("You selected Milk Chocolate Hershey's.");
                } else if (hersheys === 'two') {
                    alert("You selected Hershey's Kisses.");
                } else if (hersheys === 'three') {
                    alert("You selected Hershey's Cookies n' Creme.");
                }
            }
        }   
document.addEventListener("DOMContentLoaded", function () {
    // ✅ Auto-set current date
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);
    document.querySelectorAll('.currentdate').forEach(el => el.textContent = formattedDate);

    // ✅ Product prices
    const productPrices = {
        "White Bread": 40,
        "Whole Wheat Bread": 45,
        "Multigrain Bread": 50,
        "Baguette": 100,
        "Brioche": 70,
        "Focaccia": 80,
        "Sourdough": 90,
        "Chocolate Cake(1kg)": 500,
        "Vanilla Cake(1kg)": 450,
        "Red Velvet Cake(1kg)": 550,
        "Black Forest Cake(1kg)": 600,
        "Fruit Cake": 650,
        "Cheesecake": 700,
        "Carrot Cake": 480,
        "Croissant(Plain)": 80,
        "Chocolate Croissant": 90,
        "Almond Croissant": 100,
        "Danish Pastries": 120,
        "Chocolate Eclairs": 110,
        "Strawberry Eclairs":90,
        "Vanilla Eclairs":75,
        "Puff Pastry Twists": 100,
        "Cinnamon Rolls": 90,
        "Chocolate Chip Cookies": 20,
        "Oatmeal Cookies": 25,
        "Butter Cookies": 30,
        "Shortbread": 35,
        "Biscotti": 40,
        "Blueberry Muffins": 60,
        "Chocolate Muffins": 65,
        "Vanilla Cupcakes": 55,
        "Red Velvet Cupcakes": 70,
        "Pizza Bread": 100,
        "Garlic Bread": 80,
        "Cheese Sticks": 90,
        "Sandwiches": 120,
        "Quiche": 150,
        "Macarons": 200,
        "Fruit Tart": 250,
        "Lemon Tart": 250,
        "Chocolate Tart": 300,
        "Donuts(Plain)": 50,
        "Chocolate Donut":60,
        "Brownie":90,
        "Brownie(Ice cream)": 120,
        "Apple Pie": 400,
        "Pumpkin Pie": 450,
        "Pecan Pie": 500
    };

    const productTable = document.getElementById("productTable");
    const addRowBtn = document.getElementById("addRowBtn");

    // ✅ Update Item No for all rows
    function updateItemNumbers() {
        productTable.querySelectorAll("tr").forEach((row, index) => {
            row.querySelector(".item-no").textContent = index + 1;
        });
    }

    // ✅ Update price & total for a row
    function updatePriceAndTotal(row) {
        const select = row.querySelector(".item-name");
        const priceInput = row.querySelector("input[name='item_price[]']");
        const qtyInput = row.querySelector("input[name='item_qty[]']");
        const totalInput = row.querySelector("input[name='item_total[]']");

        const selectedProduct = select.value;
        priceInput.value = productPrices[selectedProduct] || "";

        const qty = parseFloat(qtyInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        totalInput.value = (qty * price).toFixed(2);
    }

    // ✅ Attach events to a row
    function attachRowEvents(row) {
        const qtyInput = row.querySelector('[name="item_qty[]"]');
        const priceInput = row.querySelector('[name="item_price[]"]');
        const select = row.querySelector(".item-name");
        const deleteBtn = row.querySelector(".remove-row");

        // Update total when quantity or product changes
        qtyInput.addEventListener("input", () => updatePriceAndTotal(row));
        select.addEventListener("change", () => updatePriceAndTotal(row));
        priceInput.addEventListener("input", () => updatePriceAndTotal(row));

        // Delete row
        deleteBtn.addEventListener("click", () => {
            if (productTable.rows.length > 1) {
                row.remove();
                updateItemNumbers();
            } else {
                alert("At least one item must be present!");
            }
        });
    }

    // ✅ Initialize existing rows
    productTable.querySelectorAll("tr").forEach(row => attachRowEvents(row));
    updateItemNumbers();

    // ✅ Add new row
    addRowBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const firstRow = productTable.querySelector("tr");
        const newRow = firstRow.cloneNode(true);

        // Clear inputs
        newRow.querySelectorAll("input").forEach(input => input.value = "");
        newRow.querySelector("select").value = "";

        productTable.appendChild(newRow);
        attachRowEvents(newRow);
        updateItemNumbers();
    });

});

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validatePhone(phone) {
  const pattern = /^\d{10}$/;
  return pattern.test(phone);
}

document.querySelector('form').addEventListener('submit', function(event) {
  const emailInput = document.querySelector('input[name="email"]');
  const phoneInput = document.querySelector('input[name="phone"]');

  let valid = true;

  if (!validateEmail(emailInput.value)) {
    alert("Please enter a valid email address.");
    emailInput.focus();
    valid = false;
  }

  if (phoneInput.value && !validatePhone(phoneInput.value)) {
    alert("Phone number must be exactly 10 digits.");
    phoneInput.focus();
    valid = false;
  }

  if (!valid) {
    event.preventDefault();
  }
});


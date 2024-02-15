const buttons = document.querySelectorAll(`button`);
const productsContainer = document.getElementById(`products-container`);

//API data fetch rather than data.json

/* const url =
 "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
async function getData() {
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data)
    return data;
  } catch (e) {
    console.log("Error Occurred", e);
  }
} */

//card selector
/* let image= document.getElementById("image");
let badge_text1 = document.getElementById("badge_text");
let title = document.getElementById("title");
let vendor = document.getElementById("vendor");
let price = document.getElementById("price");
let compare_at_price = document.getElementById("compare_at_price");
let btn_cart = document.getElementById("btncart"); */

buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    const categoryName = button.textContent.toLowerCase();
    console.log("clicked button text:", categoryName);

    try {
      const response = await fetch(
        "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
      );
      const resData = await response.json(); //to convert json to readable format
      //console.log(resData)
      const resCategory = resData.categories.find(
        (category) => category.category_name.toLowerCase() === categoryName
      );

      if (resCategory) {
        displayProducts(resCategory);
      } else {
        console.log(`Data not found`);
      }
    } catch (err) {
      console.log("error in fetching data", err);
    }
  });
});

function displayProducts(resCategory) {
  productsContainer.innerHTML = "";

  //loop
  resCategory.category_products.forEach((product) => {
    const productCard = document.createElement(`div`);
    productCard.classList.add(`product-card`);

    //title
    const titleVendorContainer = document.createElement(`div`);
    titleVendorContainer.classList.add(`title-vendor-container`);
    //-----
    const productTitle = document.createElement(`h4`);
    productTitle.textContent = product.title;
    titleVendorContainer.appendChild(productTitle);

    //image
    const productImageContainer = document.createElement(`div`);
    productImageContainer.classList.add(`product-image-container`);
    //---
    const productImage = document.createElement(`img`);
    productImage.src = product.image;
    productImage.alt = product.title;
    productImage.classList.add(`product-image`);

    if (product.badge_text !== null) {
      const badgeOverlay = document.createElement(`div`);
      badgeOverlay.classList.add(`badge-overlay`);
      badgeOverlay.textContent = product.badge_text;
      productImageContainer.appendChild(badgeOverlay);
    }

    productImageContainer.appendChild(productImage);
    productCard.appendChild(productImageContainer);

    //vendor
    const productVendor = document.createElement(`p`);
    productVendor.textContent = `${product.vendor}`;
    titleVendorContainer.appendChild(productVendor);
    productCard.appendChild(titleVendorContainer);

    //price
    const priceContainer = document.createElement(`div`);
    priceContainer.classList.add(`price-container`);

    const productPrice = document.createElement(`p`);
    productPrice.classList.add("RS");
    productPrice.textContent = `RS ${product.price}//-`;
    priceContainer.appendChild(productPrice);

    //compare price
    const comparePriceInfo = document.createElement(`p`);
    comparePriceInfo.classList.add("comparePriceInfo");
    comparePriceInfo.classList.add("compare-price");
    comparePriceInfo.textContent = `${product.compare_at_price}`;
    priceContainer.appendChild(comparePriceInfo);

    //Percentage logic
    const comparePrice = parseFloat(product.compare_at_price);
    if (!isNaN(comparePrice) && comparePrice > 0) {
      const priceDifference = comparePrice - parseFloat(product.price);
      const percentage = (priceDifference / comparePrice) * 100;
      //console.log(percentage)
      const percentageElement = document.createElement(`span`);
      percentageElement.classList.add(`percentage`);
      percentageElement.style.color = `red`;
      percentageElement.textContent = `${percentage.toFixed(0.2)}%offer`;
      priceContainer.appendChild(percentageElement);
    }
    productCard.appendChild(priceContainer);

    //add to cart
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.classList.add("add-to-cart-button");
    productCard.appendChild(addToCartButton);
    productsContainer.appendChild(productCard);
  });
}

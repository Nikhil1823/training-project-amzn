let brand = [];

const starPairs = {
  5: `<i class="four5-test"></i>`,
  4: `<i class="four-test"></i>`,
  3.5: `<i class="three5-test"></i>`,
  4.5: `<i class="four5-test"></i>`,
};
// initial fetch
const resultDiv = document.querySelector(
  "aside.result-section div.result-wrapper div.result-container"
);

const resultHeader = `<div class="result-header">
                        <h2>Results</h2>
                        <p>Check each product page for other buying options.</p>
                    </div>`;
  
const lastPortion = `  <div class="pagination">
                        <div class="pagination-strip">
                            <ul class="page-bar">
                                <li>
                                    <span class="back">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12"
                                            focusable="false" aria-hidden="true">
                                            <path
                                                d="M5.874.35a1.28 1.28 0 011.761 0 1.165 1.165 0 010 1.695L3.522 6l4.113 3.955a1.165 1.165 0 010 1.694 1.28 1.28 0 01-1.76 0L0 6 5.874.35z">
                                            </path>
                                        </svg>
                                        Previous
                                    </span>
                                </li>

                                <li class="selected-page"><span><span>1</span></span></li>
                                <li>2</li>
                                <li>3</li>
                                <li>...</li> 
                                <li>32</li>
                                <li>
                                    <span class="forward">
                                        Next
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12"
                                            focusable="false" aria-hidden="true">
                                            <path
                                                d="M2.126.35a1.28 1.28 0 00-1.761 0 1.165 1.165 0 000 1.695L4.478 6 .365 9.955a1.165 1.165 0 000 1.694 1.28 1.28 0 001.76 0L8 6 2.126.35z">
                                            </path>
                                        </svg>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="help-section">
                        <div class="help-container">
                            <h2>Need Help?</h2>
                            <a href=""><span>Visit the help section</span> or <span>contact us </span></a>
                        </div>
                    </div>
                   
                </div>`;

window.addEventListener("load", async () => {
  const data = await fetchData(brand);
  domInjector(populateData(data));
});

// to fetch data
const fetchData = async (items = []) => {
  const response = await fetch("data.json");
  let res = await response.json();

  if (items.length > 0) {
    res = items.map((val) => {
      return res[val];
    });
  } else {
    res = Object.values(res);
  }

  return res;
};

const priceFilter = async (minPrice = 6000, maxPrice = 10000) => {
  const data = await fetchData(brand);
  const resultItem = data.map((product) => {
    return product.filter((eachProduct) => {
      return (
        eachProduct.price.offerPrice >= minPrice &&
        eachProduct.price.offerPrice <= maxPrice
      );
    });
  });

  domInjector(populateData(resultItem));
};

// dynamic content injection

const brandButton = document.querySelectorAll("div.brands div.input-div input");
brandButton.forEach((button) => {
  button.addEventListener("click", async () => {
    console.log(button.value);
    if (button.checked) {
      brand.unshift(button.value);
    } else {
      brand = brand.filter((b) => b != button.value);
    }

    const data = await fetchData(brand);
    domInjector(populateData(data));
  });
});

const populateData = (products) => {
  return Object.entries(products)
    .map(([key, val]) => {
      return val
        .map((data) => {
          return `<div class="product-wrapper">
                        <div class="product-content-wrapper">
                            <div class="best-seller-tag">
                                <button style="display:none";><span>Best seller</span></button>
                            </div>
                            <div class="image-container">
                                <div class="image-wrapper">

                                    <img src=${data.images} alt="">

                                </div>

                            </div>
                            <div class="content-wrapper">
                                <div class="header-wrapper">
                                    <h2>${data.title}
                                    </h2>

                                </div> 
                                <div class="review-block">
                                    <div class="star-count">
                                        <div class="product-star">
                                            ${starPairs[data.rating.starCount]}
                                            <span class="arrow-down"></span>
                                            <span class="count">${
                                              data.rating.totalPurchase
                                            }</span>

                                        </div>
                                    </div>
                                    <div class="total-buy">
                                       ${data.rating.recentPurchase}
                                    </div>
                                </div>
                               
                                
                                <div class="amount-block">
                                    <div class="amount-offer">
                                        <span class="symbol">₹</span>
                                        <span class="offer-price">${data.price.offerPrice.toLocaleString()}</span>
                                        <span class="unit">M.R.P:</span>
                                        <span class="actual-price">₹${data.price.actualPrice.toLocaleString()}</span>
                                        <span class="discount-rate">(${
                                          data.price.discount
                                        }% off)</span>
                                    </div>
                                    ${(data.offers.offer1
                                      ? `<div class="offers">${data.offers.offer1}</div>`
                                      : ""
                                    ).trim()}
                                    
                                </div>

                                <div class="delivery-div">
                                ${(data.isPrime
                                  ? `<div class="is-prime">
                                        <p></p>

                                    </div>`
                                  : ""
                                ).trim()}
                                    
                                    <div class="delivery-date">
                                        <p>FREE delivery <span>${
                                          data.delivery
                                            .split("FREE delivery")[1]
                                            .split("Or")[0]
                                        }</span></p>



                                      ${
                                        data.delivery.split(
                                          "fastest delivery"
                                        )[1]
                                          ? ` <p>
                                            Or fastest delivery
                                            <span>
                                              ${
                                                data.delivery.split(
                                                  "fastest delivery"
                                                )[1]
                                              }
                                            </span>
                                          </p>`
                                          : ""
                                      }
                                        
                                    </div>
                                    ${(data.serviceAvailable.service1
                                      ? `<div class="services">
                                        <p>Service: ${data.serviceAvailable.service1}</p>

                                    </div>`
                                      : ""
                                    ).trim()}
                                    
                                </div>



                                <div class="add-to-cart">
                                    <a href="" class="cart-button"><button>Add to cart</button></a>
                                </div>

                              
                            </div>

                        </div>
                    </div>`;
        })
        .join("");
    })
    .join("");
};

const unwantedThings = `  <div class="more-choice">
                                    <p class="choice-1">More Buying Choices</p>
                                    <span class="choice-price"> ₹ 965</span>
                                    <span class="choice-count">(10 new offers)</span>

                                </div>`;

const icons = document.querySelectorAll("ul.review li i");
icons.forEach((icon) => {
  icon.addEventListener("click", async function (event) {
    const reqId = event.target.getAttribute("id");
    console.log("going to hide", reqId);
    await starFilter(Number(reqId));
    const stars = document.querySelectorAll("ul.review li");

    stars.forEach((star) => {
      if (star.getAttribute("class") == reqId) {
        star.style.display = "block";
      } else {
        star.style.display = "none";
      }
    });
  });
});

const starFilter = async (starCount = 4.5) => {
  const data = await fetchData(brand);
  const starData = data.map((eachBrand) => {
    return eachBrand.filter((eachProduct) => {
      return eachProduct.rating.starCount >= starCount;
    });
  });
  console.log(starData);
  const products = populateData(starData);
  domInjector(products);
};

const domInjector = (products) => {
  resultDiv.innerHTML = resultHeader + products + lastPortion;
};

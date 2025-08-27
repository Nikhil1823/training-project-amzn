let brand = [];
const mobileContainer = document.querySelector(
  "main.mobile-view div.sm-page-wrapper div.sm-card-layout"
);

window.addEventListener("load", async () => {
  const data = await fetchData(brand);
  domInjector(populateData(data));
});

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

const populateData = (products) => {
  if (window.innerWidth >= 769) {
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
                                              ${
                                                starPairs[data.rating.starCount]
                                              }
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
  } else {
    return Object.entries(products)
      .map(([key, val]) => {
        return val
          .map((data) => {
            return `<div class="sm-card-layout-container">
                      <div class="sm-card-layout-wrapper">
  
                          <div class="sm-card-content">
                              <div class="sm-image-container">
                                  <div class="sm-image-wrapper">
                                      <div class="sm-is-best-seller" >
                                     
                                          <span class="sm-seller-wrapper"style="display:none"; >
                                              <span class="sm-seller-tag">Best seller</span>
  
                                          </span>
                                      </div>
  
                                      <div class="sm-image-wrapper-div">
                                          <div class="sm-image-div">
                                            <div class="sm-img-test">
                                                <img src=${data.images}
                                                    alt="">
                                              </div>
                                          </div>
                                          <div class="sm-more-image">
                                              <img src="https://m.media-amazon.com/images/I/01rrzVoKd5L.svg" alt="">
                                          </div>
  
  
                                      </div>
                                  </div>
                              </div>
                              <div class="sm-content-wrapper">
                                  <div class="sm-content-wrapper-inner">
                                      <div class="sm-title">
                                          <h2>${data.title}
  
                                          </h2>
                                      </div>
                                      <div class="sm-rating">
                                          <div class="sm-rating-wrapper-1">
                                              <span class="sm-rating-number">${data.rating.starCount.toFixed(
                                                1
                                              )}
                                              </span>
                                              <i class="sm-stars"></i>
                                              <span class="sm-rating-count">(${(Number(
                                                data.rating.totalPurchase
                                              ) > 1000
                                                ? Number(
                                                    data.rating.totalPurchase /
                                                      1000
                                                  ).toFixed(1) + "K"
                                                : data.rating.totalPurchase
                                              ).trim()})</span>
                                          </div>
  
                                          <span class="sm-buy-count">${
                                            data.rating.recentPurchase
                                          }</span>
                                      </div>
                                      <div class="sm-price-div">
                                          <div class="sm-price">
                                              <span class="sm-symbol">₹</span><span class="sm-value">${data.price.offerPrice.toLocaleString()}</span>
                                              <span class="sm-mrp">M.R.P:</span>
                                              <span class="sm-actual-price">₹${data.price.actualPrice.toLocaleString()}</span>
                                              <span class="sm-discount">(${
                                                data.price.discount
                                              }% off)</span>
                                          </div>
                                          ${(data.offers.offer1
                                            ? `<span class="sm-offer">
                                              ${data.offers.offer1}
                                          </span>`
                                            : ``
                                          ).trim()}
                                      </div>
                                      <div class="sm-delivery-div">
                                          <div class="sm-delivery">
                                          ${(data.isPrime
                                            ? ` <div class="sm-is-prime">
                                                  <span class="sm-prime"><i class="icon"></i></span>
                                              </div>`
                                            : ``
                                          ).trim()}
                                            
                                              <div class="sm-free">
                                                  <span class="sm-text">FREE delivery</span><span class="sm-date">  ${
                                                    data.delivery
                                                      .split("FREE delivery")[1]
                                                      .split("Or")[0]
                                                  }</span>
                                              </div>
                                              ${(data.delivery.split(
                                                "fastest delivery"
                                              )[1]
                                                ? ` <div class="sm-fast">
                                                  <span class="sm-text">Or fastest delivery </span><span class="sm-date">
                                                      ${
                                                        data.delivery.split(
                                                          "fastest delivery"
                                                        )[1]
                                                      }</span>
                                              </div>`
                                                : ``
                                              ).trim()}
                                             
                                          </div>
                                      </div>
                                      ${(data.serviceAvailable.service1
                                        ? ` <div class="sm-service">
                                          <span class="sm-text">Service: ${data.serviceAvailable.service1}</span>
                                      </div>`
                                        : ``
                                      ).trim()}
                                     
                                      <div class="sm-add-to-cart-wrapper">
                                          <div class="sm-add-to-cart">
                                              <span class="sm-button-wrapper"><button>Add to cart</button></span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
  
                          </div>
  
  
                      </div>
                  </div>`;
          })
          .join("");
      })
      .join("");
  }
};

const domInjector = (products) => {
  console.log();

  if (window.innerWidth >= 769) {
    return (resultDiv.innerHTML = resultHeader + products + lastPortion);
  } else 
mobileContainer.innerHTML = products;
  
};

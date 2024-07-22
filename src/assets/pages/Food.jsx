import React, { useState } from 'react';

const dataObj = [
  {
    name: "Cold Drinks",
    imgSrc:"../css/img/cola.png",
    products: [
      {
        name: "Sprite Tin Cane",
        price: 100,
        imgSrc: "../css/img/Sprite Tin Cane - 480x923.png",
      },
      {
        name: "Cocktail",
        price: 120,
        imgSrc: "../css/img/Cocktail Glass - 640x630.png",
      },
      {
        name: "Strawberry Juice",
        price: 140,
        imgSrc: "../css/img/Tomato Juice - 480x606.png",
      },
    ],
  },
  {
    name: "Burgers",
    imgSrc: "../css/img/burger.png",
    products: [
      {
        name: "Beef Burger",
        price: 100,
        imgSrc: "../css/img/burger_1.png",
      },
      {
        name: "Double Cheeseburger",
        price: 120,
        imgSrc: "../css/img/burger_2.png",
      },
      {
        name: "Cheese Burger",
        price: 140,
        imgSrc: "../css/img/burger_3.png",
      },
    ],
  },
  {
    name: "Pizza",
    imgSrc: "../css/img/pizaa.png",
    products: [
      {
        name: "Greek Pizza",
        price: 100,
        imgSrc: "../css/img/pizza_1.png",
      },
      {
        name: "Neapolitan Pizza",
        price: 120,
        imgSrc: "../css/img/pizza_2.png",
      },
      {
        name: "Sicilian Pizza",
        price: 140,
        imgSrc: "../css/img/pizza_3.png",
      },
    ],
  },
  {
    name: "Wok",
    imgSrc: "../css/img/wok.png",
    products: [
      {
        name: "Stir-fry Recipes",
        price: 100,
        imgSrc: "../css/img/wok1.jpg",
      },
      {
        name: "Chinese Food on Wok",
        price: 120,
        imgSrc: "../css/img/wok2.jpg",
      },
      {
        name: "Meet Chinese Food",
        price: 140,
        imgSrc: "../css/img/wok3.webp",
      },
    ],
  },
  {
    name: "Dessert",
    imgSrc: "../css/img/sweet.png",
    products: [
      {
        name: "Ice Cream",
        price: 100,
        imgSrc: "../css/img/co (2).png",
      },
      {
        name: "Cookies",
        price: 120,
        imgSrc: "../css/img/co (1).png",
      },
      {
        name: "Puddings",
        price: 140,
        imgSrc: "../css/img/co (3).png",
      },
    ],
  },
  {
    name: "Pasta",
    imgSrc: "../css/img/pasta.png",
    products: [
      {
        name: "Cheese Macaronis",
        price: 100,
        imgSrc: "../css/img/pasta22.png",
      },
      {
        name: "Farfalle",
        price: 120,
        imgSrc: "../css/img/pa2.jpg",
      },
      {
        name: "Linguine Carbonara",
        price: 140,
        imgSrc: "../css/img/pa3.jpeg",
      },
    ],
  },
];

function Food() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [sideCartProducts, setSideCartProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const renderCatsDiv = () => {
    return dataObj.map((cat, index) => (
      <div key={index} className="col-12 col-md-10 col-lg-8 p-3 text-center click card d-flex align-items-center gap-3 mb-1 justify-content-center">
        <img src={cat.imgSrc} id="imgCardF" className="card-img-top col-12 p-2 click" alt={cat.name} onClick={() => setSelectedCategoryIndex(index)} />
        <div className="card-body text-center">
          <h3 className="col-12 card-title fw-bold">{cat.name}</h3>
        </div>
      </div>
    ));
  };

  const showProductsInCat = (catIndex) => {
    return dataObj[catIndex].products.map((product, productIndex) => (
      <div key={productIndex} className="product col-12 col-md-10 col-lg-8 p-3 card d-flex align-items-center click gap-3 mb-1 justify-content-center" onClick={() => addToCart(catIndex, productIndex)}>
        <img src={product.imgSrc} style={{ height: '13rem', width: '13rem' }} className="card-img-top col-12 p-2" alt={product.name} />
        <p className="col-12 card-title fw-bold">{product.name}</p>
        <p className="col-12 card-title fw-bold">{product.price} $</p>
      </div>
    ));
  };

  const addToCart = (catIndex, productIndex) => {
    const product = dataObj[catIndex].products[productIndex];
    setSideCartProducts(prev => {
      const existingProduct = prev.find(p => p.name === product.name);
      if (existingProduct) {
        return prev.map(p => p.name === product.name ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const incrementQty = (index) => {
    setSideCartProducts(prev => prev.map((p, i) => i === index ? { ...p, qty: p.qty + 1 } : p));
  };

  const decrementQty = (index) => {
    setSideCartProducts(prev => {
      if (prev[index].qty > 1) {
        return prev.map((p, i) => i === index ? { ...p, qty: p.qty - 1 } : p);
      } else {
        return prev.filter((_, i) => i !== index);
      }
    });
  };

  const deleteItem = (index) => {
    setSideCartProducts(prev => prev.filter((_, i) => i !== index));
  };

  const getTotal = () => {
    return sideCartProducts.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return (
    <div className="App">
      <div id="Products">
        {selectedCategoryIndex === null ? renderCatsDiv() : (
          <>
            <button className="btn btn-warning p-2 mb-0 btnba click" onClick={() => setSelectedCategoryIndex(null)}>
              <i className="fa-solid fa-arrow-left-long"></i>
            </button>
            <h2 className="category-name col-12">{dataObj[selectedCategoryIndex].name}</h2>
            {showProductsInCat(selectedCategoryIndex)}
          </>
        )}
      </div>

      {cartOpen && (
        <div id="SideCart" style={{ width: '425px' }}>
          <button onClick={closeCart}>Close</button>
          <div id="cartItems">
            {sideCartProducts.map((el, index) => (
              <div key={index} className="productInCart" id="PInC">
                <div className="col-12 d-flex justify-content-flex-start gap-2">
                  <img src={el.imgSrc} style={{ height: '3rem' }} alt={el.name} />
                  <p className="mb-0">{el.name}</p>
                </div>
                <div className="col-12 d-flex align-items-center gap-2 justify-content-center">
                  <button className="btn btn-outline-warning text-dark click" onClick={() => decrementQty(index)}>-</button>
                  <p className="mb-0">{el.qty}</p>
                  <button className="btn btn-outline-warning text-dark click" onClick={() => incrementQty(index)}>+</button>
                </div>
                <div className="col-12 d-flex justify-content-between p-2">
                  <p>Price: {el.price}</p>
                  <p>Total: {el.price * el.qty}</p>
                  <i className="fa-solid fa-trash-can click" onClick={() => deleteItem(index)}></i>
                </div>
              </div>
            ))}
            <div id="cartTotal">
              <p>Final Price : {getTotal()}</p>
            </div>
          </div>
        </div>
      )}

      <button id="cartButton" onClick={openCart}>Cart</button>
    </div>
  );
}

export default Food;

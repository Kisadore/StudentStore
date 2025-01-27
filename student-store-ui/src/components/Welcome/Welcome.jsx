import "./Welcome.css"

function Welcome(){
    return (
        <>
             <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
            {/* <h1>
                Welcome to the online shop!!
            </h1> */}
        
        
        </>

    )

}

export default Welcome;
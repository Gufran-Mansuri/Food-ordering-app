import React, {useState, Suspense} from 'react';
// import Header from './components/Layout/Header';
// import Meals from './components/Meals/Meals';
// import Cart from './components/Cart/Cart';
//import CartProvider from './store/CartProvider';

const Header = React.lazy(() => import('./components/Layout/Header'));
const Meals = React.lazy(() => import('./components/Meals/Meals'));
const Cart = React.lazy(() => import('./components/Cart/Cart'));
const CartProvider = React.lazy(() => import('./store/CartProvider'));

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const showCartHandler = (event) => {
    setIsCartShown(true);
  }
  const hideCartHandler = () => {
    setIsCartShown(false);
  }
  return (
    <Suspense fallback={<div>please wait page is rendering</div>}>
    <CartProvider>
      {isCartShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
    </Suspense>
  );
}

export default App;

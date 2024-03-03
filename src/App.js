import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Product from './Pages/Product';
import ProductDetail from './Pages/ProductDetail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />
      </Routes>
    </>
  );
}

export default App;

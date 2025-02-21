import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import "./index.css";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CitiesProviderContext } from "./contexts/CitiesContext";
import { AuthContextProvider } from "./contexts/FakeAuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";

function App() {
  return (
    <CitiesProviderContext>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              Home
            </Route>
            <Route path="/product" element={<Product />}>
              Product
            </Route>
            <Route path="/pricing" element={<Pricing />}>
              Pricing
            </Route>

            <Route path="/login" element={<Login />}>
              Pricing
            </Route>
            <Route
              path="/app"
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<Navigate to="cities" replace={true} />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="form" element={<Form />} />
              <Route path="countries" element={<CountryList />} />
            </Route>

            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </CitiesProviderContext>
  );
}

export default App;

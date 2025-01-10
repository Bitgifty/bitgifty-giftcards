import { createBrowserRouter } from "react-router-dom";
import Home from "./src/pages/Home";
import BuyGiftCard from "./src/pages/BuyGiftCard";
import PurchaseForm from "./src/pages/PurchaseForm";
import SellGiftCard from "./src/pages/SellGiftCard";
import SellForm from "./src/pages/SellForm";
import BuyCheckout from "./src/pages/BuyCheckout";
import SellCheckout from "./src/pages/SellCheckout";
import History from "./src/pages/History";
import HistoryDetail from "./src/pages/HistoryDetail";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/buy-gift-card",
    element: <BuyGiftCard />,
  },
  {
    path: "/sell-gift-card",
    element: <SellGiftCard />,
  },
  {
    path: "/buy-gift-card/:brand",
    element: <PurchaseForm />,
  },
  {
    path: "/sell-gift-card/:brand",
    element: <SellForm />,
  },
  {
    path: "/buy-gift-card/:brand/checkout",
    element: <BuyCheckout />,
  },
  {
    path: "/sell-gift-card/:brand/checkout",
    element: <SellCheckout />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/transaction-receipt/:id",
    element: <HistoryDetail />,
  },
]);

export default routes;

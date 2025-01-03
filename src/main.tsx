import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { SnackbarProvider } from "notistack";
import {
  SnackbarCloseButton,
  StyledMaterialDesignContent,
} from "./components/utils/SnackbarProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <SnackbarProvider
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      hideIconVariant
      autoHideDuration={10000}
      action={(snackbarId) => <SnackbarCloseButton snackbarId={snackbarId} />}
    >
      <App />
    </SnackbarProvider>
  </Provider>
);

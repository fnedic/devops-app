import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
// theme.ts
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Mono, monospace",
    allVariants: {
      fontFamily: "Roboto Mono, monospace",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Form />
      <Footer />
    </ThemeProvider>
  );
}

export default App;

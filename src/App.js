import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./comp/navBar/navBar";

function App() {
  return (
    <ChakraProvider>
      <NavBar />
    </ChakraProvider>
  );
}

export default App;

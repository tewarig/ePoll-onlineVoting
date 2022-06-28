import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./comp/navBar/navBar";
import DashBoard from "./pages/dashboard/dashboard";
import Home from "./pages/home/home";
import Poll from "./pages/poll/poll";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./comp/protectedRoute/protectedRoute";

function App() {
  return (
    <ChakraProvider>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/poll" element={<Poll />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

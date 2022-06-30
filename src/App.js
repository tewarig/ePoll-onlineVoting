import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./comp/navBar/navBar";
import DashBoard from "./pages/dashboard/dashboard";
import Home from "./pages/home/home";
import Poll from "./pages/poll/poll";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./comp/protectedRoute/protectedRoute";
import RedirectOnlogin from "./comp/RedirectOnLogin/redirectOnLogin";
import View from "./pages/View/View";
import Context from "./context";

function App() {
  return (
    <ChakraProvider>
      <Context>
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              index
              element={
                <RedirectOnlogin routeLink="/dashboard">
                  <Home />
                </RedirectOnlogin>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashBoard />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/poll" element={<Poll />} />
            <Route
              path="/viewpoll/"
              element={
                <ProtectedRoute>
                  <View />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Context>
    </ChakraProvider>
  );
}

export default App;

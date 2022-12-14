import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadMediaPage from "./pages/UploadMediaPage";
import ViewVideoPage from "./pages/ViewVideoPage";
import {ProtectedRoute} from "./routes/ProtectedRoute";
import {AuthProvider} from "./routes/AuthProvider";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashBoardPage from "./pages/DashBoardPage";

function App() {
  return (

    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path={"/"} element={
                    <ProtectedRoute accessRoles={["ADMIN"]}>
                        <HomePage/>
                    </ProtectedRoute>
                }/>
                <Route path={"/categories"} element={
                    <ProtectedRoute accessRoles={["ADMIN"]}>
                        <HomePage/>
                    </ProtectedRoute>
                }/>
                <Route path={"/pornstars"} element={
                    <ProtectedRoute accessRoles={["ADMIN"]}>
                        <HomePage/>
                    </ProtectedRoute>
                }/>
                <Route path={"/view_video"} element={
                    <ProtectedRoute accessRoles={["ADMIN"]}>
                        <ViewVideoPage/>
                    </ProtectedRoute>
                }/>
                <Route path={"/upload"} element={
                    <ProtectedRoute accessRoles={["USER", "ADMIN"]}>
                        <UploadMediaPage/>
                    </ProtectedRoute>
                }/>
                <Route path={"/dashboard"} element={<DashBoardPage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/signup"} element={<SignUpPage/>}/>

            </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

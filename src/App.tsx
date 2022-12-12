import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadMediaPage from "./pages/UploadMediaPage";
import ViewVideoPage from "./pages/ViewVideoPage";
import {ProtectedRoute} from "./routes/ProtectedRoute";
import {AuthProvider} from "./routes/AuthProvider";
import LoginPage from "./pages/LoginPage";

function App() {
  return (

    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/categories"} element={<HomePage/>}/>
                <Route path={"/pornstars"} element={<HomePage/>}/>
                <Route path={"/upload"} element={
                    <ProtectedRoute>
                        <UploadMediaPage/>
                    </ProtectedRoute>
                }
                />
                <Route path={"/view_video"} element={<ViewVideoPage/>}/>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

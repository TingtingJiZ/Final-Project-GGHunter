import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
// Custom component
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { NavbarGame } from "./component/NavbarGame.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom pages
import { Home } from "./pages/Home.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Signup } from "./pages/Signup.jsx";
import { PCGames } from "./pages/PCGames.jsx";
import { CommentsGames } from "./pages/CommentsGames.jsx";



// Create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <NavbarGame />
                    <Routes>
                        <Route element={<Error404 />} path="*" />
                        <Route element={<HomePage />} path="/" />
                        <Route element={<Profile />} path="/profile"/>
                        <Route element={<Signup />} path="/signup"/>
                        <Route element={<PCGames />} path="/PCgames"/>
                        <Route element={<CommentsGames />} path="/commentsgames"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

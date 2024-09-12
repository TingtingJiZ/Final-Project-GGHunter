import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
// Custom component
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { NavbarGame } from "./component/NavbarGame.jsx";
import { Footer } from "./component/Footer.jsx";
import { Premium } from "./component/Premium.jsx"
// Custom pages
import { Home } from "./pages/Home.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Signup } from "./pages/Signup.jsx";
import { PCGames } from "./pages/PCGames.jsx";
import { PcGameDetails } from "./pages/PCGamesDetails.jsx";
import { CommentsGames } from "./pages/CommentsGames.jsx";
import { RequirementsGames } from "./pages/RequirementsGames.jsx";
import { PayPremium } from "./pages/PayPremium.jsx";
import { PayReady } from "./pages/PayReady.jsx";
import { Nintendo } from "./pages/Nintendo.jsx";
import { PlayStation } from "./pages/PlayStation.jsx";
import { Xbox } from "./pages/Xbox.jsx";


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
                        <Route element={<PCGames />} path="/pcgames" />
                        <Route element={<PcGameDetails />} path="/pcgamedetails" />
                        <Route element={<PCGames />} path="/pcgames"/>
                        <Route element={<Nintendo/>} path="/nintendo" />
                        <Route element={<PlayStation/>} path="/playstation"/>
                        <Route element={<Xbox/>} path="xbox"/>
                        <Route element={<CommentsGames />} path="/comments-games"/>
                        <Route element={<RequirementsGames />} path="/requirements-games"/>
                        <Route element={<Premium />} path="/premium"/>
                        <Route element={<PayPremium />} path="/pay-premium"/>
                        <Route element={<PayReady />} path="/pay-ready"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

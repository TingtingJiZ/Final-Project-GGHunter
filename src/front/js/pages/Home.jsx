import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Layout from "../Layout.jsx";
import { PcGameDetails } from "./PCGamesDetails.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			 <Layout/> 
			<PCGames/>
			<PcGameDetails/>
		</div>
	);
};

import React from "react";
import { ListBox } from "./ListBox";

//create your first component
const Home = () => {
	return (
		<div className="d-flex flex-column align-items-center">
			<h1 className="fw-light display-1 text-secondary my-3">Lista de Tareas</h1>
			<ListBox />
		</div>
	);
};

export default Home;
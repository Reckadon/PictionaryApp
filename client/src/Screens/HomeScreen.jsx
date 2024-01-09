import { useState } from "react";
import { motion } from "framer-motion";
import "./HomeScreen.scss";

const HomeScreen = () => {
	const [username, setUsername] = useState();

	return (
		<div className="home-screen">
			<motion.h1 layout="position" layoutId="heading">
				Pictionary Game
			</motion.h1>
			<div className="card">
				<input
					type="text"
					placeholder="Enter your username"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<button className="styledButton">Play</button>
			</div>
		</div>
	);
};

export default HomeScreen;

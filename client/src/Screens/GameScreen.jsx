import { motion } from "framer-motion";
import "./GameScreen.scss";

const GameScreen = () => {
	return (
		<div className="game-screen">
			<motion.h1 layout="position" layoutId="heading">
				Pictionary Game
			</motion.h1>
		</div>
	);
};

export default GameScreen;

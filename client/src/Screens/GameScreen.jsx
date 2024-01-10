import { m } from "framer-motion";
import "./GameScreen.scss";

const GameScreen = () => {
	return (
		<div className="game-screen">
			<div className="game-container">
				<m.h1 layout="position" layoutId="heading">
					Pictionary Game
				</m.h1>
			</div>
		</div>
	);
};

export default GameScreen;

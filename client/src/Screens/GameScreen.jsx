import { m } from "framer-motion";
import "./GameScreen.scss";
import Grid from "../components/Grid";

const GameScreen = () => {
	return (
		<div className="game-screen">
			<div className="game-container">
				<Grid
					left={
						<m.h2 transition={{ delay: 0.52, duration: 0.4 }} layout="position" layoutId="heading">
							Pictionary Game
						</m.h2>
					}
					middle={<canvas width={800} height={600}></canvas>}
					right={<div>Right container</div>}
				/>
			</div>
		</div>
	);
};

export default GameScreen;

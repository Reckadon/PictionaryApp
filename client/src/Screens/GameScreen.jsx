import { m } from "framer-motion";
import "./GameScreen.scss";
import Grid from "../components/Grid";

const GameScreen = ({ roomID = "", players = [], onGameLeave }) => {
	return (
		<div className="game-screen">
			<div className="game-container">
				<Grid
					left={
						<>
							<m.h2
								transition={{ delay: 0.52, duration: 0.4 }}
								layout="position"
								layoutId="heading"
							>
								Pictionary Game
							</m.h2>
							<div>
								{players.map((p, i) => (
									<div key={p.id}>
										{i + 1}: {p.username}
									</div>
								))}
								<button
									className="styledButton fit"
									onClick={() => navigator.clipboard.writeText(roomID)}
								>
									Copy Room ID: {roomID}
								</button>
								<button className="styledButton fit danger" onClick={onGameLeave}>
									Leave
								</button>
							</div>
						</>
					}
					middle={<canvas width={800} height={600}></canvas>}
					right={<div>Right container</div>}
				/>
			</div>
		</div>
	);
};

export default GameScreen;

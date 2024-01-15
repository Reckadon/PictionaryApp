import { useState } from "react";
import GameScreen from "./Screens/GameScreen";
import HomeScreen from "./Screens/HomeScreen";
import { AnimatePresence, LazyMotion } from "framer-motion";
import { useRoomData } from "./utils/hooks";

const loadFeatures = () => import("./motion-features").then(res => res.default);

function App() {
	const [isInGame, setIsInGame] = useState(false);
	const roomData = useRoomData();

	return (
		<LazyMotion strict features={loadFeatures}>
			<div className="bg"></div>
			<button
				style={{ position: "absolute", zIndex: 99 }}
				onClick={() => setIsInGame(prev => !prev)}
			>
				Change Screen
			</button>
			<AnimatePresence mode="popLayout">
				{!isInGame && (
					<HomeScreen
						onGameJoin={() => {
							setIsInGame(true);
						}}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence mode="popLayout">{isInGame && <GameScreen {...roomData} />}</AnimatePresence>
		</LazyMotion>
	);
}

export default App;

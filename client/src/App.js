import { useState } from "react";
import GameScreen from "./Screens/GameScreen";
import HomeScreen from "./Screens/HomeScreen";
import { AnimatePresence, LazyMotion } from "framer-motion";

const loadFeatures = () => import("./motion-features").then(res => res.default);

function App() {
	const [isInGame, setIsInGame] = useState(false);

	return (
		<LazyMotion strict features={loadFeatures}>
			<div className="bg"></div>
			<button
				style={{ position: "absolute", zIndex: 99 }}
				onClick={() => setIsInGame(prev => !prev)}
			>
				Change Screen
			</button>
			<AnimatePresence mode="popLayout">{!isInGame && <HomeScreen />}</AnimatePresence>
			<AnimatePresence mode="popLayout">{isInGame && <GameScreen />}</AnimatePresence>
		</LazyMotion>
	);
}

export default App;

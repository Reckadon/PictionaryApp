import { lazy, useState } from "react";
import HomeScreen from "./Screens/HomeScreen";
import { AnimatePresence, LazyMotion } from "framer-motion";
import { useRoomData } from "./utils/hooks";
import { disconnectFromSocket, leaveRoom } from "./utils/socketUtils";

const GameScreen = lazy(() => import("./Screens/GameScreen"));
const loadFeatures = () => import("./motion-features").then(res => res.default);

function App() {
	const [isInGame, setIsInGame] = useState(false);
	const [playerID, roomData] = useRoomData();

	const handleGameLeave = () => {
		leaveRoom(playerID, roomData.roomID, () => {
			setIsInGame(false);
			disconnectFromSocket();
		});
	};

	return (
		<LazyMotion strict features={loadFeatures}>
			<div className="bg"></div>
			<AnimatePresence mode="popLayout">
				{!isInGame && (
					<HomeScreen
						onGameJoin={() => {
							setIsInGame(true);
						}}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence mode="popLayout">
				{isInGame && <GameScreen playerID={playerID} {...roomData} onGameLeave={handleGameLeave} />}
			</AnimatePresence>
		</LazyMotion>
	);
}

export default App;

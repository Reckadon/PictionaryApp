import { useState } from "react";
import GameScreen from "./Screens/GameScreen";
import HomeScreen from "./Screens/HomeScreen";

function App() {
	const [isInGame, setIsInGame] = useState(false);

	return (
		<>
			<div className="bg"></div>
			<button style={{ position: "absolute" }} onClick={() => setIsInGame(prev => !prev)}>
				Change Screen
			</button>
			{isInGame ? <GameScreen /> : <HomeScreen />}
		</>
	);
}

export default App;

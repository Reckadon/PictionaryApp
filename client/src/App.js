import { useState } from "react";
import GameScreen from "./Screens/GameScreen";
import HomeScreen from "./Screens/HomeScreen";

function App() {
	const [isInGame, setIsInGame] = useState(false);

	return <>{isInGame ? <GameScreen /> : <HomeScreen />}</>;
}

export default App;

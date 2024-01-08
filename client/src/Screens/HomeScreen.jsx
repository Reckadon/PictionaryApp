import { useState } from "react";
import "./HomeScreen.scss";

const HomeScreen = () => {
	const [username, setUsername] = useState();

	return (
		<div className="home-screen">
			<h1>Pictionary Game</h1>
			<div className="card">
				<input
					type="text"
					placeholder="Enter your username"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default HomeScreen;

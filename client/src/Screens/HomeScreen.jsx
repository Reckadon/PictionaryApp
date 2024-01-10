import { useState } from "react";
import { m } from "framer-motion";
import "./HomeScreen.scss";

const HomeScreen = () => {
	const [username, setUsername] = useState();

	return (
		<div className="home-screen">
			<m.h1 layout="position" layoutId="heading">
				Pictionary Game
			</m.h1>
			<m.div
				key="home-screen-card"
				className="card"
				transition={{ ease: "backInOut" }}
				exit={{ y: document.body.scrollHeight / 1.5 }}
				animate={{ y: 0 }}
				initial={{ y: document.body.scrollHeight / 1.5 }}
			>
				<label>
					Username:
					<br />
					<input
						type="text"
						placeholder="Enter your username"
						value={username}
						onChange={e => setUsername(e.target.value)}
						//TODO: triggers 'play' when enter pressed
					/>
				</label>
				<hr />
				<section>
					<label>
						Join Room: <br />
						<input type="text" placeholder="Enter Room ID to join" />
						<button className="styledButton">Join</button>
					</label>
				</section>
				<br />
				<label>
					Create Private Room: <br />
					<button className="styledButton wide">Create Room</button>
				</label>
			</m.div>
		</div>
	);
};

export default HomeScreen;

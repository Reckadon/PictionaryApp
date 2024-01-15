import { useState } from "react";
import { m } from "framer-motion";
import "./HomeScreen.scss";
import {
	connectToRoom,
	connectToSocket,
	createAndConnectToRoom,
	disconnectFromSocket,
} from "../utils/socketUtils";

/**
 * @param {()=>void} onGameJoin runs when user joins a room successfully
 * @return {React.JSX.Element}
 */
const HomeScreen = ({ onGameJoin }) => {
	const [username, setUsername] = useState("");
	const [roomID, setRoomID] = useState("");

	const handleCreateRoom = () => {
		connectToSocket();
		createAndConnectToRoom(username, () => onGameJoin());
	};

	const handleJoinRoom = () => {
		connectToSocket();
		connectToRoom(username, roomID, ({ status }) => {
			if (status === 404) {
				disconnectFromSocket();
				alert("Invalid Room ID!");
			} else if (status === 200) {
				onGameJoin();
			}
		});
	};

	return (
		<div className="home-screen">
			<m.h1 layout="position" layoutId="heading">
				Pictionary Game
			</m.h1>
			<m.div
				key="home-screen-card"
				className="card"
				transition={{ ease: "backInOut", duration: 0.5 }}
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
					/>
				</label>
				<hr />
				<section>
					<label>
						Join Room: <br />
						<input
							type="text"
							placeholder="Enter Room ID to join"
							value={roomID}
							onChange={e => setRoomID(e.target.value)}
							onKeyDown={e => {
								if (roomID && username && e.key === "Enter") handleJoinRoom();
							}}
						/>
						<button
							disabled={!(roomID && username)}
							className="styledButton"
							onClick={handleJoinRoom}
						>
							Join
						</button>
					</label>
				</section>
				<br />
				<label>
					Create Private Room: <br />
					<button disabled={!username} className="styledButton wide" onClick={handleCreateRoom}>
						Create Room
					</button>
				</label>
			</m.div>
		</div>
	);
};

export default HomeScreen;

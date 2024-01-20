import { m } from "framer-motion";
import "./GameScreen.scss";
import Grid from "../components/Grid";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useState } from "react";
import { sendMessageToServer } from "../utils/socketUtils";
import PlayersList from "../components/PlayersList";
import GameCanvas from "../components/GameCanvas";

const GameScreen = ({ playerID, roomID = "", players = [], messages = [], onGameLeave }) => {
	const [inputMessage, setInputMessage] = useState("");

	const sendMessage = () => {
		sendMessageToServer(playerID, roomID, inputMessage);
		setInputMessage("");
	};

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
							<div className="panelBox">
								<PlayersList players={players} />
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
					middle={<GameCanvas />}
					right={
						<div className="panelBox chat">
							<div className="messages">
								{messages.map(msg => (
									<div style={{ color: msg.color !== "def" && msg.color }}>
										{msg.username ? (
											<>
												<span>{msg.username}</span>: <span>{msg.text}</span>
											</>
										) : (
											<>{msg.text}</>
										)}
									</div>
								))}
							</div>
							<div className="controls">
								<input
									type="text"
									value={inputMessage}
									onChange={e => setInputMessage(e.target.value)}
									placeholder="Type your message here"
									onKeyDown={e => {
										if (inputMessage && e.key === "Enter") sendMessage();
									}}
								></input>
								<button className="styledButton compact" onClick={sendMessage}>
									<KeyboardReturnIcon />
								</button>
							</div>
						</div>
					}
				/>
			</div>
		</div>
	);
};

export default GameScreen;

import "./PlayersList.scss";
import Person4Icon from "@mui/icons-material/Person4";

/**
 *
 * @param {Array} players array of player objects to display
 * @returns react element
 */
const PlayersList = ({ players }) => {
	return (
		<div className="playersContainer">
			{players.map(p => (
				<div key={p.id}>
					<Person4Icon /> {p.username} <span>{p.points}</span>
				</div>
			))}
		</div>
	);
};

export default PlayersList;

import { m } from "framer-motion";
import "./Grid.scss";

const Grid = ({ left, middle, right }) => {
	return (
		<div className="grid">
			<m.div
				className="panel"
				transition={{ ease: "easeOut", duration: 0.4, delay: 0.49 }}
				initial={{ x: -document.body.clientWidth / 2 }}
				exit={{ x: -document.body.clientWidth / 2 }}
				animate={{ x: 0 }}
			>
				{left}
			</m.div>
			<m.div
				transition={{ ease: "backInOut", duration: 0.5 }}
				initial={{ y: -document.body.scrollHeight }}
				exit={{ y: -document.body.scrollHeight }}
				animate={{ y: 0 }}
				className="panel"
			>
				{middle}
			</m.div>
			<m.div
				className="panel"
				transition={{ ease: "easeOut", duration: 0.4, delay: 0.49 }}
				initial={{ x: document.body.clientWidth / 2 }}
				exit={{ x: document.body.clientWidth / 2 }}
				animate={{ x: 0 }}
			>
				{right}
			</m.div>
		</div>
	);
};

export default Grid;

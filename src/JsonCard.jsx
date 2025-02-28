import JsonView from "@uiw/react-json-view";
import { vscodeTheme } from "@uiw/react-json-view/vscode";

function JsonCard({ data, title }){
	return (
		<div>
			<h4>{ title }</h4>
			<JsonView value={data} style={vscodeTheme} />
		</div>
	)
}

export default JsonCard;
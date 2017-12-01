import React from "react";
import "./index.scss";
import Navbar from "../Common/Navbar";

var footsrc = require("@/assets/foot.png");

class App extends React.Component{
	constructor(){
		super();
		this.state={
		}
	}

	render(){
		return <div>
			
			<Navbar></Navbar>

			<div className="main">
			{
				this.props.children
			}
			</div>
		</div>
	}
}

export default App;
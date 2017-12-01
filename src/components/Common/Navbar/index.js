import React from "react";
import "./index.scss";
import "@/assets/iconfont/iconfont.css"; 
import "@/assets/iconfont/iconfont.js"; 
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

var logosrc = require("@/assets/logo.png");

class Navbar extends React.Component{
	constructor(){
		super();
		this.state={

		}
	}

	render(){
		return <nav>
			
			<div className="left">
				<NavLink to="/home"><img src={logosrc}/></NavLink>
			</div>
			<div className="middle">
				<ul>
					<li className="li1"><NavLink to="/film">电影</NavLink></li>
					<li className="li2"><NavLink to="/book">图书</NavLink></li>
					<li className="li3"><NavLink to="/play">广播</NavLink></li>
					<li className="li4"><NavLink to="/team">小组</NavLink></li>
					<li className="li5"><NavLink to="/collect">收藏</NavLink></li>
				</ul>
			</div>
			<div className="right">
				<NavLink to="/search"><i className="icon iconfont icon-fangdajing"></i></NavLink>
			</div>
		</nav>
	}

}

export default connect(
		(state)=>{
			return {
				
			}
		},
		null
	)(Navbar);
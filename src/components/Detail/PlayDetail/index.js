import React from "react";
import "./index.scss";
import {connect} from "react-redux";
import {NavLink } from "react-router-dom";

var loadingsrc = require("@/assets/loading.gif");

class PlayDetail extends React.Component{
	constructor(){
		super();
		this.state={

		}
	}

	componentDidMount() {
		if(this.props.datalist.length==0){
			this.props.getPlayDetailPromise(this.props.match.params.id);
		}else{
			window.location.reload();
		}
	}

	render(){
		if(this.props.datalist.length<=0){
			return <div className="loading">
				<img src={loadingsrc}/>
			</div>
		}
		var info = this.props.datalist[0].data;
		var comment = this.props.datalist[1].data.comments;
		console.log(info);
		
		return <div id="playdetail">
			<div className="info">
				<div className="title">
					<img src={info.author.avatar}/>
					<p>{info.author.name} <span>{info.activity}</span></p>
					<span>{info.create_time}</span>
				</div>
				<div className="count">
				<p>{info.reshared_status?info.reshared_status.text:""}</p>
				{info.images[0]?
					(<div className="shuo">
						<p>{info.text}</p>
						<img src={info.images[0]?info.images[0].normal.url:""}/>
					</div>):null
				}
					<div className="riji">
						<p>{info.card?info.card.title:""}</p>
						<p className="p2">{info.card?info.card.subtitle:""}</p>
					</div>
				</div>
			</div>
			<div className="comment">
				<span className="comtitle">热门回应</span>
				<ul>
					{
						comment.map((item,index)=>
						<li key={index}>
							<img src={item.author.avatar}/>
							<div className="cominfo">
								<div>
									<span className="name">{item.author.name}</span>
								</div>
								<p className="time">{item.create_time}</p>
								<p className="commentmain">{item.text}</p>
							</div>
						</li>
					)
					}
				</ul>
			</div>
		</div>
	}
}


export default connect(
	(state)=>{
		return {
			datalist:state.playdetail
		}
	},
	{
		getPlayDetailPromise:(id)=>{
			return Promise.all([
				axios.get("/rexxar/api/v2/status/"+id+"?ck=&for_mobile=1"),
				axios.get("/rexxar/api/v2/status/"+id+"/comments?start=0&count=20&ck=&for_mobile=1")
			]).then(res=>{
				return {
					type:"PLAY_DETAIL",
					payload:res
				}
			})
		}

	}

)(PlayDetail);
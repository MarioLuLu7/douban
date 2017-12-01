import React from "react";
import "./index.scss";
import {connect} from "react-redux";

var loadingsrc = require("@/assets/loading.gif");

class Play extends React.Component{
	constructor(){
		super();
		this.state={
		}
	}

	componentDidMount() {
		if(this.props.datalist.length==0){
			this.props.getPlayPromise("");
		}
	}


	render(){
		if(this.props.datalist.length<=0){
			return <div className="loading">
				<img src={loadingsrc}/>
			</div>
		}
		return <div>
			<div className="bookList">
				{
					this.props.datalist.map(item=>
						<div className="bookmain" key={item.status.id} onClick={this.toDetail.bind(this,item.status.id)}>
							<div className="title">
								<img src={item.status.author.avatar}/>
								<p>{item.status.author.name} <span>{item.status.activity}</span></p>
								<span>{item.status.create_time}</span>
							</div>
							<div className="count">
							<p>{item.status.reshared_status?item.status.reshared_status.text:""}</p>
							{item.status.images[0]?
								(<div className="shuo">
									<p>{item.status.text}</p>
									<img src={item.status.images[0]?item.status.images[0].normal.url:""}/>
								</div>):null
							}
								<div className="riji">
									<p>{item.status.card?item.status.card.title:""}</p>
									<p className="p2">{item.status.card?item.status.card.subtitle:""}</p>
								</div>
							</div>
						</div>
					)
				}
				<div className="more" onClick={this.getMore.bind(this)}>加载更多</div>
			</div>
		</div>
	}


	getMore(){
		var x = this.props.datalist[this.props.datalist.length-1].status.id;
		this.props.changeLast(x);
		this.props.getPlayPromise(x);
	}

	toDetail(id){
		this.props.history.push(`/playdetail/${id}`);
	}

}



export default connect(
	(state)=>{
		return {
			datalist:state.play,
			last:state.last
		}
	},
	{
		getPlayPromise:(last)=>{
			return axios.get("/rexxar/api/v2/status/anonymous_timeline?max_id="+last+"&ck=&for_mobile=1").then(res=>{
				return {
					type:"PLAY",
					payload:res.data.items
				}
			})
		},
		changeLast:(last)=>{
			return {
				type:"LAST",
				payload:last
			}
		}
		

	}

)(Play);
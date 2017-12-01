import React from "react";
import "./index.scss";
import {connect} from "react-redux";
import {NavLink } from "react-router-dom";

var loadingsrc = require("@/assets/loading.gif");

class Film extends React.Component{
	constructor(){
		super();
		this.state={

		}
	}


	componentDidMount() {
		if(this.props.datalist.length==0){
			this.props.getFilmPromise();
		}
	}

	render(){
		if(this.props.datalist.length<=0){
			return <div className="loading">
				<img src={loadingsrc}/>
			</div>
		}
		return <div id="film">
			{
				this.props.datalist.map((item,index)=>
					<div className="smallbox" key={index}>
						<div className="title">
							<span>{item.data.subject_collection.name}</span>
							<a onClick={this.more.bind(this,item.data.subject_collection.id)}>更多</a>
						</div>
						<div className="smallmain">
							<ul>
								{
									item.data.subject_collection_items.map((ite,ind)=>
										<li key={ind} onClick={this.toDetail.bind(this,ite.id)}>
											<img src={ite.cover.url}/>
											<p className="p1">{ite.title}</p>
											<p className="p2">评分：{ite.rating?ite.rating.value:"暂无评分"}</p>
										</li>
									)
								}
							</ul>
						</div>
					</div>
				)
			}
		</div>
	}

	toDetail(id){
		this.props.history.push(`/filmdetail/${id}`);
	}

	more(type){
		this.props.history.push(`/more/${type}`);
	}
}


export default connect(
	(state)=>{
		return {
			datalist:state.film
		}
	},
	{
		getFilmPromise:()=>{
			return Promise.all([
				axios.get("/rexxar/api/v2/subject_collection/movie_showing/items?os=ios&start=0&count=8&loc_id=108288&_=0"),
				axios.get("/rexxar/api/v2/subject_collection/movie_free_stream/items?os=ios&start=0&count=8&loc_id=108288&_=0"),
				axios.get("/rexxar/api/v2/subject_collection/movie_latest/items?os=ios&start=0&count=8&loc_id=108288&_=0")
			]).then(res=>{
				return {
					type:"FILM",
					payload:res
				}
			})
		}

	}

)(Film);
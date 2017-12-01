import React from "react";
import "./index.scss";
import {connect} from "react-redux";
import {NavLink } from "react-router-dom";

var loadingsrc = require("@/assets/loading.gif");

class FilmDetail extends React.Component{
	constructor(){
		super();
		this.state={

		}
	}

	componentDidMount() {
		this.props.getFilmDetailPromise(this.props.match.params.id);
	}

	render(){
		if(this.props.datalist.length<=0){
			return <div className="loading">
				<img src={loadingsrc}/>
			</div>
		}
		var info = this.props.datalist[0].data;
		var people = this.props.datalist[1].data.credits;
		var comment = this.props.datalist[2].data.interests;

		if(this.props.match.params.id != info.id){
			return <div className="loading">
				<img src={loadingsrc}/>
			</div>
		}

		var filminfo = [...info.aka,...info.durations,...info.genres,...info.countries,...info.languages,...info.pubdate,"上映"].join("/");

		var peoplecount=[];
		for(var i=0;i<people.length;i++){
			for(var j=0;j<people[i].celebrities.length;j++){
				var obj={
					name:people[i].celebrities[j].name,
					title:people[i].title,
					img:people[i].celebrities[j].cover_url
				}
				peoplecount.push(obj);
			}
		}
		
		return <div id="filmdetail">
			<p className="filmtitle">
				{info.title}
				<span className="shoucang" onClick={this.props.collect.bind(this,info)}>收藏</span>
			</p>
			<div className="info">
				<div>
					<span className="sp1">评分：{info.rating?info.rating.value:"暂无评分"}</span>
					<span className="sp2">{info.rating.count}人评价</span>
					<p>{filminfo}</p>
				</div>
				<img src={info.pic.normal}/>
			</div>
			<div className="jianjie">
				<span>{info.title}的简介</span>
				<p>{info.intro}</p>
			</div>
			<div className="people">
				<span className="peotitle">影人</span>
				<ul>
					{
						peoplecount.map((item,index)=>
						<li key={index}>
							<img src={item.img}/>
							<p>{item.name}</p>
							<span>{item.title}</span>
						</li>
					)
					}
				</ul>
			</div>
			<div className="comment">
				<span className="comtitle">{info.title}的热评</span>
				<ul>
					{
						comment.map((item,index)=>
						<li key={index}>
							<img src={item.user.avatar}/>
							<div className="cominfo">
								<div>
									<span className="name">{item.user.name}</span>
									<span className="value">评分：{item.rating?item.rating.value:"暂无评分"}</span>
								</div>
								<p className="time">{item.create_time}</p>
								<p className="commentmain">{item.comment}</p>
								<p className="zan">{item.vote_count}人赞了TA</p>
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
			datalist:state.filmdetail
		}
	},
	{
		getFilmDetailPromise:(id)=>{
			return Promise.all([
				axios.get("/rexxar/api/v2/movie/"+id),
				axios.get("/rexxar/api/v2/movie/"+id+"/credits"),
				axios.get("/rexxar/api/v2/movie/"+id+"/interests?count=20&order_by=hot&start=0&for_mobile=1")
			]).then(res=>{
				return {
					type:"FILM_DETAIL",
					payload:res
				}
			})
		},
		collect:(obj)=>{
			return {
				type:"COLLECT",
				payload:obj
			}
		}

	}

)(FilmDetail);
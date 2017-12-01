import React from "react";
import "./index.scss";
import {connect} from "react-redux";

var loadingsrc = require("@/assets/loading.gif");

class Home extends React.Component{
	constructor(){
		super();
		this.state={
		}
	}

	componentDidMount() {
		if(this.props.datalist.length==0){
			this.props.getHomePromise("");
		}
	}


	render(){
		if(this.props.datalist.length<=0){
			return <div className="loading">
				<img src={loadingsrc}/>
			</div>
		}
		return <div>
			<div className="homeList">
				{
					this.props.datalist.map(item=>
						item.target.cover_url?
							<div className="list"  key={item.id}>
								<div className="top">
									<p className="p1">{item.title}</p>
									<p className="p2">{item.target.desc}</p>
									<img src={item.target.cover_url}/>
								</div>
								<div className="bottom">
									<span className="sp1">by{item.target.author.name}</span>
									<span className="sp2">{item.source_cn}</span>
								</div>
							</div>
						:
							<div className="list2"  key={item.id}>
								<div className="top">
									<p className="p1">{item.title}</p>
									<p className="p2">{item.target.desc}</p>
								</div>
								<div className="bottom">
									<span className="sp1">by{item.target.author.name}</span>
									<span className="sp2">{item.source_cn}</span>
								</div>
							</div>
						
					)
				}
				<div className="more" onClick={this.getMore.bind(this,this.props.date)}>加载更多</div>
			</div>

		</div>
	}


	getMore(date){
		date=new Date(date-24*60*60*1000);
		this.props.changeDate(date);
		date=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
		this.props.getHomePromise(date);

	}

}



export default connect(
	(state)=>{
		return {
			datalist:state.list,
			date:state.date
		}
	},
	{
		getHomePromise:(date)=>{
			return axios.get("/rexxar/api/v2/recommend_feed?alt=json&next_date="+date+"&loc_id=108288&gender=&birthday=&udid=9fcefbf2acf1dfc991054ac40ca5114be7cd092f&for_mobile=1").then(res=>{
				return {
					type:"homelist",
					payload:res.data.recommend_feeds
				}
			})
		},
		changeDate:(date)=>{
			return {
				type:"date",
				payload:date
			}
		}
		

	}

)(Home);
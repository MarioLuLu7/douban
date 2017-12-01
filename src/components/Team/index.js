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
			this.props.getTeamPromise();
		}
	}


	render(){
		if(this.props.datalist.length<=0){
			return <div className="loading">
				<img src={loadingsrc}/>
			</div>
		}
		return <div id="team">
			{
				this.props.datalist.map((item,index)=>
					<div className="teammain" key={index}>
						<p className="title">{item.name}</p>
						<ul>
							{
								item.groups.map(ite=>
									<li key={ite.id}>
										<div>
											<img src={ite.avatar}/>
											<p className="name">{ite.name}</p>
											<span className="number">{ite.member_count}人</span>
										</div>
										<p className="info">{ite.desc_abstract}</p>
									</li>
								)
							}
						</ul>
					</div>
				)
			}
		</div>
	}

}



export default connect(
	(state)=>{
		return {
			datalist:state.team,
		}
	},
	{
		getTeamPromise:()=>{
			return axios.get("/rexxar/api/v2/group/rec_groups_for_newbies?ck=&for_mobile=1").then(res=>{
				return {
					type:"TEAM",
					payload:res.data.rec_groups[0].classified_groups
				}
			})
		}
	}

)(Play);
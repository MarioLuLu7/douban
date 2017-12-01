import React from "react";
import "./index.scss";
import {connect} from "react-redux";

var loadingsrc = require("@/assets/loading.gif");
var _ = require('lodash');

class Collect extends React.Component{
	constructor(){
		super();
		this.state={
		}
	}

	componentDidMount() {
	}


	render(){
		if(this.props.datalist.length<=0){
			return <div className="no">
				没有任何收藏
            </div>
        }
		var datalist = _.uniq(this.props.datalist);
		var output_LI=[];
		var item;
		var type;
		for(var i=0;i<datalist.length;i++){
			item = datalist[i];
			if(item.type=='movie'){
				type='电影';
			}else{
				type='图书';
			}
			output_LI.push(
				<li key={i} onClick={this.toDetail.bind(this,item.id,type)}>
					<img src={item.pic.normal}/>
					<div>
						<span className="sertitle">{item.title}</span>
						<span className="type">类型：{type}</span>
						<span className="year">年份：{item.year?item.year:item.pubdate[0]}</span>
						<p>{item.intro}</p>
					</div>
				</li>
			)
		}
		return <div id="collect">
		<p className="collectTitle">我的收藏</p>
			<ul>
				{output_LI}
			</ul>
		</div>
	}

	toDetail(id,type){
		if(type=="电影"){
			this.props.history.push(`/filmdetail/${id}`);
		}else{
			this.props.history.push(`/bookdetail/${id}`);
		}
		
	}

}

export default connect(
	(state)=>{
		return {
            datalist:state.collect
		}
	}

)(Collect);
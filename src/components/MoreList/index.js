import React from "react";
import "./index.scss";
import {connect} from "react-redux";
import { Pagination, Icon } from 'antd-mobile';

var loadingsrc = require("@/assets/loading.gif");

class MoreList extends React.Component{
	constructor(){
		super();
		this.state={
            page:1
		}
	}

	componentDidMount() {
		this.props.getMorePromise(this.props.match.params.type);
	}


	render(){
		if(this.props.datalist.length<=0){
			return <div className="loading">
				<img src={loadingsrc}/>
			</div>
		}
		if(this.props.match.params.type != this.props.datalist.subject_collection.id){
			return <div className="loading">
				<img src={loadingsrc}/>
			</div>
		}
        const locale = {
            prevText: '上一页',
            nextText: '下一页',
        };
        var total = Math.ceil(this.props.datalist.total/9);
        var data = this.props.datalist.subject_collection_items.slice((this.state.page-1)*9,this.state.page*9);
        var output_LI = [];
        var item;
        var type;
        for(var i=0;i<data.length;i++){
            item = data[i];
            if(item.type=='movie'){
				type='电影';
			}else{
				type='图书';
			}
            output_LI.push(
                <li key={i} onClick={this.toDetail.bind(this,item.id,type)}>
                    <img src={item.cover.url}/>
                    <p className="moretitle">{item.title}</p>
                    <p className="value">评分：{item.rating?item.rating.value:"暂无评分"}</p>
                </li>
            )
        }

		return <div id="more">
			<div className="MoreList">
            <p className="bigtitle">{this.props.datalist.subject_collection.name}</p>
				<ul>
                    {output_LI}
                </ul>
			</div>
            <div className="page">
                <Pagination total={total} current={this.state.page} locale={locale} onChange={this.changePage.bind(this)}/>
            </div>
		</div>
    }

    changePage(page){
        this.setState({
            page:page
        })
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
			datalist:state.more,
		}
	},
	{
		getMorePromise:(type)=>{
			return axios.get("/rexxar/api/v2/subject_collection/"+type+"/items?os=android&for_mobile=1&start=0&count=100&loc_id=108288&_=0").then(res=>{
				return {
					type:"MORE",
					payload:res.data
				}
			})
		}
	}

)(MoreList);
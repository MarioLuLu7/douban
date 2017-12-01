import React from "react";
import "./index.scss";
import {connect} from "react-redux";
import {NavLink } from "react-router-dom";

var loadingsrc = require("@/assets/loading.gif");

class Book extends React.Component{
	constructor(){
		super();
		this.state={

		}
	}


	componentDidMount() {
		if(this.props.datalist.length==0){
			this.props.getBookPromise();
		}
	}

	render(){

		if(this.props.datalist.length<=0){
			return <div className="loading">
				<img src={loadingsrc}/>
			</div>
		}

		return <div id="book">
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
										<li key={ind} onClick={ite.id?this.toDetail.bind(this,ite.id):""}>
											<img src={ite.cover.url}/>
											<p className="p1">{ite.title}</p>
											{ite.rating?
												<p className="p2">评分：{ite.rating.value}</p>
											:
												<p className="p2">￥{ite.price?ite.price:""}</p>
											}
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
		this.props.history.push(`/bookdetail/${id}`);
	}
	more(type){
		this.props.history.push(`/more/${type}`);
	}
}


export default connect(
	(state)=>{
		return {
			datalist:state.book
		}
	},
	{
		getBookPromise:()=>{
			return Promise.all([
				axios.get("/rexxar/api/v2/subject_collection/book_fiction/items?os=ios&start=0&count=8&loc_id=0&_=0"),
				axios.get("/rexxar/api/v2/subject_collection/book_nonfiction/items?os=ios&start=0&count=8&loc_id=0&_=0"),
				axios.get("/rexxar/api/v2/subject_collection/market_product_book_mobile_web/items?os=ios&start=0&count=8&loc_id=0&_=0")
			]).then(res=>{
				return {
					type:"BOOK",
					payload:res
				}
			})
		}

	}

)(Book);
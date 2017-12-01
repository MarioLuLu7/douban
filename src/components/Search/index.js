import React from "react";
import "./index.scss";
import {connect} from "react-redux";
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

class Search extends React.Component{
	constructor(){
		super();
		this.state={
		}
	}

	componentDidMount() {
	}


	render(){
		var datalist = [];
		if(this.props.datalist.length>0){
			datalist= [...this.props.datalist[0].data,...this.props.datalist[1].data];
		}
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
					<img src={item.img?item.img:item.pic}/>
					<div>
						<span className="sertitle">{item.title}</span>
						<span className="type">类型：{type}</span>
						<span className="year">年份：{item.year}</span>
					</div>
				</li>
			)
		}
		return <div id="search">
            <SearchBar placeholder="Search" maxLength={40} 
            value={this.props.searchvalue}
			onChange={this.props.setvalue}
			onSubmit={this.props.getSearchPromise}
            />
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
            datalist:state.search,
            searchvalue:state.searchvalue
		}
	},
	{
		getSearchPromise:(q)=>{
			return Promise.all([
				axios.get("/movie/subject_suggest?q="+q),
				axios.get("/book/subject_suggest?q="+q)
			]).then(res=>{
				return {
					type:"SEARCH",
					payload:res
				}
			})
        },
        setvalue(value){
            return {
                type:"SET_SEARCH_VALUE",
                payload:value
            }
        }
	}

)(Search);
import React from "react"
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import App from "../components/App";
import Home from "../components/Home";
import Play from "../components/Play";
import Film from "../components/Film";
import Book from "../components/Book";
import Team from "../components/Team";
import Search from "../components/Search";
import Collect from "../components/Collect";
import More from "../components/MoreList";

import FilmDetail from "../components/Detail/FilmDetail";
import BookDetail from "../components/Detail/BookDetail";
import PlayDetail from "../components/Detail/PlayDetail";

import {Provider}  from "react-redux";
import store  from "../Redux/Store";

const router = (
	<Provider store={store}>
	<Router>		
		<App>
			 <Switch>
				<Route path="/home" component={Home}/>
				<Route path="/film" component={Film}/>
				<Route path="/play" component={Play}/>
				<Route path="/book" component={Book}/>
				<Route path="/team" component={Team}/>
				<Route path="/search" component={Search}/>
				<Route path="/collect" component={Collect}/>
				<Route path="/filmdetail/:id" component= {FilmDetail}/>
				<Route path="/bookdetail/:id" component= {BookDetail}/>
				<Route path="/playdetail/:id" component= {PlayDetail}/>
				<Route path="/more/:type" component= {More}/>
				<Redirect from="*" to="/home"/>
			</Switch>
		</App>
	</Router>
	</Provider>
)


export default router;

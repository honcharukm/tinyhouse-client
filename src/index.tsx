import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import './styles/index.css'
import { 
	Home, 
	Host, 
	Listing, 
	Listings, 
	NotFound, 
	User,
	Login 
} from './sections'
import { Layout } from 'antd'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Viewer } from './lib/types'

const client = new ApolloClient({
	uri: 'http://localhost:9000/',
	cache: new InMemoryCache()
})

const initialViewer: Viewer = {
	id: null,
	token: null,
	avatar: null,
	hasWallet: null,
	didRequest: false
}

const App: React.FC = () => {
	const [viewer, setViewer] = useState<Viewer>(initialViewer)

	return (
		<Router>
			<Layout id="app">
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/host' component={Host} />
					<Route exact path='/listing/:id' component={Listing} />
					<Route exact path='/listings/:location?' component={Listings} />
					<Route exact path='/login' render={props => <Login {...props} setViewer={setViewer} />} />
					<Route exact path='/user/:id' component={User} />
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</Router>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

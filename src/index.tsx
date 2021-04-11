import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { 
	ApolloClient,
	HttpLink,
	ApolloLink, 
	InMemoryCache,
	concat, 
	ApolloProvider,
	useMutation 
} from "@apollo/client"
import './styles/index.css'
import { 
	Home, 
	Host, 
	Listing, 
	Listings, 
	NotFound, 
	User,
	Login,
	AppHeader 
} from './sections'
import { Layout, Affix, Spin } from 'antd'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Viewer } from './lib/types'
import { LOG_IN } from './lib/graphql/mutation'
import { LogIn as LogInData, LogInVariables } from './lib/graphql/mutation/LogIn/__generated__/LogIn'
import { AppHeaderSkeleton, ErrorBanner } from './lib/components';

const httpLink = new HttpLink({
	uri: 'http://localhost:9000/',
	credentials: 'include'
})

const authMiddleware = new ApolloLink((operation, forward) => {
	const token = sessionStorage.getItem('token')
	
	operation.setContext({
		headers: {
			'X-CSRF-TOKEN': token || ''
		}
	})
	
	return forward(operation)
})

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: concat(authMiddleware, httpLink)
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
	const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
		onCompleted: data => {
			if (data && data.logIn) {
				setViewer(data.logIn)
			}

			if (data.logIn.token) {
				sessionStorage.setItem('token', data.logIn.token)
			} else {
				sessionStorage.removeItem('token')
			}
		}
	})

	const logInRef = useRef(logIn)

	useEffect(() => {
		logInRef.current()
	}, [])

	if (!viewer.didRequest && !error) {
		return (
			<Layout className="app-skeleton">
				<AppHeaderSkeleton />
				<div className="app-skeletonn_spin-section">
					<Spin size="large" tip="Launching Tinyhouse" />
				</div>
			</Layout>
		)
	}

	const logInErrorBannerElement = error ? (
		<ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!" />
	) : null

	return (
		<Router>
			<Layout id="app">
				{logInErrorBannerElement}
				<Affix offsetTop={0} className="app__affix-header">
					<AppHeader viewer={viewer} setViewer={setViewer} />
				</Affix>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/host' component={Host} />
					<Route exact path='/listing/:id' component={Listing} />
					<Route exact path='/listings/:location?' component={Listings} />
					<Route exact path='/login' render={props => <Login {...props} setViewer={setViewer} />} />
					<Route exact path='/user/:id' render={props => <User {...props} viewer={viewer} />} />
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

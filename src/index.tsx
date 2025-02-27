import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './App'
import store from './redux/store'

const rootElem = document.getElementById('root')

if (rootElem) {
	const root = ReactDOM.createRoot(rootElem)
	root.render(
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	)
}

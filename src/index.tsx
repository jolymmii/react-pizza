import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom' // Здесь мы используем HashRouter
import App from './App'
import store from './redux/store'

const rootElem = document.getElementById('root')

if (rootElem) {
	const root = ReactDOM.createRoot(rootElem)
	root.render(
		<Provider store={store}>
			<HashRouter basename='/react-pizza'>
				{' '}
				<App />
			</HashRouter>
		</Provider>
	)
}

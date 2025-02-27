import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import './scss/app.scss'
const Cart = React.lazy(
	() => import(/* webpackChunkName: "Cart" */ './pages/Cart')
)
const FullPizzas = React.lazy(
	() => import(/* webpackChunkName: "FullPizzas" */ './pages/FullPizzas')
)
const NotFound = React.lazy(
	() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
)

function App() {
	return (
		<BrowserRouter basename='/react-pizza'>
			{' '}
			{/* Здесь добавляем basename */}
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='' element={<Home />} />
					<Route path='*' element={<NotFound />} />
					<Route path='cart' element={<Cart />} />
					<Route path='pizza/:id' element={<FullPizzas />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App

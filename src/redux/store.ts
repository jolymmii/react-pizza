import { configureStore } from '@reduxjs/toolkit'
import cart from './slices/cartSlice'
import filter from './slices/filterSlice'
import pizza from './slices/pizzasSlice'
import { useDispatch } from 'react-redux'

const store = configureStore({
	reducer: {
		filter,
		cart,
		pizza,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store

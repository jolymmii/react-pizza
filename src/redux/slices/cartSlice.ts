import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PizzaBlockPorps } from '../../components/PizzaBlock/index'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import getCartItems from '../../utils/getCartItems'

interface CartState {
	totalPrice: number
	items: PizzaBlockPorps[]
}

const cartData = getCartItems()
const initialState: CartState = {
	totalPrice: cartData.totalPrice,
	items: cartData.items,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<PizzaBlockPorps>) {
			// Проверяем, есть ли уже такой же товар в корзине (учитываем id, type, size)
			const findItem = state.items.find(
				obj =>
					obj.id === action.payload.id &&
					obj.types[0] === action.payload.types[0] &&
					obj.sizes[0] === action.payload.sizes[0]
			)

			if (findItem) {
				findItem.count++
			} else {
				state.items.push({ ...action.payload, count: 1 })
			}

			state.totalPrice = calcTotalPrice(state.items)
		},
		minusItem(state, action: PayloadAction<string>) {
			// Для action.payload это строка (id)
			const findItem = state.items.find(obj => obj.id === action.payload)
			if (findItem) {
				findItem.count--
			}
		},
		removeItem(state, action: PayloadAction<string>) {
			// Для action.payload это строка (id)
			state.items = state.items.filter(obj => obj.id !== action.payload)
			state.totalPrice = calcTotalPrice(state.items)
		},
		clearItems(state) {
			state.items = []
			state.totalPrice = 0
		},
	},
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { PizzaBlockPorps } from '../../components/PizzaBlock'

type FetchPizzasArgs = Record<string, string>
export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async (params: FetchPizzasArgs) => {
		const { searchValue, order, category, sortBy, pageCount } = params
		const { data } = await axios.get<PizzaBlockPorps[]>(
			`https://67a61dba510789ef0dfa7197.mockapi.io/items?page=${pageCount}&limit=4${category}&sortBy=${sortBy}&order=${order}${searchValue}`
		)
		return data
	}
)
type Pizza = {
	id: string
	title: string
	price: number
	imageUrl: string
	sizes: number[]
	types: number[]
	count: number
}
enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}
interface PizzaState {
	items: Pizza[]
	status: Status
}
const initialState: PizzaState = {
	items: [],
	status: Status.LOADING, // loading | success | error
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzas.pending, state => {
				state.status = Status.LOADING
				state.items = []
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = Status.SUCCESS
			})
			.addCase(fetchPizzas.rejected, state => {
				state.status = Status.ERROR
				state.items = []
			})
	},
})

export default pizzaSlice.reducer

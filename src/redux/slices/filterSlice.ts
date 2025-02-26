import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type Sort = {
	name: string
	sort: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title'
}

interface sortState {
	pageCount: number
	search: string
	categoryId: number
	sort: Sort
}

const initialState: sortState = {
	pageCount: 1,
	search: '',
	categoryId: 0,
	sort: {
		name: 'популярности',
		sort: 'rating',
	},
}

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload
		},
		setPageCount(state, action: PayloadAction<number>) {
			state.pageCount = action.payload
		},
		setFilters(state, action: PayloadAction<sortState>) {
			state.pageCount = Number(action.payload.pageCount)
			state.sort = action.payload.sort
			state.categoryId = Number(action.payload.categoryId)
		},
	},
})

export const { setCategoryId, setSort, setPageCount, setFilters, setSearch } =
	filterSlice.actions

export default filterSlice.reducer

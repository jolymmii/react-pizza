import qs from 'qs'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort, { list } from '../components/Sort'
import {
	setCategoryId,
	setFilters,
	setPageCount,
} from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzasSlice'
import { useAppDispatch } from '../redux/store'

const Home: React.FC = () => {
	const categoryId = useSelector((state: any) => state.filter.categoryId)
	const sortType = useSelector((state: any) => state.filter.sort.sort)
	const search = useSelector((state: any) => state.filter.search)
	const pageCount = useSelector((state: any) => state.filter.pageCount)
	const { items, status } = useSelector((state: any) => state.pizza)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const isSearch = React.useRef(false)
	const isMounted = React.useRef(false)

	// Обработка параметров из URL
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			const sort = list.find(obj => obj.sort === params.sortType) || list[0]
			const categoryId = Number(params.categoryId) || 0
			const pageCount = Number(params.pageCount) || 1
			dispatch(
				setFilters({
					sort,
					categoryId,
					pageCount,
					search: search || '',
				})
			)
			isSearch.current = true
		}
	}, [dispatch])

	// Запрос данных с использованием createAsyncThunk
	React.useEffect(() => {
		const searchValue = search ? `&search=${search}` : ''
		const order = sortType.startsWith('-') ? 'desc' : 'asc'
		const category = categoryId > 0 ? `&category=${categoryId}` : ''
		const sortBy = sortType.replace('-', '')

		if (!isSearch.current) {
			dispatch(fetchPizzas({ searchValue, order, category, sortBy, pageCount }))
			window.scrollTo(0, 0)
		}
		isSearch.current = false
	}, [categoryId, sortType, search, pageCount, dispatch])

	// Обновление URL при изменении параметров
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortType: sortType,
				categoryId: categoryId,
				pageCount: pageCount,
			})
			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sortType, search, pageCount, navigate])
	const onChangeCategory = React.useCallback((id: number) => {
		dispatch(setCategoryId(id))
	}, [])
	const pizza = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
	const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
	return (
		<div className='container '>
			<div className='content__top'>
				<Categories value={categoryId} onClickCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{status === 'loading' ? skeleton : pizza}
				{status === 'error' && <div>Ошибка загрузки данных</div>}
			</div>
			<Pagination
				value={pageCount}
				onChangePage={(number: number) => dispatch(setPageCount(number))}
			/>
		</div>
	)
}
export default Home

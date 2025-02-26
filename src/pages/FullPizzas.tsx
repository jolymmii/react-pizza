import axios from 'axios'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const FullPizzas: React.FC = () => {
	const { id } = useParams()
	console.log(id)
	const [pizzas, setPizzas] = React.useState<{
		title: string
		imageUrl: string
		price: number
	}>()

	React.useEffect(() => {
		async function loadPizzas() {
			try {
				const { data } = await axios.get(
					`https://67a61dba510789ef0dfa7197.mockapi.io/items/${id}`
				)
				setPizzas(data)
			} catch (error) {
				console.log('Error!')
			}
		}
		loadPizzas()
	}, [id])

	if (!pizzas) {
		return <h2>Загрузка...</h2>
	}
	return (
		<div className='container'>
			<h2>{pizzas.title}</h2>
			<Link to={'/'}>
				<button className='button button--outline button--add'>
					<span>Назад</span>
				</button>
			</Link>
			<img src={pizzas.imageUrl} alt={pizzas.title} />
			<p> {pizzas.price} рублей</p>
		</div>
	)
}

export default FullPizzas

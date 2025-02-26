import { PizzaBlockPorps } from '../components/PizzaBlock'

export const calcTotalPrice = (items: PizzaBlockPorps[]) => {
	return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}

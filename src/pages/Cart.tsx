import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartEmpty from '../components/CartEmpty'
import CartItem from '../components/CartItem'
import { clearItems } from '../redux/slices/cartSlice'

const Cart: React.FC = () => {
	const { totalPrice, items } = useSelector((state: any) => state.cart)
	const dispatch = useDispatch()
	const totalCount = items.reduce(
		(sum: number, item: any) => sum + item.count,
		0
	)

	const onClickClear = () => {
		if (window.confirm('Очистить Корзину?')) {
			dispatch(clearItems())
		}
	}

	if (!totalPrice) {
		return <CartEmpty />
	}
	return (
		<div className='container container--cart'>
			<div className='cart'>
				<div className='cart__top'>
					<h2 className='content__title'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							height='512px'
							id='Layer_1'
							version='1.1'
							viewBox='0 0 512 512'
							width='512px'
						>
							<g id='PL_x5F_Cart_1_'>
								<path d='M441,416c0,13.8-11.2,25-25,25s-25-11.2-25-25s11.2-25,25-25S441,402.2,441,416z' />
								<path d='M153,416c0,13.8-11.2,25-25,25s-25-11.2-25-25s11.2-25,25-25S153,402.2,153,416z' />
								<path d='M127.9,96l-11.1-32H64v17h41.7l57.5,213.3c-32.4,11.3-59.9,37.9-65.3,73.1C96,379.1,96,384,96,384h352v-16.7H115.3   c4.7-31.6,38.8-58.1,74.1-62.5s243.3-34.2,243.3-34.2L448,96H127.9z M416,256l-235,33.3c-0.9,0.2-1.8,0.4-2.7,0.6l-44.7-177.3   h297.7L416,256z' />
							</g>
						</svg>
						Корзина
					</h2>
					<div onClick={onClickClear} className='cart__clear'>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
							<path d='M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z' />
						</svg>
						<span>Очистить корзину</span>
					</div>
				</div>
				<div className='content__items'>
					{items.length > 0 ? (
						items.map((item: any) => (
							<CartItem
								key={item.id}
								{...item}
								type={item.types[0]}
								size={item.sizes[0]}
							/>
						))
					) : (
						<p>Корзина пуста</p>
					)}
				</div>
				<div className='cart__bottom'>
					<div className='cart__bottom-details'>
						<span>
							Всего пицц: <b>{totalCount} шт.</b>
						</span>
						<span>
							Сумма заказа: <b>{totalPrice} ₽</b>
						</span>
					</div>
					<div className='cart__bottom-buttons'>
						<Link
							to='/'
							className='button button--outline button--add go-back-btn'
						>
							<span>Вернуться назад</span>
						</Link>
						<div className='button pay-btn'>
							<span>Оплатить сейчас</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Cart

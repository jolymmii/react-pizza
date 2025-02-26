import React from 'react'
type CategoriesProps = {
	value: number
	onClickCategory: (id: number) => void
}
const Categories: React.FC<CategoriesProps> = React.memo(
	({ value, onClickCategory }) => {
		const cats = [
			'Все',
			'Мясные',
			'Вегетарианская',
			'Гриль',
			'Острые',
			'Закрытые',
		]

		return (
			<div className='categories'>
				<ul>
					{cats.map((catsName, i) => (
						<li
							key={i}
							onClick={() => {
								onClickCategory(i)
							}}
							className={value === i ? 'active' : ''}
						>
							{catsName}
						</li>
					))}
				</ul>
			</div>
		)
	}
)
export default Categories

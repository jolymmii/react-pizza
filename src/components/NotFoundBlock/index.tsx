import React from 'react'
import styles from '../NotFoundBlock/NotFoundBlock.module.scss'
const NotFoundBlock: React.FC = () => {
	return (
		<div className={styles.root}>
			<span>😕</span>
			<br />
			<h1>Ничего не найдено :(</h1>
			<p className={styles.description}>
				Данный товар отсутствует в нашем интернет магазине
			</p>
		</div>
	)
}

export default NotFoundBlock

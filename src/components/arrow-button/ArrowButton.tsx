/* eslint-disable prettier/prettier */
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
type TAppowProps = {
	isOpen: boolean;
	toggleClick: OnClick;
}
export const ArrowButton = ({toggleClick, isOpen,}: TAppowProps) => {
	const mainClass = isOpen ? `${styles.container} ${styles.container_open}` : styles.container;
	const arrowClass = isOpen ? `${styles.arrow} ${styles.arrow_open}` : styles.arrow;
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={toggleClick}
			className={mainClass}>
			<img src={arrow} alt='иконка стрелочки' className={arrowClass} />
		</div>
	);
};

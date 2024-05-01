import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
type TAppowProps = {
	isFormOpen: boolean;
	toggleClick: OnClick;
};
export const ArrowButton = ({ toggleClick, isFormOpen }: TAppowProps) => {
	const mainClass = !isFormOpen
		? styles.container
		: clsx(styles.container, styles.container_open);
	const arrowClass = !isFormOpen
		? styles.arrow
		: clsx(styles.arrow, styles.arrow_open);
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

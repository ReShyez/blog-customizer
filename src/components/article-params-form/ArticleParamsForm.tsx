import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect,} from 'react';
import { ArticleStateType, OptionType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

export const ArticleParamsForm = () => {

	const [isOpen, setIsOpen] = useState(false);
	const [optionsState, setOptions] = useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLElement | null>(null);
	const openClass = !isOpen ? styles.container: `${styles.container} ${styles.container_open}`;

	function toggleStateOpen() {
		setIsOpen(!isOpen);
	};

	//Не работает метод установки состояний инпута
	// const onSelect = (evt: any)=> {
	// 	setOptions(...optionsState, evt)
	// }
	useEffect(()=>{
			if(isOpen === false) return;

			const onClose = (evt: MouseEvent) => {
				if (formRef.current && !formRef.current.contains(evt.target as Node)) {
							setIsOpen(false);
						}
				};
					window.addEventListener('mousedown', onClose);
					return () => window.removeEventListener('mousedown', onClose);

	},[isOpen, formRef]);
	
	return (
		<>
				<ArrowButton toggleClick={toggleStateOpen} isOpen={isOpen}/>
				<aside ref={formRef} className={openClass}>
					<form className={styles.form}>
					<h2 className={styles.header}>Задайте параметры</h2>

					{/* Выбор шрифта*/}
					<Select
						title='Шрифт'
						//выбранное на текущий момент (берем из состояния дефолтных настроек)
						selected={optionsState.fontFamilyOption}
						//массив с настройками
						options={fontFamilyOptions}
						//функция при которой будет записываться данные
						onChange={onSelect}
					/>
					<RadioGroup
							title='размер шрифта'

							name='fontSizeOptions'
										//выбранное на текущий момент (берем из состояния дефолтных настроек)
							selected={optionsState.fontSizeOption}
										//массив с настройками
							options={fontSizeOptions}
										//функция при которой будет записываться данные
							onChange={onSelect}
						/>
						<Select
						title='Цвет шрифта'
						//выбранное на текущий момент (берем из состояния дефолтных настроек)
						selected={optionsState.fontColor}
						//массив с настройками
						options={fontColors}
						//функция при которой будет записываться данные
						onChange={onSelect}
					/>
					<Separator/>
					<Select
						title='цвет фона'
						//выбранное на текущий момент (берем из состояния дефолтных настроек)
						selected={optionsState.backgroundColor}
						//массив с настройками
						options={backgroundColors}
						//функция при которой будет записываться данные
						onChange={onSelect}
					/>
					<Select
						title='ширина контента'
						//выбранное на текущий момент (берем из состояния дефолтных настроек)
						selected={optionsState.contentWidth}
						//массив с настройками
						options={contentWidthArr}
						//функция при которой будет записываться данные
						onChange={onSelect}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

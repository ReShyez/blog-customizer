import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect, FormEvent } from 'react';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import clsx from 'clsx';

interface IFormProps {
	onFormSubmit: (data: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onFormSubmit }: IFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [optionsState, setOptions] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLElement | null>(null);
	const openClass = !isFormOpen
		? styles.container
		: clsx(styles.container, styles.container_open);

	function toggleStateOpen() {
		setIsFormOpen(!isFormOpen);
	}

	const submitStyleForm = (evt: FormEvent) => {
		evt.preventDefault();
		onFormSubmit(optionsState);
	};
	const resetStyleForm = () => {
		setOptions(defaultArticleState);
		onFormSubmit(defaultArticleState);
	};

	useEffect(() => {
		if (isFormOpen === false) return;

		const onClose = (evt: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(evt.target as Node)) {
				setIsFormOpen(false);
			}
		};
		window.addEventListener('mousedown', onClose);
		return () => window.removeEventListener('mousedown', onClose);
	}, [isFormOpen, formRef]);

	return (
		<>
			<ArrowButton toggleClick={toggleStateOpen} isFormOpen={isFormOpen} />
			<aside ref={formRef} className={openClass}>
				<form className={styles.form} onSubmit={submitStyleForm}>
					<h2 className={styles.header}>Задайте параметры</h2>

					{/* Выбор шрифта*/}
					<Select
						title='Шрифт'
						//выбранное на текущий момент (берем из состояния дефолтных настроек)
						selected={optionsState.fontFamilyOption}
						//массив с настройками
						options={fontFamilyOptions}
						//функция при которой будут записываться данные
						onChange={(selectedOption: OptionType) => {
							setOptions({ ...optionsState, fontFamilyOption: selectedOption });
						}}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSizeOptions'
						//выбранное на текущий момент (берем из состояния дефолтных настроек)
						selected={optionsState.fontSizeOption}
						//массив с настройками
						options={fontSizeOptions}
						//функция при которой будет записываться данные
						onChange={(selectedOption: OptionType) => {
							setOptions({ ...optionsState, fontSizeOption: selectedOption });
						}}
					/>
					<Select
						title='Цвет шрифта'
						//выбранное на текущий момент (берем из состояния дефолтных настроек)
						selected={optionsState.fontColor}
						//массив с настройками
						options={fontColors}
						//функция при которой будут записываться данные
						onChange={(selectedOption: OptionType) => {
							setOptions({ ...optionsState, fontColor: selectedOption });
						}}
					/>
					<Separator />
					<Select
						title='цвет фона'
						//выбранное на текущий момент (берем из состояния дефолтных настроек)
						selected={optionsState.backgroundColor}
						//массив с настройками
						options={backgroundColors}
						//функция при которой будут записываться данные
						onChange={(selectedOption: OptionType) => {
							setOptions({ ...optionsState, backgroundColor: selectedOption });
						}}
					/>
					<Select
						title='ширина контента'
						//выбранное на текущий момент (берем из состояния дефолтных настроек)
						selected={optionsState.contentWidth}
						//массив с настройками
						options={contentWidthArr}
						//функция при которой будут записываться данные
						onChange={(selectedOption: OptionType) => {
							setOptions({ ...optionsState, contentWidth: selectedOption });
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetStyleForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

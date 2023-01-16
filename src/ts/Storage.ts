import INumberIndex from './types/INumberIndex';
// eslint-disable-next-line import/no-cycle
import Card from './Card';

export default class Storage {
	static storageKey = 'app';

	static load() {
		const storageString = window.localStorage.getItem(Storage.storageKey);
		if (storageString) {
			const storage: INumberIndex = JSON.parse(storageString);

			const cards = document.querySelectorAll('#cards');
			cards.forEach(function (card: Element, index) {
				Array.from(storage[index]).forEach(function (content) {
					Card.addCard(card as HTMLElement, content as string);
				});
			});
		}
	}

	static save() {
		const cards = document.querySelectorAll('#cards');
		// eslint-disable-next-line func-names
		const localStorage = Array.from(cards).reduce(
			// eslint-disable-next-line func-names
			function (storage: INumberIndex, card: Element, index: number) {
				const cardItems = card.querySelectorAll('.card-item');
				storage[index] = Array.from(cardItems).reduce(
					// eslint-disable-next-line func-names
					function (accumulator: Array<string>, currentValue: Element) {
						const contentCard = currentValue.querySelector('.content-card') as HTMLElement;
						accumulator.push(contentCard.innerText);
						return accumulator;
					},
					[]
				);
				return storage;
			},
			{} as INumberIndex
		);
		window.localStorage.setItem(Storage.storageKey, JSON.stringify(localStorage));
	}
}

// eslint-disable-next-line import/no-cycle
import Storage from './Storage';

export default class Card {
	static card(content: string) {
		const card = document.createElement('div');
		const cardHeader = document.createElement('div');
		const cardBody = document.createElement('div');
		const btnRemoveCard = document.createElement('button');
		const optionCard = document.createElement('button');
		const contentCard = document.createElement('p');

		card.classList.add(
			'card-item',
			'card',
			'position-relative',
			'text-break',
			'text-light'
		);
		cardHeader.classList.add(
			'card-header',
			'position-absolute',
			'baby-color',
			'd-flex',
			'justify-content-end'
		);
		cardBody.classList.add('card-body', 'mt-3');
		btnRemoveCard.classList.add('btn', 'svg-close-icon');
		optionCard.classList.add('btn', 'svg-option-icon');

		card.append(cardHeader, cardBody);
		cardHeader.append(optionCard, btnRemoveCard);
		cardBody.append(contentCard);

		contentCard.innerText = content;

		this.registerEventsCard(card);
		this.registerEventsBtnRemoveCard(card, btnRemoveCard);

		return card;
	}

	static registerEventsCard(card: HTMLElement) {
		let shiftX = 0;
		let shiftY = 0;

		const moveAt = (pageX: number, pageY: number) => {
			card.style.left = `${pageX - shiftX}px`;
			card.style.top = `${pageY - shiftY}px`;
		};

		const onMouseMove = (event: MouseEvent) => {
			const mouseUpItem = event.target as HTMLElement;
			const mouseUpCardItem = mouseUpItem.closest('.card-item');
			const currentCard = mouseUpItem.closest('.card.up');

			const oldPlug = document.getElementById('plug');

			const plug = document.createElement('div');
			plug.id = 'plug';
			plug.classList.add('card', 'grey-color-bg');
			plug.style.height = `${card.offsetHeight}px`;

			if (mouseUpCardItem) {
				oldPlug?.remove();
				if (card.offsetHeight / 2 > event.offsetY) {
					mouseUpCardItem.before(plug);
				} else {
					mouseUpCardItem.after(plug);
				}
			} else if (!currentCard?.querySelector('#plug')) {
				oldPlug?.remove();
				currentCard?.querySelector('#cards')?.append(plug);
			}

			moveAt(event.pageX, event.pageY);
		};

		const onMouseUp = () => {
			const oldPlug = document.getElementById('plug');
			oldPlug?.replaceWith(card);
			card.classList.remove('dragged', 'm-0');
			card.classList.add('position-relative');
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
			card.onmouseup = null;
			card.removeAttribute('style');
			Storage.save();
		};

		card.addEventListener('mousedown', (event) => {
			if (!(event.target as HTMLElement).classList.contains('btn')) {
				event.preventDefault();

				card.style.width = `${card.offsetWidth}px`;
				card.classList.add('dragged', 'm-0');
				card.classList.remove('position-relative');

				// TODO added plug to move card

				shiftX = event.clientX - card.getBoundingClientRect().left;
				shiftY = event.clientY - card.getBoundingClientRect().top;

				moveAt(event.pageX, event.pageY);

				document.addEventListener('mousemove', onMouseMove);
				document.addEventListener('mouseup', onMouseUp);
			}
		});
	}

	static registerEventsBtnRemoveCard(card: HTMLElement, btnRemoveCard: HTMLElement) {
		btnRemoveCard.addEventListener('click', () => {
			card.remove();
			Storage.save();
		});
	}
}

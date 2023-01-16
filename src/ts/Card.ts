// eslint-disable-next-line import/no-cycle
import Storage from './Storage';

export default class Card {
	static addCard(cards: HTMLElement, content: string) {
		const card = document.createElement('div');
		const contentCard = document.createElement('div');
		const btnCloseCard = document.createElement('div');

		card.classList.add('card-item', 'card', 'flex-row', 'justify-content-between');
		btnCloseCard.classList.add('btn', 'btn-close');
		contentCard.classList.add('content-card');
		contentCard.innerText = content;

		card.insertAdjacentElement(
			'beforeend',
			contentCard
		);
		card.insertAdjacentElement(
			'beforeend',
			btnCloseCard
		);

		cards.insertAdjacentElement(
			'beforeend',
			card
		);

		btnCloseCard.addEventListener('click', () => {
			card.remove();
			Storage.save();
		});

		const moveAt = (clientX: number, clientY: number) => {
			card.style.left = `${clientX - card.offsetWidth / 2}px`;
			card.style.top = `${clientY - card.offsetHeight / 2}px`;
		};

		const onMouseMove = (event: MouseEvent) => {
			const mouseUpItem = event.target as HTMLElement;
			const oldPlug = document.getElementById('plug');

			const currentCard = mouseUpItem.closest('.card.up');

			const plug = document.createElement('div');
			plug.id = 'plug';
			plug.classList.add('card');
			plug.style.height = `${card.offsetHeight}px`;
			if (currentCard) {
				if (mouseUpItem.classList.contains('card-item')) {
					oldPlug?.remove();
					if (card.offsetHeight / 2 > event.offsetY) {
						// top
						mouseUpItem.insertAdjacentElement(
							'beforebegin',
							plug
						);
					} else {
						// bottom
						mouseUpItem.insertAdjacentElement(
							'afterend',
							plug
						);
					}
				} else if (!currentCard.querySelector('#plug')) {
					oldPlug?.remove();
					mouseUpItem
						?.closest('.card-body')
						?.querySelector('#cards')
						?.insertAdjacentElement(
							'beforeend',
							plug
						);
				}
			} else {
				oldPlug?.remove();
			}
			moveAt(event.clientX, event.clientY);
		};

		const onMouseUp = () => {
			const oldPlug = document.getElementById('plug');
			oldPlug?.replaceWith(card);
			card.classList.remove('dragged', 'm-0');
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
			card.onmouseup = null;
			card.removeAttribute('style');
			Storage.save();
		};

		card.addEventListener('mousedown', (e) => {
			if (!(e.target as HTMLElement).classList.contains('btn-close')) {
				e.preventDefault();

				card.style.width = `${card.offsetWidth}px`;
				card.classList.add('dragged', 'm-0');

				moveAt(e.clientX, e.clientY);

				document.addEventListener('mousemove', onMouseMove);
				document.addEventListener('mouseup', onMouseUp);
			}
		});
	}
}

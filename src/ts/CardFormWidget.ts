export default class CardFormWidget {
	static get markup() {
		return `
		<div id="cardFormWidget">
			<textarea cols="30" rows="3" class="form-control mb-2"
					  id="input-field"
					  placeholder="Enter a title for this card..."></textarea>
			<div class="d-flex align-items-center">
				<button class="btn btn-success me-3"
						id="add-card-to-widget" type="button">
						Add card
				</button>
				<div id="button-close-cardFormWidget"
				 	 class="btn btn-close"></div>
			</div>
		</div>`;
	}

	static get selectorButtonAddCardToWidget() {
		return '#add-card-to-widget';
	}

	static get selectorCardFormWidget() {
		return '#cardFormWidget';
	}

	static get selectorButtonCloseCardFormWidget() {
		return '#button-close-cardFormWidget';
	}

	static get selectorInputField() {
		return '#input-field';
	}

	showCardFormWidget(
		listCardWidget: HTMLElement,
		cards: HTMLElement,
		buttonAddCard: HTMLButtonElement
	) {
		buttonAddCard.classList.add('d-none');

		listCardWidget.insertAdjacentHTML(
			'beforeend',
			CardFormWidget.markup
		);

		const buttonAddCardToWidget = listCardWidget.querySelector(
			CardFormWidget.selectorButtonAddCardToWidget
		);
		const buttonCloseCardToWidget = listCardWidget.querySelector(
			CardFormWidget.selectorButtonCloseCardFormWidget
		);
		const inputField = listCardWidget.querySelector(
			CardFormWidget.selectorInputField
		) as HTMLTextAreaElement;

		buttonAddCardToWidget?.addEventListener(
			'click',
			this.addCardEvent.call(null, cards, inputField)
		);

		buttonCloseCardToWidget
			?.addEventListener('click', () => {
				this.removeCardFormWidget(listCardWidget, buttonAddCard);
			});
	}

	// eslint-disable-next-line class-methods-use-this
	removeCardFormWidget(
		listCardWidget: HTMLElement,
		buttonAddCard: HTMLButtonElement
	) {
		buttonAddCard.classList.remove('d-none');

		const cardFormWidget = listCardWidget.querySelector(
			CardFormWidget.selectorCardFormWidget
		);

		cardFormWidget?.remove();
	}

	// eslint-disable-next-line class-methods-use-this
	addCardEvent(cards: HTMLElement, inputField: HTMLTextAreaElement) {
		return () => {
			if (inputField.value !== '') {
				const card = document.createElement('div');
				card.classList.add('card-item', 'card');
				card.innerText = inputField.value;
				inputField.value = '';

				cards.insertAdjacentElement(
					'beforeend',
					card
				);

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

				card.addEventListener('mousedown', (e) => {
					e.preventDefault();

					card.style.width = `${card.offsetWidth}px`;
					card.classList.add('dragged', 'm-0');

					moveAt(e.clientX, e.clientY);

					document.addEventListener('mousemove', onMouseMove);
				});

				document.addEventListener('mouseup', () => {
					const oldPlug = document.getElementById('plug');
					oldPlug?.replaceWith(card);
					card.classList.remove('dragged', 'm-0');
					document.removeEventListener('mousemove', onMouseMove);
					card.onmouseup = null;
					card.removeAttribute('style');
				});
			}
		};
	}
}

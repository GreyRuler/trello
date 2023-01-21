import Storage from './Storage';
import Card from './Card';

export default class CardFormWidget {
	static get markup() {
		return `
		<div id="cardFormWidget">
			<textarea cols="30" rows="3" class="form-control mb-2"
					  id="input-field"
					  placeholder="Введите текст для этой задачи..."></textarea>
			<div class="d-flex">
				<button class="btn btn-success me-3 col"
						id="add-card-to-widget" type="button">
						<div class="svg-icon svg-add-icon filter-white"></div>
				</button>
				<button id="button-close-cardFormWidget"
				 	 class="btn btn-danger col">
				 	 <div class="svg-icon svg-cancel-icon filter-white"></div>
				</button>
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

	static showCardFormWidget(
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

		inputField.focus();

		buttonAddCardToWidget?.addEventListener(
			'click',
			this.cardEvent.call(this, listCardWidget, buttonAddCard, cards, inputField)
		);

		buttonCloseCardToWidget
			?.addEventListener('click', (e) => {
				e.preventDefault();
				this.removeCardFormWidget(listCardWidget, buttonAddCard);
			});
	}

	static removeCardFormWidget(
		listCardWidget: HTMLElement,
		buttonAddCard: HTMLButtonElement
	) {
		buttonAddCard.classList.remove('d-none');

		const cardFormWidget = listCardWidget.querySelector(
			CardFormWidget.selectorCardFormWidget
		);

		cardFormWidget?.remove();
	}

	static cardEvent(
		listCardWidget: HTMLElement,
		buttonAddCard: HTMLButtonElement,
		cards: HTMLElement,
		inputField: HTMLTextAreaElement | null
	) {
		return () => {
			if (inputField?.value) {
				this.removeCardFormWidget(listCardWidget, buttonAddCard);
				cards.append(Card.card(inputField.value));
				Storage.save();
				inputField.value = '';
			}
		};
	}
}

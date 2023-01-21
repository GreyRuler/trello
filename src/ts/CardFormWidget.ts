import Storage from './Storage';
import Card from './Card';

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
						Добавить задачу
				</button>
				<div id="button-close-cardFormWidget"
				 	 class="btn btn-close justify-content-between"></div>
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

		buttonAddCardToWidget?.addEventListener(
			'click',
			this.cardEvent.call(this, listCardWidget, buttonAddCard, cards, inputField)
		);

		buttonCloseCardToWidget
			?.addEventListener('click', () => {
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
			if (inputField) {
				this.removeCardFormWidget(listCardWidget, buttonAddCard);
				cards.append(Card.card(inputField.value));
				Storage.save();
				inputField.value = '';
			}
		};
	}
}

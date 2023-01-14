import CardFormWidget from './CardFormWidget';

export default class ListCardWidget {
	private container: HTMLElement;

	private readonly widget: HTMLDivElement;

	private buttonAddCard: HTMLButtonElement | null = null;

	private cards: HTMLElement | null = null;

	private cardFormWidget: CardFormWidget | null = null;

	private listCardWidget: HTMLElement | null = null;

	private cardTitle: HTMLElement | null = null;

	constructor(container: HTMLElement) {
		this.container = container;

		this.widget = document.createElement('div');
		this.widget.classList.add('col');
		this.container.insertAdjacentElement(
			'beforeend',
			this.widget
		);
	}

	static get markup() {
		return `<div class="card up">
			<div class="card-body" id="list-card-widget">
				<h5 class="card-title" id="card-title"></h5>
				<div id="cards"></div>
				<button class="btn" id="add-card">
					 \u{002B} Add another card
				</button>
			</div>
		</div>`;
	}

	static get selectorButtonAddCard() {
		return '#add-card';
	}

	static get selectorCards() {
		return '#cards';
	}

	static get selectorListCardWidget() {
		return '#list-card-widget';
	}

	static get selectorTitleCard() {
		return '#card-title';
	}

	bindToDOM(title: string) {
		this.widget.innerHTML = ListCardWidget.markup;

		this.buttonAddCard = this.widget.querySelector(
			ListCardWidget.selectorButtonAddCard
		);
		this.cards = this.widget.querySelector(
			ListCardWidget.selectorCards
		);
		this.listCardWidget = this.widget.querySelector(
			ListCardWidget.selectorListCardWidget
		);
		this.cardFormWidget = new CardFormWidget();

		this.buttonAddCard?.addEventListener('click', () => {
			if (this.listCardWidget && this.buttonAddCard && this.cards) {
				this.cardFormWidget?.showCardFormWidget(
					this.listCardWidget,
					this.cards,
					this.buttonAddCard
				);
			}
		});

		this.cardTitle = this.widget.querySelector(
			ListCardWidget.selectorTitleCard
		);

		this.cardTitle!.textContent = title;
	}
}

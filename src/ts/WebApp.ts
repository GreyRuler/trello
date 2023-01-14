import ListCardWidget from './ListCardWidget';

export default class WebApp {
	private container: HTMLElement;

	constructor(element: HTMLElement) {
		this.container = element;
	}

	init() {
		for (let i = 0; i < 3; i++) {
			this.container.insertAdjacentHTML(
				'afterbegin',
				ListCardWidget.markup
			);
		}
	}
}

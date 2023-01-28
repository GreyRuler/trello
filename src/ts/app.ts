import ListCardWidget from './ListCardWidget';
import Storage from './Storage';

const webApp = document.querySelector('#app') as HTMLElement;

const webApp1 = new ListCardWidget(webApp);
const webApp2 = new ListCardWidget(webApp);
const webApp3 = new ListCardWidget(webApp);

webApp1.bindToDOM('Выданная задача');
webApp2.bindToDOM('В процессе');
webApp3.bindToDOM('Выполнено');

Storage.load();

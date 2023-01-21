import ListCardWidget from './ListCardWidget';
import Storage from './Storage';

const app = document.querySelector('#app') as HTMLElement;

const webApp1 = new ListCardWidget(app);
const webApp2 = new ListCardWidget(app);
const webApp3 = new ListCardWidget(app);

webApp1.bindToDOM('Выданная задача');
webApp2.bindToDOM('В процессе');
webApp3.bindToDOM('Выполнено');

Storage.load();

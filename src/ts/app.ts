import ListCardWidget from './ListCardWidget';

const app = document.querySelector('#app') as HTMLElement;

const webApp1 = new ListCardWidget(app);
const webApp2 = new ListCardWidget(app);
const webApp3 = new ListCardWidget(app);

webApp1.bindToDOM('TODO');
webApp2.bindToDOM('IN PROGRESS');
webApp3.bindToDOM('DONE');

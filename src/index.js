// Импорт шаблона
import menuItemTpl from './templates/menu-item.hbs';

// Импорт массива даных
import menu from './menu.json';

import './styles.css';

const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};

const refs = {
    menuList: document.querySelector('.js-menu'),
    switcher: document.querySelector('#theme-switch-toggle'),
    body: document.querySelector('body'),
}

refs.menuList.insertAdjacentHTML('afterbegin', menuItemTpl(menu));

// Изменение темы:

onPageLoading();

refs.switcher.addEventListener('change', onSwitchChange)

function onSwitchChange() {
    refs.body.classList.toggle(Theme.DARK, !refs.body.classList.toggle(Theme.LIGHT));

    onStorageSave('Theme', refs.body.classList[0]);
}

function onStorageSave(key, value) {
    try {
      const state = JSON.stringify(value);
      localStorage.setItem(key, state);
    }
    catch (err) {
      console.error('Set state error: ', err);
    }
  };

function onStorageLoad(key) {
    try {
      const state = localStorage.getItem(key);

        return state === null ? undefined : JSON.parse(state);

    }
    catch (err) {
      console.error('Get state error: ', err);
    }
  };

function onPageLoading() {
  const themeChosen = onStorageLoad('Theme');

  refs.switcher.checked = themeChosen == 'dark-theme' ? true : false;
  refs.body.classList.add(themeChosen ? themeChosen : Theme.LIGHT);
}

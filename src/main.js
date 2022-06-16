'use strict';

const listItem = document.querySelector('.item-list');

const category = document.querySelector('.category');
const tshirtsBtn = document.querySelector('.tshirt-btn');
const pantsBtn = document.querySelector('.pants-btn');
const skirtBtn = document.querySelector('skirt-btn');
const blueBtn = document.querySelector('.blue-btn');
const pinkBtn = document.querySelector('.pink-btn');
const yellowBtn = document.querySelector('.yellow-btn');

const items = [];

loadItems();

function loadItems() {
    fetch('/data/data.json')
        .then(response => response.json())
        .then(data => {
            const itemList = data.items;
            itemList.forEach(item => items.push(item));
            console.log(items.length);
            items.forEach(item => createItem(item));
        })
        .catch(error => console.log(error.message));
}

function createItem(item) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    setAttributes(img, { src: item.image, alt: `${item.color} ${item.type}` });
    const span = document.createElement('span');
    span.textContent = `${item.gender}, ${item.size} size`;
    li.setAttribute('class', 'list-item');
    li.append(img, span);
    listItem.append(li);
}

function setAttributes(element, attrs) {
    for (let key in attrs) {
        element.setAttribute(key, attrs[key]);
    }
}

category.addEventListener('click', (e) => {
    const target = e.target;
    let type;
    let detail;
    if (hasClass(target, 'img-btn')) {
        type = 'type';
        detail = getDetail(target, 'type');
    } else if (hasClass(target, 'color-btn')) {
        type = 'color';
        detail = getDetail(target, 'color');
    }
    filterItem(type, detail);
});

function hasClass(element, className) {
    return element.classList.contains(className);
}

function getDetail(element, type) {
    let values;
    if (type === 'color') {
        values = ['blue', 'pink', 'yellow'];
    } else if (type === 'type') {
        values = ['pants', 'tshirt', 'skirt'];
    }
    return values.filter(value => hasClass(element, value)).toString();
}

function filterItem(type, detail) {
    listItem.innerHTML = '';
    const arr = items.filter(item => item[type] === detail);
    arr.forEach(item => createItem(item));
}

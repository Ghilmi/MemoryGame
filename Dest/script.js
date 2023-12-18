"use strict";
var _a;
(_a = document.getElementById('_start')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    var _a, _b, _c, _d, _e;
    (_a = document.getElementById('audioStart')) === null || _a === void 0 ? void 0 : _a.play();
    let userName = (_b = document.getElementById("_name")) === null || _b === void 0 ? void 0 : _b.value;
    userName = userName === '' ? `user` : userName;
    (_c = document.getElementById('_startGame')) === null || _c === void 0 ? void 0 : _c.style.opacity = "0";
    (_d = document.getElementById('_startGame')) === null || _d === void 0 ? void 0 : _d.style.zIndex = "-111";
    (_e = document.getElementById('_nameU')) === null || _e === void 0 ? void 0 : _e.innerHTML = userName;
});
let duration = 1000;
let container = document.getElementById('container');
let blocks = Array.from(container === null || container === void 0 ? void 0 : container.children);
let orderRange = [...Array(blocks.length).keys()];
let curentBlockActive = 0;
let tries = 0;
let getShaflrArray = (arr) => {
    let curent = arr.length - 1, temp, random;
    while (curent >= 0) {
        random = Math.floor(Math.random() * curent);
        temp = arr[curent];
        arr[curent] = arr[random];
        arr[random] = temp;
        curent--;
    }
    return arr;
};
let shafleArray = getShaflrArray(orderRange);
blocks.forEach((block, index) => {
    block.style.order = shafleArray[index];
    block.addEventListener('click', () => { flipBlock(block); });
});
let flipBlock = (block) => {
    block.classList.add('active');
    let flepedBlock = blocks.filter(block => block.classList.contains('active'));
    if (flepedBlock.length === 2) {
        stopFliping();
        setTimeout(() => {
            checkMatchedBlocks(flepedBlock[0], flepedBlock[1]);
            container.classList.remove('noClicking');
        }, duration);
    }
};
function stopFliping() {
    container.classList.add('noClicking');
}
function checkMatchedBlocks(firstBlock, secondBlock) {
    var _a, _b, _c;
    if (firstBlock.getAttribute('data-img') === secondBlock.getAttribute('data-img')) {
        firstBlock.classList.remove('active');
        secondBlock.classList.remove('active');
        firstBlock.classList.add('hasMatsh');
        secondBlock.classList.add('hasMatsh');
        (_a = document.getElementById('success')) === null || _a === void 0 ? void 0 : _a.play();
        checkIfWin();
        return true;
    }
    else {
        firstBlock.classList.remove('active');
        secondBlock.classList.remove('active');
        tries++;
        (_b = document.getElementById('_wT')) === null || _b === void 0 ? void 0 : _b.innerHTML = tries;
        (_c = document.getElementById('fail')) === null || _c === void 0 ? void 0 : _c.play();
        return false;
    }
}
function checkIfWin() {
    var _a;
    let successBlock = 0;
    blocks.forEach((block) => {
        if (block.classList.contains('hasMatsh')) {
            successBlock++;
        }
    });
    if (+successBlock === +blocks.length) {
        console.log('success');
        (_a = document.getElementById('win')) === null || _a === void 0 ? void 0 : _a.play();
    }
    else {
        console.log('you not');
    }
}

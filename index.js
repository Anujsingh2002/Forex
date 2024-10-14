BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/'

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector('form button');
// console.log(btn);
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".message");
const mode = document.querySelector(".mode");
const body = document.querySelector('body');
// console.log(body);

mode.addEventListener('click', (event) => {
    if (mode.classList[1] === 'light') {
        mode.classList.remove('light');
        mode.classList.add('dark');
        mode.innerText = 'light';
        body.style.backgroundColor = 'black';
    }
    else if (mode.classList[1] === 'dark') {
        mode.classList.remove('dark');
        mode.classList.add('light');
        mode.innerHTML = 'Dark';
        body.style.backgroundColor = 'rgb(221, 252, 241)';
    }
})
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === 'from' && currCode === 'USD') {
            newOption.selected = 'selected';
        }

        if (select.name === 'to' && currCode === 'INR') {
            newOption.selected = 'selected';
        }

        select.append(newOption);
    }

    select.addEventListener('change', (evt) => {
        updateFlag(evt.target);
    });
}


let updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64`
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}


btn.addEventListener('click', async (evnt) => {
    evnt.preventDefault();
    let amount = document.querySelector('.amount input');
    // console.log(amount);
    let amountValue = amount.value;

    if (amountValue === "" || amountValue < 0) {
        amountValue = 1;
        amount.value = 1;
    }

    const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`
    // console.log(URL);
    let response = await fetch(URL);
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    // console.log(rate);
    let finalAmount = amountValue * rate;
    msg.innerHTML = `<b>${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}</b>`
    // console.log(data.date);
    // let fromValue = fromCurr.value.toLowerCase();
    // console.log(fromValue);
    // console.log(data[fromValue]['inr']);


})
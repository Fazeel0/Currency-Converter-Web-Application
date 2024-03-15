const BASE_URL =   'https://currency-converter5.p.rapidapi.com/currency/convert'

const opt = document.querySelectorAll('.dropdown select');

const btn = document.querySelector('form button');

const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');
const swap = document.querySelector('i');


const msgAdd = ()=>{
    msg.classList.add('showMsg');
}
const msgRemove = ()=>{
    msg.classList.remove('showMsg');
}

for(let select of opt){
    for (let code in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === 'from' && code === 'USD') {
            newOption.selected = 'selected';
        }else if (select.name === 'to' && code === 'INR') {
            newOption.selected = 'selected';
        }
        select.append(newOption);

        
    }
    select.addEventListener('change' , (e)=>{
        updateFlag(e.target);
        msgRemove();
    })
}


const updateFlag = (e)=>{
    let curCode = e.value;
    let curyCode = countryList[curCode];
    let new_src = `https://flagsapi.com/${curyCode}/flat/64.png`;
    let updateImg = e.parentElement.querySelector('img');
    updateImg.src = new_src;
} 


const updateRes = async ()=>{
    let amount = document.querySelector('.amount input');
    let res = amount.value;
    if(res === "" || res < 1){
        res = 1;
        amount.value = '1';
    }
    let url =  `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()]*res;

    msgAdd();

    msg.innerText = `${res} ${fromCurr.value} = ${rate} ${toCurr.value}`;
}

window.addEventListener('load',()=>{
    msgAdd();
    updateRes();
})
btn.addEventListener('click', (event)=>{
    event.preventDefault();
    updateRes();
})

const fromImgChange = (v)=>{
    let curyCode = countryList[v];
    let fromImgS = document.getElementById('fromImg');
    let new_src = `https://flagsapi.com/${curyCode}/flat/64.png`;
    fromImgS.src = new_src;
}
const toImgChange = (v)=>{
    let curyCode = countryList[v];
    let fromImgS = document.getElementById('toImg');
    let new_src = `https://flagsapi.com/${curyCode}/flat/64.png`;
    fromImgS.src = new_src;
}

swap.addEventListener('click',(event)=>{
    let temp=fromCurr.value;
    fromCurr.value=toCurr.value;
    toCurr.value=temp;
    fromImgChange(fromCurr.value);
    toImgChange(toCurr.value);
    // console.log(msg.classList);
    if(msg.classList.contains('showMsg')){
        updateRes();
    }
})


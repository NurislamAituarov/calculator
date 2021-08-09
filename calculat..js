'use strict'
const result = document.querySelector('.num');
let sex, height, weight, age, ratio;

if(localStorage.getItem('sex')){
    sex = localStorage.getItem('sex');
}else{
    sex = 'male';
    localStorage.setItem('sex', 'male')
}

if(localStorage.getItem('ratio')){
    ratio = localStorage.getItem('ratio');
}else{
    ratio = 1.725;
    localStorage.setItem('ratio', 1.725)
}

function initLocalSetting(selector, activClass){
    const elements = document.querySelectorAll(selector);

    elements.forEach((item)=>{
        item.classList.remove(activClass);
        if(item.getAttribute('id') === localStorage.getItem('sex')){
            item.classList.add(activClass)
        }
        if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')){
            item.classList.add(activClass)
        }
    });
}
initLocalSetting('button', 'clasActiv');

function calcTotal() {
    if(!sex || !height|| !weight|| !age|| !ratio){
        result.textContent = '____';
        return;
    }    

    if(sex ==='female'){
        result.textContent = ((447.6+(9.2 * weight) + (3.1 * height) - (4.3 * age))*ratio).toFixed(0)
    }else{
        result.textContent = ((88.36+(13.4 * weight) + (4.8 * height) - (5.7 * age))*ratio).toFixed(0)
    }
}
calcTotal();

function getStaticInformation(parentSelector, activClass){
    const elements = document.querySelectorAll(`${parentSelector} button`);

    elements.forEach((item) =>{
        item.addEventListener('click',(e)=>{
            if(e.target.getAttribute('data-ratio')){
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
            }else{
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id') )
            }
            console.log(ratio,sex);
    
            elements.forEach((item)=>{
                item.classList.remove(activClass)
            })
            e.target.classList.add(activClass)
            calcTotal();
        });
    })
}

getStaticInformation('.wrapper__one', 'clasActiv');
getStaticInformation('.three', 'clasActiv');

function getDynamicInformation(selector){
    const input = document.querySelector(selector);
    input.addEventListener('input',() => {

        if(input.value.match(/\D/g)){
            input.style.border = '1px solid red'
        }else{
            input.style.border = ''
        }

        switch(input.getAttribute('id')){
            case 'height':
                height = +input.value;
                break;
            case 'weight':
                weight = +input.value;
                break;
            case 'age':
                age = +input.value;
                break;
        }
        calcTotal();
    })
}
getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');

const delt = document.createElement('button');
delt.textContent = 'clearLocal';
delt.style.cssText = 'transition: 1s; width: 100px; height: 25px; background-color: white; cursor: pointer; position: absolute;right: 250px;bottom: 70px;'
document.querySelector('section').append(delt);
delt.addEventListener('click',() => {
    localStorage.clear();
    delt.style.cssText = 'transition: 1s; width: 100px; height: 25px; background-color: white; cursor: pointer; position: absolute;right: 250px;bottom: 70px; background-color: black;transform: scale(1.2);color: red;'
    setTimeout(()=>{
        location.reload()
    },700)
})
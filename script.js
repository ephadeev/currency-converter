"use strict";
var input = document.getElementById(`input`);
var button = document.getElementById(`button`);
var answer = document.getElementById(`answer`);
var select = document.getElementById(`select`);
var options = document.getElementsByClassName(`option`);

button.addEventListener(`click`, function () {
    for(let i = 0; i < options.length; i++) {
        if (options[i].dataset.curId === `145` && select.value === `USD`) {
            getCurRate(145);
        } else if (options[i].dataset.curId === `292` && select.value === `EUR`) {
            getCurRate(292);
        } else if (options[i].dataset.curId === `298` && select.value === `RUB`) {
            getCurRate(298, 100);
        }
    }
});

function getCurRate(id, rus = 1) {
    fetch(`http://www.nbrb.by/API/ExRates/Rates/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            if (input.value === ``) {
                alert(`Введите желаемую сумму в белорусских рублях`);
            } else {
                let date = new Date(result.Date);
                answer.innerText = `Вы можете купить ${(input.value * result.Cur_OfficialRate / rus).toFixed(2)} ${result.Cur_Name} за ${input.value} BYN -- ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}.`;
            }
        })
}
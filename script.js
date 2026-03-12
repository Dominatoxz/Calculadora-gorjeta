// Seleção de elementos baseada no seu HTML
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('number-of-people');
const tipButtons = document.querySelectorAll('.btn-tip');
const customTip = document.getElementById('custom');
const tipResult = document.getElementById('amount-tip');
const totalResult = document.getElementById('amount-total');
const resetBtn = document.querySelector('.btn-reset');
const errorMsg = document.getElementById('error-msg');
const errorMsgLessZero = document.getElementById('error-msg-less-zero');

let billValue = 0;
let tipValue = 0; 
let peopleValue = 0;

// Função que faz o cálculo
function calculate() {
    if (peopleValue >= 1) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue / peopleValue) + tipAmount;

        tipResult.textContent = `$${tipAmount.toFixed(2)}`;
        totalResult.textContent = `$${total.toFixed(2)}`;
        let formattedTip = tipAmount.toFixed(2);
        if (formattedTip.length > 8) {
            tipResult.style.fontSize = "20px"; // Diminui a fonte se o número for muito longo
        }
        tipResult.textContent = `$${formattedTip}`;
    }
    
}

// Evento para o valor da conta
billInput.addEventListener('input', () => {
    billValue = parseFloat(billInput.value) || 0;
    calculate();
});

// Evento para os botões de porcentagem
tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Pega o número dentro do botão (ex: "5%") e converte em decimal (0.05)
        tipValue = parseFloat(btn.innerHTML) / 100;
        customTip.value = ""; // Limpa o custom se clicar num fixo
        calculate();
    });
});

// Evento para a porcentagem customizada
customTip.addEventListener('input', () => {
    tipValue = parseFloat(customTip.value) / 100 || 0;
    calculate();
});

// Evento para número de pessoas + Validação de erro
peopleInput.addEventListener('input', () => {
    peopleValue = parseFloat(peopleInput.value);
    
    switch (true){
        case peopleValue < 0:
            errorMsg.style.display = "none";
            errorMsgLessZero.style.display = "block"; 
            peopleInput.style.outline = "2px solid #E17052"; // Borda vermelha/laranja
        
            tipResult.textContent = "$0.00";
            totalResult.textContent = "$0.00";
            break
        
        case peopleValue === 0 || isNaN(peopleValue): 
            errorMsgLessZero.style.display = "none"
            errorMsg.style.display = "block"; 
            peopleInput.style.outline = "2px solid #E17052"; // Borda vermelha/laranja
        
            tipResult.textContent = "$0.00";
            totalResult.textContent = "$0.00";
            break
        
        default:
            errorMsgLessZero.style.display = "none"
            errorMsg.style.display = "none";
            peopleInput.style.outline = "none";
            calculate();

    }

});

// Botão Reset
resetBtn.addEventListener('click', () => {
    billInput.value = "";
    peopleInput.value = "";
    customTip.value = "";
    tipResult.textContent = "$0.00";
    totalResult.textContent = "$0.00";
    errorMsg.style.display = "none";
    peopleInput.style.border = "none";
    billValue = 0;
    tipValue = 0;
    peopleValue = 0;
});

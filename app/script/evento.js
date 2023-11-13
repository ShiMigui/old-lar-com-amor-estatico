const inpHrInicio = document.getElementById('inpHrInicio');
const inpDtInicio = document.getElementById('inpDtInicio');
const inpHrFinal = document.getElementById('inpHrFinal');
const inpDtFinal = document.getElementById('inpDtFinal');

if (inpHrInicio && inpDtInicio && inpHrFinal && inpDtFinal) {
    inpHrInicio.value = calcHour();
    inpDtInicio.value = calcDate();
    inpHrFinal.value = calcHour();
    inpDtFinal.value = calcDate(0, 1, 0);
}
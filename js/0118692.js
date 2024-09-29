const form = document.querySelector('form');
const cor = document.getElementById('cor');
const tamanho = document.getElementById('tamanho');
const fullname = document.getElementById('name');
const sexo = document.getElementById('email');
const morada = document.getElementById('morada');
const postal = document.getElementById('postal');
const localidade = document.getElementById('localidade');
const pais = document.getElementById('pais');
const nif = document.getElementById('nif');
const allFormField = document.querySelectorAll('.form-control');

// REGEX
const nameReg = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
const postalRegex = /^\d{4}-\d{3}?$/;
const tlmRegex = /^[1-9][0-9]{0,3}$/;

// FUNCTIONS
fullname.addEventListener('input', () => checkInput(fullname,nameReg));
email.addEventListener('input', () => checkInput(email,emailRegex));
postal.addEventListener('input', () => checkInput(postal,postalRegex));

function checkInput(input, regex){
    const inputValue = input.value;
    if(!regex.test(inputValue)){
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    };
    if(inputValue === '') input.classList.remove('is-invalid');
};

// Alert
function showAlert(type, message){
    const alert = document.getElementById('alerta');
    alert.classList.add('alert', type, 'alert-dismissible', 'fade', 'show', 'text-center');
    alert.setAttribute('role', 'alert');
    alert.innerHTML = message;
}

// Submit
form.addEventListener('submit', e => {
    e.preventDefault();
    if(fullname.classList.contains('is-valid') &&
        (morada.value !== '') &&
        email.classList.contains('is-valid') &&
        postal.classList.contains('is-valid') &&
        (localidade.value !== '') &&
        (pais.value !== '') &&
        (nif.value !== '')){
            sendEmail();
            showAlert('alert-success', 'Encomenda efetuado com sucesso! Obrigado pelo teu contributo! Verifica o teu email, se não encontrares o nosso email verifica o spam.');
            form.reset();
            allFormField.forEach(input => input.classList.remove('is-valid'))
        } else{
            showAlert('alert-danger', 'Por favor preenche todos os campos corretamente!');
        }
});

// Emailjs
function sendEmail(){
    let templateParams = {
        from_ref: '0118692',
        from_cor: cor.value,
        from_tamanho: tamanho.value,
        from_nome: fullname.value,
        from_morada: morada.value,
        from_postal: postal.value,
        from_localidade: localidade.value,
        from_pais: pais.value,
        from_email: email.value,
        from_valor: '€ 26.50',
        from_nif: nif.value,
      };
      
      emailjs.send('service_b0fgv3e', 'template_encomenda', templateParams).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
}
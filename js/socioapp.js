const containerPage = document.getElementById('socio');
const form = document.querySelector('form');
const fullname = document.getElementById('name');
const sexo = document.getElementById('sexo');
const morada = document.getElementById('morada');
const postal = document.getElementById('postal');
const localidade = document.getElementById('localidade');
const pais = document.getElementById('pais');
const email = document.getElementById('email');
const tlm = document.getElementById('tlm');
const nif = document.getElementById('nif');
const data = document.getElementById('data');
const allFormField = document.querySelectorAll('.form-control');

// REGEX
const nameReg = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
const postalRegex = /^\d{4}-\d{3}?$/;
const tlmRegex = /^9[1236]{1}[0-9]{7}$/;

// FUNCTIONS
fullname.addEventListener('input', () => checkInput(fullname,nameReg));
email.addEventListener('input', () => checkInput(email,emailRegex));
postal.addEventListener('input', () => checkInput(postal,postalRegex));
tlm.addEventListener('input', () => checkInput(tlm,tlmRegex));


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
    const alert = document.createElement('div');
    alert.classList.add('alert', type, 'alert-dismissible', 'fade', 'show', 'text-center');
    alert.setAttribute('role', 'alert');
    alert.innerHTML = message;
    containerPage.insertBefore(alert, form);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 1000);
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
        tlm.classList.contains('is-valid') &&
        (nif.value !== '')){
            sendEmail();
            showAlert('alert-success', 'Formulários enviado!');
            form.reset();
            allFormField.forEach(input => input.classList.remove('is-valid'))
        } else{
            showAlert('alert-danger', 'Por favor preenche todos os campos corretamente!');
        }
});

// Emailjs
function sendEmail(){
    let templateParams = {
        from_nome: fullname.value,
        from_sexo: sexo.value,
        from_morada: morada.value,
        from_postal: postal.value,
        from_localidade: localidade.value,
        from_pais: pais.value,
        from_email: email.value,
        from_tlm: tlm.value,
        from_nif: nif.value,
        from_data: data.value,
      };
      
      emailjs.send('service_1kk6zrf', 'template_socio', templateParams).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
}
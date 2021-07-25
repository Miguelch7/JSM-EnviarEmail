// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// Esto es una expresion regular para validar un email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();
function eventListeners() {
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Resetea el formulario
    btnReset.addEventListener('click', resetearFormulario);
    
    // Enviar email
    formulario.addEventListener('submit', enviarEmail);

}


// Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario
function validarFormulario(e) {

    if(e.target.value.length > 0) {

        // Elimina los errores
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }

        //Elimina el borde rojo y añade borde verde
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');  
        e.target.classList.add('border', 'border-red-500');


        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        // Implementando la expresion regular
        if(er.test(e.target.value)) {
            // Elimina los errores
            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }
    
            //Elimina el borde rojo y añade borde verde
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');  
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');        
        }
    }


    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'backgorund-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    }

}

function enviarEmail(e) {
    e.preventDefault();

    // Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Despues de 3seg ocultar el spinner y mostrar el mensaje
    setTimeout( () => {
        spinner.style.display = 'none';

        // Mensaje
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El email se envió correctamente.';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

        // Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        // Eliminamos el mensaje despues de 3 seg
        setTimeout(() => {
            parrafo.remove();

            resetearFormulario();
        }, 5000)
    }, 3000 );
    
}

function resetearFormulario() {
    formulario.reset();

    iniciarApp();
}
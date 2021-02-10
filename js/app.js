//Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail');

//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners(){
    //Cuando la app inicia
    document.addEventListener('DOMContentLoaded', iniciarApp)

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}


//Funciones
function iniciarApp(){

    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');

}

//Validar el formulario
function validarFormulario(e){


    if(e.target.value.length > 0){

        //Elimina los errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');

    }

    if(e.target.type === 'email'){


        if( er.test  (e.target.value) ){

            //Elimina los errores
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

        }else{

            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');

        }
    }

    //No es una precisa forma de validar
    // if(email.value!=='' && asunto.value!=='' && mensaje.value!==''){

    //Mi forma de validar
    // if( email.classList.contains('border-green-500') &&
    //     asunto.classList.contains('border-green-500') &&
    //     mensaje.classList.contains('border-green-500')){

    //La forma de validar del profesor
    if( er.test(email.value) &&  asunto.value!=='' && mensaje.value!=='' ){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center', 'error');

    const errores= document.querySelectorAll('.error');

    if(errores.length === 0){
        // Mostrar abajo del formulario
        formulario.appendChild(mensajeError);

        // Mostrar encima del formulario
        // formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
        
    }

}

//Enviar el email
function enviarEmail(e){
    e.preventDefault();

    //Mostrar el spimner
    const spinner = document.querySelector('#spinner');
    spinner.style.display='flex';
    
    //Después de 3 segundos, ocultar el spinner y mostrar el mensaje

    //Se ejecuta solo 1 vez después de X segundos
    setTimeout(() => {
        spinner.style.display = 'none';

        //Mensaje que indica que se envió correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center','my-10', 'p-2','bg-green-500','text-white','font-bold','uppercase');

        //Se inserta el párrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); //Eliminar el mensaje

            resetearFormulario();

        }, 2000);

    }, 2000);

    //Se ejecuta cada X segundos
    // setInterval(() => {
    //     console.log( 'Esta función se ejecuta después de 2 segundos' );
    // }, 2000);

}

function resetearFormulario(){
    formulario.reset();

    iniciarApp();
}
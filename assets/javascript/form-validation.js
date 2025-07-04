document.addEventListener("DOMContentLoaded", function() {
    console.log("form-validation.js cargado correctamente");
    
    const form = document.getElementById("formularioContacto");
    const mensajeError = document.getElementById("mensajeError");
    const mensajeEnviado = document.getElementById("mensajeEnviado");

    // Función para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    // Función para validar teléfono (solo números)
    function validatePhone(phone) {
        const re = /^[0-9]+$/;
        return re.test(String(phone));
    }

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Resetear mensajes
            mensajeError.style.display = "none";
            mensajeError.textContent = "";
            mensajeEnviado.style.display = "none";
            
            // Remover clases de error
            document.querySelectorAll(".error-field").forEach(field => {
                field.classList.remove("error-field");
            });
            document.querySelectorAll('.form-group-radio.error-field').forEach(group => {
                group.classList.remove("error-field");
            });

            let errores = [];

            // Validar campos obligatorios
            const nombre = form.elements["nombre"].value.trim();
            if (!nombre) {
                errores.push("El nombre completo es obligatorio.");
                form.elements["nombre"].classList.add("error-field");
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
                errores.push("El nombre solo debe contener letras.");
                form.elements["nombre"].classList.add("error-field");
            }
            
            const telefono = form.elements["telefono"].value.trim();
            if (!telefono) {
                errores.push("El teléfono es obligatorio.");
                form.elements["telefono"].classList.add("error-field");
            } else if (!validatePhone(telefono)) {
                errores.push("El teléfono solo debe contener números.");
                form.elements["telefono"].classList.add("error-field");
            }
            
            const email = form.elements["email"].value.trim();
            if (!email) {
                errores.push("El correo electrónico es obligatorio.");
                form.elements["email"].classList.add("error-field");
            } else if (!validateEmail(email)) {
                if (!email.includes('@') && !email.includes('.')) {
                    errores.push("El correo debe contener un '@' y un dominio (ej: ejemplo.com)");
                } else if (!email.includes('@')) {
                    errores.push("El correo electrónico debe incluir un signo '@'");
                } else if (!email.includes('.')) {
                    errores.push("El correo electrónico debe incluir un dominio válido (ej: .com)");
                } else {
                    errores.push("Por favor, ingresa un correo electrónico válido (ej: tu@dominio.com)");
                }
                form.elements["email"].classList.add("error-field");
            }
            
            const tipoTorta = form.elements["tipo-torta"].value;
            if (!tipoTorta) {
                errores.push("Debes seleccionar un tipo de torta.");
                form.elements["tipo-torta"].classList.add("error-field");
            }
            
            const tipoEvento = form.elements["tipo-evento"].value.trim();
            if (!tipoEvento) {
                errores.push("El tipo de evento es obligatorio.");
                form.elements["tipo-evento"].classList.add("error-field");
            }
            
            const asunto = form.elements["asunto"].value.trim();
            if (!asunto) {
                errores.push("El asunto es obligatorio.");
                form.elements["asunto"].classList.add("error-field");
            }
            
            // Validar radio buttons
            const diabeticoSi = document.getElementById('diabetico-si').checked;
            const diabeticoNo = document.getElementById('diabetico-no').checked;
            if (!diabeticoSi && !diabeticoNo) {
                errores.push("Debes indicar si eres diabético.");
                document.querySelector('.form-group-radio:has(input[name="diabetico"])').classList.add("error-field");
            }
            
            const celiacoSi = document.getElementById('celiaco-si').checked;
            const celiacoNo = document.getElementById('celiaco-no').checked;
            if (!celiacoSi && !celiacoNo) {
                errores.push("Debes indicar si eres celíaco.");
                document.querySelector('.form-group-radio:has(input[name="celiaco"])').classList.add("error-field");
            }

            // Mostrar errores o éxito
            if (errores.length > 0) {
                mensajeError.innerHTML = "Por favor, corrige los siguientes errores:<br>" + errores.join("<br>");
                mensajeError.style.display = "block";
                
                // Desplazamiento suave al mensaje de error
                mensajeError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                mensajeEnviado.textContent = "¡Formulario enviado con éxito! Nos pondremos en contacto contigo pronto.";
                mensajeEnviado.style.display = "block";
                form.reset();
                
                setTimeout(() => {
                    mensajeEnviado.style.display = "none";
                }, 5000);
            }
        });
        
        // Remover clase de error al interactuar con los campos
        const inputs = form.querySelectorAll("input, select, textarea");
        inputs.forEach(input => {
            input.addEventListener("focus", function() {
                this.classList.remove("error-field");
            });
            
            if (input.type === "text" || input.type === "email" || input.type === "tel" || input.tagName === "TEXTAREA") {
                input.addEventListener("input", function() {
                    this.classList.remove("error-field");
                });
            }
            
            if (input.tagName === "SELECT") {
                input.addEventListener("change", function() {
                    this.classList.remove("error-field");
                });
            }
        });

        // Para radio buttons
        document.querySelectorAll('input[name="diabetico"], input[name="celiaco"]').forEach(radio => {
            radio.addEventListener("change", function() {
                this.closest('.form-group-radio').classList.remove("error-field");
            });
        });
    }
});
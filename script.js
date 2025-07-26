document.addEventListener('DOMContentLoaded', () => {
    const ramos = document.querySelectorAll('.ramo');
    let ramosAprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

    // Función para actualizar el estado visual de los ramos
    const actualizarRamos = () => {
        ramos.forEach(ramo => {
            const ramoId = ramo.id;
            const requisitos = JSON.parse(ramo.dataset.requisitos || '[]');
            const requisitosCumplidos = requisitos.every(req => ramosAprobados.includes(req));

            // Limpiar clases de estado
            ramo.classList.remove('aprobado', 'bloqueado');

            if (ramosAprobados.includes(ramoId)) {
                ramo.classList.add('aprobado');
            } else if (!requisitosCumplidos) {
                ramo.classList.add('bloqueado');
            }
        });
    };

    // Manejar el clic en un ramo
    ramos.forEach(ramo => {
        ramo.addEventListener('click', () => {
            const ramoId = ramo.id;
            const requisitos = JSON.parse(ramo.dataset.requisitos || '[]');
            const requisitosCumplidos = requisitos.every(req => ramosAprobados.includes(req));
            const nombresRequisitos = requisitos.map(reqId => document.getElementById(reqId).textContent);

            if (ramosAprobados.includes(ramoId)) {
                // Desmarcar como aprobado
                ramosAprobados = ramosAprobados.filter(id => id !== ramoId);
            } else {
                if (requisitosCumplidos) {
                    // Marcar como aprobado
                    ramosAprobados.push(ramoId);
                } else {
                    // Mostrar alerta de requisitos
                    alert(`Para tomar este ramo, primero debes aprobar: ${nombresRequisitos.join(', ')}`);
                    return;
                }
            }

            // Guardar en localStorage y actualizar la vista
            localStorage.setItem('ramosAprobados', JSON.stringify(ramosAprobados));
            actualizarRamos();
        });
    });

    // Cargar estado inicial
    actualizarRamos();
});

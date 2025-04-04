import axios from 'https://cdn.skypack.dev/axios';

// Delegación de eventos para los botones de prioridad
document.addEventListener('click', (event) => {
    if (event.target.closest('.priority-up')) {
        const id = event.target.closest('.priority-up').dataset.id;
        updatePriority(id, 'up');
    }
    if (event.target.closest('.priority-down')) {
        const id = event.target.closest('.priority-down').dataset.id;
        updatePriority(id, 'down');
    }
});

// Función para actualizar la prioridad de los avisos
async function updatePriority(id, direction) {
    try {
        console.log(`Actualizando prioridad para ID: ${id}, Dirección: ${direction}`);
        await axios.post(`/updatePriority/${id}`, { direction });
        showAlert('Prioridad actualizada correctamente.');
        fetchWorkshopNotices(); // Refrescar la tabla después de actualizar
    } catch (error) {
        console.error('Error al actualizar la prioridad:', error);
        showAlert('Error al actualizar la prioridad. Por favor, inténtalo de nuevo.');
    }
}

// Función para mostrar la alerta y hacer que desaparezca sola
function showAlert(message) {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'alert-container';
    alertContainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    document.body.appendChild(alertContainer);

    setTimeout(() => {
        const alert = alertContainer.querySelector('.alert');
        if (alert) {
            alert.classList.remove('show');
            alert.classList.add('fade');
            setTimeout(() => {
                alertContainer.remove();
            }, 600);
        }
    }, 2000);
}

// Función para obtener los avisos de taller
async function fetchWorkshopNotices() {
    try {
        const response = await axios.get('/notices/taller');
        const notices = response.data.filter(item => item.status === 1); // Filtrar solo los avisos no aceptados
        console.log(notices);

        const tableBody = document.getElementById('workshopNoticesTableBody');
        tableBody.innerHTML = notices.map(item => `
            <tr>
                <td><a href="/noticesDetail/${item.id}" class="btn btn-secondary rounded-2">${item.id}</a></td>
                <td>${item.machine}</td>
                <td>${item.message}</td>
                <td>${item.regtime ? new Date(item.regtime).toLocaleString() : ''}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <!-- Input de contraseña y botón "Aceptar" -->
                        <form id="acceptForm${item.id}" action="/acceptNotice/${item.id}" method="post" class="d-flex align-items-center gap-2">
                            <input type="password" class="form-control" placeholder="Contraseña" required name="pass" id="pass-${item.id}">
                            <button type="submit" class="btn btn-secondary">Aceptar</button>
                        </form>

                        <!-- Botones de prioridad con íconos -->
                        <button class="btn btn-primary btn-sm priority-up" data-id="${item.id}" title="Mover al Inicio">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                        <button class="btn btn-danger btn-sm priority-down" data-id="${item.id}" title="Mover al Final">
                            <i class="fas fa-arrow-down"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error al obtener los avisos de workshop:', error);
    }
}

// Llamada inicial para cargar los avisos
fetchWorkshopNotices();


/* import axios from 'https://cdn.skypack.dev/axios';

async function fetchWorkshopNotices() {
    try {
        const response = await axios.get('/notices/taller');
        const notices = response.data.filter(item => item.status === 1); // Filtrar solo los avisos no aceptados
        console.log(notices);
        

        const tableBody = document.getElementById('workshopNoticesTableBody');
        tableBody.innerHTML = notices.map(item => `
            <tr>
                <td><a href="/noticesDetail/${item.id}" class="btn btn-secondary rounded-2">${item.id}</a></td>
                <td>${item.machine}</td>
                <td>${item.message}</td>
                <td>${item.regtime ? new Date(item.regtime).toLocaleString() : ''}</td>
                <td>${item.technician}</td>
                <td>${item.notice_desc}</td>
                <td>
                    <form id="acceptForm${item.id}" action="/acceptNotice/${item.id}" method="post">
                        <input type="password" class="form-control mb-2" placeholder="Contraseña" required name="pass" id="pass-${item.id}">
                        <button type="submit" class="btn btn-secondary rounded-2">Aceptar</button>
                    </form>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error al obtener los avisos de workshop:', error);
    }
}

fetchWorkshopNotices();
 */
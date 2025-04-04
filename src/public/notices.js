import axios from 'https://cdn.skypack.dev/axios';

const socket = io();

// Escuchar evento de nuevo aviso
socket.on('newNotice', (data) => {
    console.log('Nuevo aviso recibido:', data);
    showAlert(`Nuevo aviso registrado:\nEquipo: ${data.equipment}\nNovedad: ${data.event}\nDescripción: ${data.notice_desc}`);
    fetchData();
});

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

console.log('noticess');

// Configurar interceptor de Axios para manejar errores globalmente
axios.interceptors.response.use(
    response => response,
    error => {
        console.error('Error en la solicitud:', error);
        return Promise.reject(error);
    }
);

/* document.addEventListener('click', (event) => {
    if (event.target.matches('.priority-up')) {
        const id = event.target.dataset.id;
        updatePriority(id, 'up');
    } else if (event.target.matches('.priority-down')) {
        const id = event.target.dataset.id;
        updatePriority(id, 'down');
    }
}); */

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



async function updatePriority(id, direction) {
    try {
        await axios.post(`/updatePriority/${id}`, { direction });
        showAlert('Prioridad actualizada correctamente.');
        fetchData(); // Refrescar la lista de avisos
    } catch (error) {
        console.error('Error al actualizar la prioridad:', error);
        showAlert('Error al actualizar la prioridad. Por favor, inténtalo de nuevo.');
    }
}

async function fetchData() {
    try {
        const responseNotices = await axios.get('/UnAcceptedNotices');
        const responseAccepted = await axios.get('/acceptedNotices');
        const noticesData = responseNotices.data;
        const acceptedNotices = responseAccepted.data;

        const badges = await Promise.all(acceptedNotices.map(item => fetchBadgeCount(item.id)));

        const noticesTableHTML = generateNoticesTableHTML(noticesData);
        injectNoticesTableIntoHTML(noticesTableHTML);

        const acceptedTableHTML = generateAcceptedTableHTML(acceptedNotices, badges);
        injectAcceptedTableIntoHTML(acceptedTableHTML);

    } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
        showAlert('Error al obtener las notificaciones. Por favor, inténtalo de nuevo.');
    }
}

async function fetchBadgeCount(id_notice) {
    try {
        const response = await axios.get(`/noticesUser_User/${id_notice}`);
        const noticesUser_User = response.data;
        const activeNotices = noticesUser_User.filter(item => item.status === 'active' && !item.endtime);
        return activeNotices.length;
    } catch (error) {
        console.error('Error al obtener noticesUser_User:', error);
        return 0;
    }
}




function generateNoticesTableHTML(notices) {
    console.log('Notices:', notices); // Verifica los datos
    return `
        ${notices.map((item) => `
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
                            <button type="submit" class="btn btn-secondary">
                                Aceptar
                            </button>
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
        `).join('')}
    `;
}


function generateAcceptedTableHTML(acceptedNotices, badges) {
    return `
        ${acceptedNotices.map((item, index) => `
            <tr>
                <td><a href="/noticesDetail/${item.id}" class="btn btn-secondary rounded-2">${item.id}</a></td>
                <td>${item.machine}</td>
                <td>${item.message}</td>
                <td>${item.regtime ? new Date(item.regtime).toLocaleString() : ''}</td>
                <td>${item.technician}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <form id="addUserNoticeForm${item.id}" action="/addUserNotice/${item.id}" method="post" class="d-flex align-items-center gap-2">
                            <input type="password" class="form-control" placeholder="+" required name="pass" id="pass-${item.id}">
                            <button type="submit" class="btn btn-secondary">
                                <i class="fas fa-user-plus"></i>
                                <span class="badge text-bg-warning">${badges[index]}</span>
                            </button>
                        </form>
                    </div>
                </td>
            </tr>
        `).join('')}
    `;
}


function injectNoticesTableIntoHTML(tableHTML) {
    const tableBody = document.getElementById('noticesTableBody');
    tableBody.innerHTML = tableHTML;
}

function injectAcceptedTableIntoHTML(tableHTML) {
    const tableBody = document.getElementById('acceptedNoticesTableBody');
    tableBody.innerHTML = tableHTML;
}



fetchData();
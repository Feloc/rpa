import axios from 'https://cdn.skypack.dev/axios';

// Función para obtener las alertas registradas
async function fetchAlerts() {
    try {
        const response = await axios.get('/alerts');
        const alerts = response.data;

        const tableBody = document.getElementById('alertsTableBody');
        tableBody.innerHTML = alerts.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${new Date(item.startDate).toLocaleDateString()}</td>
                <td>${item.startTime}</td>
                <td>${item.period}${item.hours ? ` (${item.hours} horas)` : ''}</td>
                <td>${item.message}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-alert" data-id="${item.id}">Eliminar</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error al obtener las alertas:', error);
    }
}

// Delegación de eventos para eliminar alertas
document.addEventListener('click', async (event) => {
    if (event.target.matches('.delete-alert')) {
        const id = event.target.dataset.id;
        try {
            await axios.delete(`/alerts/${id}`);
            fetchAlerts(); // Refrescar la tabla después de eliminar
        } catch (error) {
            console.error('Error al eliminar alerta:', error);
        }
    }
});

// Inicializar el registro de alertas
fetchAlerts();




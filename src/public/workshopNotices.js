import axios from 'https://cdn.skypack.dev/axios';

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

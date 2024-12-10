import axios from 'https://cdn.skypack.dev/axios';

console.log('noticess');

// Configurar interceptor de Axios para manejar errores globalmente
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

async function fetchData() {
  try {
    const response = await axios.get('/getNotices');
    const noticesData = response.data;
    const acceptedNotices = noticesData.filter(item => item.status == 2);

    const badges = await Promise.all(acceptedNotices.map(item => fetchBadgeCount(item.id)));

    const tableHTML = generateTableHTML(acceptedNotices, badges);
    injectTableIntoHTML(tableHTML);

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
    return 0; // En caso de error, devuelve 0
  }
}

function generateTableHTML(notices, badges) {
  return `
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Equipo</th>
            <th>Novedad</th>
            <th class="d-none d-lg-table-cell">Hora registro</th>
            <th class="d-none d-lg-table-cell">Hora inicio</th>
            <th>Técnico</th>
            <th>+</th>
            <th class="d-none d-lg-table-cell">Descripción</th>
          </tr>
        </thead>
        <tbody>
          ${notices.map((item, index) => `
            <tr>
              <td>
                <a href="/noticesDetail/${item.id}" class="btn btn-secondary rounded-2">${item.id}</a>
              </td>
              <td>${item.machine}</td>
              <td>${item.message}</td>
              <td class="d-none d-lg-table-cell">${item.regtime}</td>
              <td class="d-none d-lg-table-cell">${item.starttime}</td>
              <td>${item.technician}</td>
              <td>
                <form id="addUserNoticeForm${item.id}" action="/addUserNotice/${item.id}" method="post">
                  <label class="visually-hidden">Novedad</label>
                  <input type="password" class="form-control" placeholder="+" required name="pass" id="pass-${item.id}">
                  <button type="submit" class="btn btn-secondary rounded-2"> + <span class="badge text-bg-warning">${badges[index]}</span></button>
                </form>
              </td>
              <td class="d-none d-lg-table-cell">
                <form id="closeForm${item.id}" action="/closeNotice/${item.id}" method="post">
                  <label class="visually-hidden">Novedad</label>
                  <input type="textarea" class="form-control" placeholder="Descripción" required name="description" id="description-${item.id}">
                  <button type="submit" class="btn btn-secondary rounded-2">Cerrar</button>
                </form>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function injectTableIntoHTML(tableHTML) {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = tableHTML;
}

function showAlert(message) {
  // Puedes usar un modal o algún otro componente para mostrar el mensaje al usuario
  alert(message);
}

fetchData();


/* import axios from 'https://cdn.skypack.dev/axios'

console.log('noticess');

// Configurar interceptor de Axios para manejar errores globalmente 
axios.interceptors.response.use( 
  response => response, 
  error => { 
    console.error('Error en la solicitud:', error); 
    return Promise.reject(error); 
  }
)

async function fetchData() {
  try {
    const response = await axios.get('/getNotices')
    const noticesData = response.data
    const acceptedNotices = noticesData.filter(item => (item.status == 2))

    async function badge (id_notice) {
      try {
        const response1 = await axios.get(`/noticesUser_User/${id_notice}`)
        const noticesUser_User = response1.data
        const noticesUser_UserFilter = noticesUser_User.filter(item =>(item.status === 'active' && !item.endtime))
        const noticesUser_UserLength = noticesUser_UserFilter.length
        return noticesUser_UserLength
      } catch (error) {
        console.error('Error al obtener noticesUser_User:', error);
        return 0; // En caso de error, devuelve 0
      }    
    }
    
    const badges = await Promise.all(acceptedNotices.map(item => badge(item.id)));
    
    const tableHTML = `
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Equipo</th>
              <th>Novedad</th>
              <th class="d-none d-lg-table-cell">Hora registro</th>
              <th class="d-none d-lg-table-cell">Hora inicio</th>
              <th>Técnico</th>
              <th>+</th>
              <th class="d-none d-lg-table-cell">Descripción</th>
            </tr>
          </thead>
          <tbody>
            ${acceptedNotices.map((item, index) => `
              <tr>
                <td>
                  <a href="/noticesDetail/${item.id}" class="btn btn-secondary rounded-2">${item.id}</a>
                </td>
                <td>${item.machine}</td>
                <td>${item.message}</td>
                <td class="d-none d-lg-table-cell">${item.regtime}</td>
                <td class="d-none d-lg-table-cell">${item.starttime}</td>
                <td>${item.technician}</td>
                <td>
                  <form id="addUserNoticeForm${item.id}" action="/addUserNotice/${item.id}" method="post">
                    <label class="visually-hidden">Novedad</label>
                    <input type="password" class="form-control" placeholder="+" required name="pass" id="pass-${item.id}">
                    <button type="submit" class="btn btn-secondary rounded-2"> + <span class="badge text-bg-warning">${badges[index]}</span></button>
                  </form>
                </td>
                <td class="d-none d-lg-table-cell">
                  <form id="closeForm${item.id}" action="/closeNotice/${item.id}" method="post">
                    <label class="visually-hidden">Novedad</label>
                    <input type="textarea" class="form-control" placeholder="Descripción" required name="description" id="description-${item.id}">
                    <button type="submit" class="btn btn-secondary rounded-2">Cerrar</button>
                  </form>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Inject table into HTML
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = tableHTML;

  } catch (error) {
    console.error(error);
  }
}

fetchData() */


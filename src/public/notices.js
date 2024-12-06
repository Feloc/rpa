import axios from 'https://cdn.skypack.dev/axios'

console.log('noticess');



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

fetchData()


{/* <form id="closeForm${item.id}" action="/closeNotice/${item.id}" method="post">
                <td>
                  <label  class="visually-hidden">Novedad</label>
                  <input type="textarea" class="form-control" placeholder="Descripción" required name="description" id="description-${item.id}">
                </td>
                <td class="col-2">
                  <button type="submit" class="btn btn-secondary rounded-2">Cerrar</button>                         
                </td>
              </form> */}



// Add event listeners to close forms (optional)
/* acceptedNotices.forEach(item => {
  const closeForm = document.getElementById(`closeForm${item.id}`);
  console.log(closeForm);
  if (closeForm) {
    closeForm.addEventListener('submit', handleCloseForm); // Assuming a function to handle submission
  }
}); */



function handleCloseForm(event) {
  event.preventDefault(); // Prevent default form submission
  console.log('ji');
  // Use Fetch API for modern approach (example)
  /* const formData = new FormData(event.target); // Extract form data
  fetch(event.target.action, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      // Update table or display success message
    } else {
      // Handle errors
    }
  })
  .catch(error => {
    console.error('Error closing notice:', error);
  }); */

  // Or use form.submit() for legacy approach (might reload page)
  // event.target.submit();
}



/* try {
  const response = await fetch('/getNotices')
  if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`)
  }
  noticesData = await response.json()
  console.log('Datos recibidos "noticesData": ', noticesData);
} catch (error) {
  console.error('Error al realizar la solicitud:', error.message)
  //window.location.reload()
} */



//console.log(acceptedNotices);






/* document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('table'); // Assuming table is the parent
  
    table.addEventListener('click', function(event) {
      if (event.target.matches('button')) { // Check if clicked element is a button
        console.log('boton');
        const form = event.target.closest('form'); // Find closest form element
        if (form) {
            console.log('si form');
            const passwordInput = form.querySelector('#pass-' + form.id.split('-')[1]); // Dynamically get input by ID
            passwordInput.addEventListener('keyup', function() {
              if (this.value.length < 4) {
                alert('La contraseña debe tener al menos 8 caracteres.');
                this.focus();
                return false; // Prevent form submission (valid here)
              }
            });
        }else{
            console.log('no form');
        }
      }
    });
  }); */



/* document.addEventListener('DOMContentLoaded', function() {//We use DOMContentLoaded to ensure the script runs after the HTML content is loaded. The DOMContentLoaded event ensures the script runs after the form elements are available in the DOM.
    const forms = document.querySelectorAll('form'); // Select all forms
    console.log('forms ' + forms.length);
    if (forms.length > 0) {
        forms.forEach(form => {
            const passwordInput = form.querySelector('#pass-' + form.id.split('-')[1]); // Dynamically get input by ID
            passwordInput.addEventListener('keyup', function() {
              if (this.value.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres.');
                this.focus();
                return false; // Prevent form submission (valid here)
              }
            });
          });
    } else {
        console.warn('No forms found in the document.')
    }
    
  }); */


/* const passwordInput = document.getElementById('pass1');
if (passwordInput.value.length < 8) {
  alert('La contraseña debe tener al menos 8 caracteres.');
  passwordInput.focus();
  return false; // Prevent form submission
} */



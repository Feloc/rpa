console.log('NoticesDetail');



//const container1 = document.getElementById('uploadContainer')
//const datosCont = container1.dataset.id-notice
 

document.addEventListener('DOMContentLoaded', async() => {
    const container = document.getElementById('uploadContainer')
    const id_notice = container.getAttribute('data-id-notice')

    console.log(id_notice);

    try {
        const response = await axios.get(`/getImages/${id_notice}`)
        const noticeImage = response.data
        console.log(noticeImage );
        const carouselInner = document.getElementById('carousel-inner')
    
        noticeImage.forEach((image, index) => {
            const div = document.createElement('div')
            div.className = `carousel-item${index === 0 ? ' active' : ''}`
            const img = document.createElement('img')
            img.src = `/uploads/resized_${image.imagename}`
            img.className = 'd-block w-100'
            img.alt = `Image ${index + 1}`
            div.appendChild(img)
            carouselInner.appendChild(div)
        });
    
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
    }

    try {
        const response1 = await axios.get(`/noticesUser_User/${id_notice}`)
        const noticesUser_User = response1.data
        console.log(noticesUser_User);

        noticesUser_User.map((item, index) => {
            console.log(index, new Date(item.endtime) - new Date(item.starttime));
        })

        const card = `
        <div class="card" style="width: 18rem;">
            <div class="card-header">
                Entradas
            </div>
            ${noticesUser_User.map(item => `
                ${item.endtime ? `
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${item.name}</li>
                <li class="list-group-item">${item.comment ? item.comment : ''}</li>
                <li class="list-group-item">${item.starttime ? item.starttime : ''}</li>
                <li class="list-group-item">${item.endtime ? item.endtime : ''}</li>
                <li class="list-group-item">${item.endtime}</li>
            </ul>
                ` : ''}
            `).join('')}
        </div>
        `
        const userEntrance = `
        <div class="accordion" id="accordionExample">
            ${noticesUser_User.map((item, index) => `
                ${item.endtime ? `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                        ${item.name}
                    </button>
                    </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${item.comment ? item.comment : ''}</li>
                            <li class="list-group-item">${item.starttime ? item.starttime.toLocaleString() : ''}</li>
                            <li class="list-group-item">${item.endtime ? item.endtime.toLocaleString() : ''}</li>
                            <li class="list-group-item">${((new Date(item.endtime) - new Date(item.starttime))/(1000*60)).toFixed(0) + ' Min'}</li>
                        </ul>
                    </div>
                    </div>
                </div>
                ` : ''}
            `).join('')}
        </div>
                `
        const cardcontainer = document.getElementById('cardcontainer')
        cardcontainer.innerHTML = userEntrance

    } catch (error) {
        console.error('Error al obtener noticesUser_User:', error);
    }
})






    

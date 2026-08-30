let selectedFile = null;

// // Submit do formulário
// function handleSubmit(event) {
//     event.preventDefault();

//     if (!selectedFile) {
//         alert('Selecione um arquivo primeiro');
//         return;
//     }

//     const formData = {
//         file: selectedFile,
//         type: document.getElementById('media-type').value,
//         title: document.getElementById('media-title').value,
//         description: document.getElementById('media-description').value
//     };

//     console.log('Uploading:', formData);

//     // Desabilitar botão durante upload
//     document.getElementById('submit-btn').disabled = true;

//     // Simular upload (substituir com chamada real ao backend)
//     simulateUpload();
// }

// // Reset do formulário
// function resetForm() {
//     document.getElementById('upload-form').reset();
//     removeFile();
//     document.getElementById('progress-bar').style.width = '0%';
// }





// 
// Feito por humano :)
// 

function validadeURL(url) {
    const valid = url.startsWith("https://youtu.be/") || url.startsWith("https://www.youtube.com/watch?v=");
    console.log('url valida: ', valid);
    document.getElementById('submit-btn').disabled = !valid;

}

async function uploadVideo(event) {
    event.preventDefault();

    const form_data = {
        url: document.getElementById("media-title").value,
        description: document.getElementById("media-description").value
    }

    try {
        const response = await fetch("http://localhost:8000/upload", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form_data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Success:', result);
    } catch (error) {
        console.error('Error during POST request:', error);
    }
}
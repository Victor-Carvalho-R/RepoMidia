let selectedFile = null;

// Drag and drop
const dropzone = document.getElementById('dropzone');

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// Selecionar arquivo
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        handleFile(file);
    }
}

// Processar arquivo
function handleFile(file) {
    selectedFile = file;

    // Detectar tipo automaticamente
    const type = file.type.split('/')[0];
    const typeSelect = document.getElementById('media-type');

    if (type === 'audio') {
        typeSelect.value = 'musica';
    } else if (type === 'video') {
        typeSelect.value = 'video';
    } else if (type === 'image') {
        typeSelect.value = 'imagem';
    }

    // Auto-preencher título com nome do arquivo (sem extensão)
    const titleInput = document.getElementById('media-title');
    titleInput.value = file.name.replace(/\.[^/.]+$/, '');

    // Mostrar preview
    showPreview(file);

    // Habilitar botão de submit
    document.getElementById('submit-btn').disabled = false;
}

// Mostrar preview
function showPreview(file) {
    const preview = document.getElementById('file-preview');
    const content = document.getElementById('preview-content');
    const type = file.type.split('/')[0];

    let html = '';

    if (type === 'image') {
        const reader = new FileReader();
        reader.onload = (e) => {
            content.innerHTML = `<img class="preview-image" src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else if (type === 'video') {
        const reader = new FileReader();
        reader.onload = (e) => {
            content.innerHTML = `<video class="preview-video" controls src="${e.target.result}"></video>`;
        };
        reader.readAsDataURL(file);
    } else if (type === 'audio') {
        const reader = new FileReader();
        reader.onload = (e) => {
            content.innerHTML = `
                        <div class="preview-content">
                            <div class="preview-icon">🎵</div>
                            <div class="preview-info">
                                <div class="preview-filename">${file.name}</div>
                                <div class="preview-meta">${formatFileSize(file.size)}</div>
                            </div>
                        </div>
                        <audio class="preview-audio" controls src="${e.target.result}"></audio>
                    `;
        };
        reader.readAsDataURL(file);
    } else {
        content.innerHTML = `
                    <div class="preview-content">
                        <div class="preview-icon">📄</div>
                        <div class="preview-info">
                            <div class="preview-filename">${file.name}</div>
                            <div class="preview-meta">${formatFileSize(file.size)}</div>
                        </div>
                    </div>
                `;
    }

    preview.classList.add('show');
}

// Formatar tamanho do arquivo
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Remover arquivo
function removeFile() {
    selectedFile = null;
    document.getElementById('file-preview').classList.remove('show');
    document.getElementById('file-input').value = '';
    document.getElementById('submit-btn').disabled = true;
}

// Simular upload
function simulateUpload() {
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');

    progressContainer.classList.add('show');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;

        progressBar.style.width = progress + '%';
        progressPercentage.textContent = Math.round(progress) + '%';

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                alert('Upload concluído com sucesso!');
                resetForm();
                progressContainer.classList.remove('show');
            }, 500);
        }
    }, 200);
}

// Submit do formulário
function handleSubmit(event) {
    event.preventDefault();

    if (!selectedFile) {
        alert('Selecione um arquivo primeiro');
        return;
    }

    const formData = {
        file: selectedFile,
        type: document.getElementById('media-type').value,
        title: document.getElementById('media-title').value,
        description: document.getElementById('media-description').value
    };

    console.log('Uploading:', formData);

    // Desabilitar botão durante upload
    document.getElementById('submit-btn').disabled = true;

    // Simular upload (substituir com chamada real ao backend)
    simulateUpload();
}

// Reset do formulário
function resetForm() {
    document.getElementById('upload-form').reset();
    removeFile();
    document.getElementById('progress-bar').style.width = '0%';
}





// 
// Feito por humano :)
// 

function showUploadType() {
    
}
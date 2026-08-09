// Dados de exemplo (substituir com chamada ao backend)
const recentMedia = {
    musicas: [
        { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', date: '2024-12-05', thumbnail: null },
        { id: 2, title: 'Stairway to Heaven', artist: 'Led Zeppelin', date: '2024-12-04', thumbnail: null },
        { id: 3, title: 'Hotel California', artist: 'Eagles', date: '2024-12-03', thumbnail: null },
        { id: 4, title: 'Imagine', artist: 'John Lennon', date: '2024-12-02', thumbnail: null },
    ],
    videos: [
        { id: 1, title: 'Viagem à Praia', duration: '5:32', date: '2024-12-06', thumbnail: null },
        { id: 2, title: 'Festa de Aniversário', duration: '12:45', date: '2024-12-05', thumbnail: null },
        { id: 3, title: 'Tutorial de Programação', duration: '25:18', date: '2024-12-01', thumbnail: null },
    ],
    imagens: [
        { id: 1, title: 'Pôr do Sol', date: '2024-12-07', thumbnail: null },
        { id: 2, title: 'Montanhas', date: '2024-12-06', thumbnail: null },
        { id: 3, title: 'Cachorro na Praia', date: '2024-12-05', thumbnail: null },
        { id: 4, title: 'Comida Deliciosa', date: '2024-12-04', thumbnail: null },
        { id: 5, title: 'Cidade à Noite', date: '2024-12-03', thumbnail: null },
    ]
};

// Renderizar músicas
function renderMusicas() {
    const grid = document.getElementById('musicas-grid');

    if (recentMedia.musicas.length === 0) {
        grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🎵</div><p>Nenhuma música adicionada ainda</p></div>';
        return;
    }

    grid.innerHTML = recentMedia.musicas.map(item => `
                <div class="media-card" onclick="playMusic(${item.id})">
                    <div class="media-thumbnail">
                        ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${item.title}">` : '<span class="icon">🎵</span>'}
                    </div>
                    <div class="media-info">
                        <div class="media-title">${item.title}</div>
                        <div class="media-meta">${item.artist}</div>
                    </div>
                </div>
            `).join('');
}

// Renderizar vídeos
function renderVideos() {
    const grid = document.getElementById('videos-grid');

    if (recentMedia.videos.length === 0) {
        grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🎬</div><p>Nenhum vídeo adicionado ainda</p></div>';
        return;
    }

    grid.innerHTML = recentMedia.videos.map(item => `
                <div class="media-card" onclick="playVideo(${item.id})">
                    <div class="media-thumbnail">
                        ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${item.title}">` : '<span class="icon">🎬</span>'}
                    </div>
                    <div class="media-info">
                        <div class="media-title">${item.title}</div>
                        <div class="media-meta">${item.duration}</div>
                    </div>
                </div>
            `).join('');
}

// Renderizar imagens
function renderImagens() {
    const grid = document.getElementById('imagens-grid');

    if (recentMedia.imagens.length === 0) {
        grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🖼️</div><p>Nenhuma imagem adicionada ainda</p></div>';
        return;
    }

    grid.innerHTML = recentMedia.imagens.map(item => `
                <div class="media-card" onclick="viewImage(${item.id})">
                    <div class="media-thumbnail">
                        ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${item.title}">` : '<span class="icon">🖼️</span>'}
                    </div>
                    <div class="media-info">
                        <div class="media-title">${item.title}</div>
                        <div class="media-meta">${formatDate(item.date)}</div>
                    </div>
                </div>
            `).join('');
}

// Funções auxiliares
function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;

    return date.toLocaleDateString('pt-BR');
}

function handleSearch(query) {
    console.log('Searching for:', query);
    // Implementar busca real com backend
}

function playMusic(id) {
    console.log('Playing music:', id);
    window.location.href = '/musicas';
}

function playVideo(id) {
    console.log('Playing video:', id);
    window.location.href = '/videos';
}

function viewImage(id) {
    console.log('Viewing image:', id);
    window.location.href = '/imagens';
}

// Inicializar
renderMusicas();
renderVideos();
renderImagens();
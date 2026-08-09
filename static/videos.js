// Dados de exemplo
const videoLibrary = [
    {
        id: 1,
        title: 'Viagem à Praia - Férias de Verão 2024',
        duration: '5:32',
        date: '2024-12-06',
        thumbnail: null,
        url: 'video1.mp4'
    },
    {
        id: 2,
        title: 'Festa de Aniversário da Maria',
        duration: '12:45',
        date: '2024-12-05',
        thumbnail: null,
        url: 'video2.mp4'
    },
    {
        id: 3,
        title: 'Tutorial de Programação Python',
        duration: '25:18',
        date: '2024-12-01',
        thumbnail: null,
        url: 'video3.mp4'
    },
    {
        id: 4,
        title: 'Passeio no Parque com o Cachorro',
        duration: '8:15',
        date: '2024-11-28',
        thumbnail: null,
        url: 'video4.mp4'
    },
    {
        id: 5,
        title: 'Receita de Bolo de Chocolate',
        duration: '6:42',
        date: '2024-11-25',
        thumbnail: null,
        url: 'video5.mp4'
    },
    {
        id: 6,
        title: 'Gameplay - God of War Ragnarok',
        duration: '45:30',
        date: '2024-11-20',
        thumbnail: null,
        url: 'video6.mp4'
    },
    {
        id: 7,
        title: 'Apresentação do Projeto Final',
        duration: '15:22',
        date: '2024-11-15',
        thumbnail: null,
        url: 'video7.mp4'
    },
    {
        id: 8,
        title: 'Treino de Musculação - Dia de Perna',
        duration: '18:05',
        date: '2024-11-10',
        thumbnail: null,
        url: 'video8.mp4'
    },
];

// Renderizar grid de vídeos
function renderVideos() {
    const grid = document.getElementById('videos-grid');
    grid.innerHTML = videoLibrary.map(video => `
                <div class="video-card" onclick="openVideo(${video.id})">
                    <div class="video-thumbnail">
                        ${video.thumbnail ?
            `<img src="${video.thumbnail}" alt="${video.title}">` :
            '<span class="video-icon">🎬</span>'
        }
                        <div class="play-overlay">
                            <div class="play-button">▶</div>
                        </div>
                        <div class="video-duration">${video.duration}</div>
                    </div>
                    <div class="video-info">
                        <div class="video-title">${video.title}</div>
                        <div class="video-meta">${formatDate(video.date)}</div>
                    </div>
                </div>
            `).join('');
}

// Formatar data
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

// Abrir vídeo no modal
function openVideo(id) {
    const video = videoLibrary.find(v => v.id === id);
    if (!video) return;

    const modal = document.getElementById('video-modal');
    const videoElement = document.getElementById('modal-video');
    const titleElement = document.getElementById('modal-title');
    const metaElement = document.getElementById('modal-meta');

    // Atualizar informações
    titleElement.textContent = video.title;
    metaElement.textContent = `Duração: ${video.duration} • Adicionado em ${new Date(video.date).toLocaleDateString('pt-BR')}`;

    // Carregar vídeo (substituir com URL real do backend)
    videoElement.src = video.url;

    // Mostrar modal
    modal.classList.add('active');

    // Auto-play
    videoElement.play();
}

// Fechar modal
function closeModal() {
    const modal = document.getElementById('video-modal');
    const videoElement = document.getElementById('modal-video');

    // Pausar vídeo
    videoElement.pause();
    videoElement.currentTime = 0;

    // Esconder modal
    modal.classList.remove('active');
}

// Fechar modal ao clicar fora
document.getElementById('video-modal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Atualizar contagem
document.getElementById('video-count').textContent = `${videoLibrary.length} vídeos`;

// Inicializar
renderVideos();
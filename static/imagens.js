// Dados de exemplo
const imageLibrary = [
    { id: 1, title: 'Pôr do Sol na Praia', date: '2024-12-07', url: null, layout: 'wide' },
    { id: 2, title: 'Montanhas Cobertas de Neve', date: '2024-12-06', url: null },
    { id: 3, title: 'Cachorro Brincando', date: '2024-12-05', url: null },
    { id: 4, title: 'Comida Gourmet', date: '2024-12-04', url: null },
    { id: 5, title: 'Cidade à Noite', date: '2024-12-03', url: null, layout: 'tall' },
    { id: 6, title: 'Flores no Jardim', date: '2024-12-02', url: null },
    { id: 7, title: 'Arquitetura Moderna', date: '2024-12-01', url: null },
    { id: 8, title: 'Café da Manhã', date: '2024-11-30', url: null, layout: 'wide' },
    { id: 9, title: 'Céu Estrelado', date: '2024-11-29', url: null },
    { id: 10, title: 'Gato Dormindo', date: '2024-11-28', url: null },
    { id: 11, title: 'Paisagem Natural', date: '2024-11-27', url: null },
    { id: 12, title: 'Arte de Rua', date: '2024-11-26', url: null },
    { id: 13, title: 'Esporte Radical', date: '2024-11-25', url: null },
    { id: 14, title: 'Livros Antigos', date: '2024-11-24', url: null },
    { id: 15, title: 'Música ao Vivo', date: '2024-11-23', url: null },
];

let currentImageIndex = 0;

// Renderizar galeria
function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = imageLibrary.map((img, index) => `
                <div class="gallery-item ${img.layout || ''}" onclick="openLightbox(${index})">
                    ${img.url ?
            `<img src="${img.url}" alt="${img.title}">` :
            '<div class="image-placeholder">🖼️</div>'
        }
                    <div class="gallery-overlay">
                        <div class="image-title">${img.title}</div>
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

// Abrir lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fechar lightbox
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navegar entre imagens
function navigateImage(direction) {
    currentImageIndex += direction;

    // Loop circular
    if (currentImageIndex < 0) {
        currentImageIndex = imageLibrary.length - 1;
    } else if (currentImageIndex >= imageLibrary.length) {
        currentImageIndex = 0;
    }

    updateLightbox();
}

// Atualizar lightbox
function updateLightbox() {
    const img = imageLibrary[currentImageIndex];
    const imgElement = document.getElementById('lightbox-img');
    const titleElement = document.getElementById('lightbox-title');
    const metaElement = document.getElementById('lightbox-meta');

    // Atualizar imagem (substituir com URL real)
    imgElement.src = img.url || 'https://via.placeholder.com/800x600/333/a855f7?text=' + encodeURIComponent(img.title);
    imgElement.alt = img.title;

    // Atualizar informações
    titleElement.textContent = img.title;
    metaElement.textContent = `${currentImageIndex + 1} de ${imageLibrary.length} • ${formatDate(img.date)}`;
}

// Fechar ao clicar no fundo
document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Navegação por teclado
document.addEventListener('keydown', function (e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            navigateImage(-1);
            break;
        case 'ArrowRight':
            navigateImage(1);
            break;
    }
});

// Atualizar contagem
document.getElementById('image-count').textContent = `${imageLibrary.length} imagens`;

// Inicializar
renderGallery();
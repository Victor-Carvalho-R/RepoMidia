const sidebar = document.getElementsByClassName("sidebar")[0];
const main_content = document.getElementsByClassName("main-content")[0];
const page_wrapper = document.createElement("div");

page_wrapper.classList.add("page-wrapper");
sidebar.parentNode.insertBefore(page_wrapper, sidebar);
page_wrapper.appendChild(sidebar);
page_wrapper.appendChild(main_content);

// Dados de exemplo
const musicLibrary = [
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55' },
    { id: 2, title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: '8:02' },
    { id: 3, title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: '6:30' },
    { id: 4, title: 'Imagine', artist: 'John Lennon', album: 'Imagine', duration: '3:03' },
    { id: 5, title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', album: 'Appetite for Destruction', duration: '5:56' },
    { id: 6, title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', duration: '5:01' },
    { id: 7, title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: '4:54' },
    { id: 8, title: 'Hey Jude', artist: 'The Beatles', album: 'Hey Jude', duration: '7:11' },
    { id: 9, title: 'Wonderwall', artist: 'Oasis', album: '(What\'s the Story) Morning Glory?', duration: '4:18' },
    { id: 10, title: 'Rolling in the Deep', artist: 'Adele', album: '21', duration: '3:48' },
    { id: 11, title: 'Lose Yourself', artist: 'Eminem', album: '8 Mile Soundtrack', duration: '5:26' },
    { id: 12, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', duration: '4:30' },
];

let currentTrack = 0;
let isPlaying = false;

// Tocar música
function playTrack(index, song_name) {
    currentTrack = index;
    isPlaying = true;
    updatePlayer(song_name);
    renderMusicList();
}

// Atualizar player
function updatePlayer(song_name) {
    const track = musicLibrary[currentTrack];
    document.getElementById('playing-title').textContent = song_name;
    document.getElementById('playing-artist').textContent = "placeholder";
    document.getElementById('play-btn').textContent = isPlaying ? '⏸' : '▶';
}

// Toggle play/pause
function togglePlay() {
    isPlaying = !isPlaying;
    updatePlayer();
    renderMusicList();
}

// Próxima música
function nextTrack() {
    currentTrack = (currentTrack + 1) % musicLibrary.length;
    isPlaying = true;
    updatePlayer();
    renderMusicList();
}

// Música anterior
function previousTrack() {
    currentTrack = currentTrack === 0 ? musicLibrary.length - 1 : currentTrack - 1;
    isPlaying = true;
    updatePlayer();
    renderMusicList();
}

// Seek
function seekTo(event) {
    const bar = event.currentTarget;
    const percent = (event.offsetX / bar.offsetWidth) * 100;
    document.getElementById('progress-fill').style.width = percent + '%';
}

// Volume
function setVolume(event) {
    const bar = event.currentTarget;
    const percent = (event.offsetX / bar.offsetWidth) * 100;
    document.getElementById('volume-fill').style.width = percent + '%';
}

// Atualizar contagem
document.getElementById('music-count').textContent = `${musicLibrary.length} músicas`;

// Inicializar
updatePlayer();
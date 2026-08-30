from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from pydantic import BaseModel
import json
import yt_dlp
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

#--------------------------------------------
# CLASSES
#--------------------------------------------

class Musica(BaseModel):
    url: str
    description: str

#--------------------------------------------
# GET
#--------------------------------------------

@app.get("/")
async def read_item(request: Request):
    return templates.TemplateResponse(request=request, name="home.html")

@app.get("/imagens")
async def read_item(request: Request):
    return templates.TemplateResponse(request=request, name="imagens.html")

@app.get("/musicas")
async def read_item(request: Request):
    return templates.TemplateResponse(request=request, name="musicas.html")

@app.get("/upload")
async def read_item(request: Request):
    return templates.TemplateResponse(request=request, name="upload.html")

@app.get("/videos")
async def read_item(request: Request):
    return templates.TemplateResponse(request=request, name="videos.html")

#--------------------------------------------
# POST
#--------------------------------------------

@app.post("/upload")
async def upload_url(form_data: Musica):

    # Extrair ID do vídeo do Youtube com base na URL
    music_id = form_data.url
    if "https://youtu.be/" == music_id[:17]:
        music_id = music_id[17:].split('?')[0]
    elif "https://www.youtube.com/watch?v=" == music_id[:32]:
        music_id = music_id[32:].split('&')[0]

    # Configurar download de .mp3
    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": "/app/data/%(title)s.%(ext)s",
        "postprocessors": [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "mp3",
            "preferredquality": "192",
        }],
    }
    # Extrair informações do vídeo e realizar download do .mp3
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([form_data.url])
        info = ydl.extract_info(form_data.url, download=False)
        music_data = dict(ydl.sanitize_info(info))

    # Registrar nova música no banco sqlite3
    conn = sqlite3.connect("/app/data/app.db")
    conn.execute(f"""
        INSERT INTO songs (id, title, description, duration_s, file_size, url, upload_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (
            music_id,
            music_data['title'],
            form_data.description,
            music_data['duration'],
            music_data['filesize'],
            form_data.url,
            str(datetime.now())
        )
    )
    conn.commit()

#--------------------------------------------
# SQL init
#--------------------------------------------

conn = sqlite3.connect("/app/data/app.db")

conn.execute("""
    CREATE TABLE IF NOT EXISTS songs (
        id        TEXT PRIMARY KEY,
        title     TEXT NOT NULL,
        description TEXT,
        duration_s INTEGER,
        file_size INTEGER,
        url TEXT,
        upload_date TEXT
    )
""")

# conn.execute("""
#     CREATE TABLE IF NOT EXISTS videos (
#         id        TEXT PRIMARY KEY,
#         title     TEXT NOT NULL,
#         duration_s INTEGER
#     )
# """)

# conn.execute("""
#     CREATE TABLE IF NOT EXISTS images (
#         id        TEXT PRIMARY KEY,
#         title     TEXT,
#         width     INTEGER,
#         height    INTEGER
#     )
# """)

conn.commit()
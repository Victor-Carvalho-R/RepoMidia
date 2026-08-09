from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

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

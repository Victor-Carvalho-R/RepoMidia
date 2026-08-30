FROM python:3-alpine AS build-image

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

RUN apk update && apk add ffmpeg

COPY . .

CMD ["fastapi", "run"]
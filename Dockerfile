FROM python:3-alpine AS build-image

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["fastapi", "run"]
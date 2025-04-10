FROM python:3.12-slim

# Install dependencies for Pillow and other requirements
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    zlib1g-dev \
    libjpeg-dev \
    libfreetype6-dev \
    liblcms2-dev \
    libopenjp2-7-dev \
    libwebp-dev \
    libtiff-dev \  
    libx11-dev \
    libharfbuzz-dev \
    libfribidi-dev \
    libxcb1-dev

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend /app
ENV SECRET_KEY=$SECRET_KEY
EXPOSE 8000
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]




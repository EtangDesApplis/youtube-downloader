FROM python:3.8-alpine

RUN pip install flask flask_cors
#install youtubedl
RUN wget https://yt-dl.org/latest/youtube-dl -O /usr/local/bin/youtube-dl
RUN chmod +x /usr/local/bin/youtube-dl

#back
COPY main.py /back/main.py

#janitord

EXPOSE 5000
RUN echo "python3 -u /back/main.py" > start.sh
CMD ["sh", "start.sh"]

FROM python:3.8-alpine

RUN pip install flask flask_cors
#install youtubedl
RUN wget https://yt-dl.org/latest/youtube-dl -O /usr/local/bin/youtube-dl
RUN chmod +x /usr/local/bin/youtube-dl

#back
COPY main.py /back/main.py

#janitord
COPY janitord.py /back/janitord.py

EXPOSE 5000
RUN echo "python -u /back/janitord.py /tmp case 300 &" > start.sh && \
    echo "python -u /back/main.py" >> start.sh
CMD ["sh", "start.sh"]

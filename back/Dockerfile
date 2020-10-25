FROM ubuntu:18.04

RUN apt-get update && \
    apt-get upgrade -y && \
    apt install python3 -y && \
    apt install python3-pip -y && \
    pip3 install flask flask_cors
#install youtubedl
RUN wget https://yt-dl.org/latest/youtube-dl -O /usr/local/bin/youtube-dl
RUN rm -rf /var/lib/apt/lists/*

#back
COPY main.py /back/main.py

#janitord

EXPOSE 5000
RUN echo "python3 -u /back/main.py" > start.sh
CMD ["sh", "start.sh"]

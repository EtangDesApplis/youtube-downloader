# youtube-downloader
#install tool to download youtube
sudo wget https://yt-dl.org/latest/youtube-dl -O /usr/local/bin/youtube-dl

#sample
youtube-dl --all-subs "https://www.youtube.com/watch?v=KYBok-XGsKM"

youtube-dl "https://www.youtube.com/watch?v=aVqtBaU2X6M" --merge-output-format mkv

ffmpeg -i ma-video.webm -c copy ma-video.mp4

# only sound
youtube-dl -x --audio-format mp3 "https://www.youtube.com/watch?v=aVqtBaU2X6M"

#https://doc.ubuntu-fr.org/youtube-dl

#quelques options
# Filesystem
--write-annotations
--write-description
--write-info-json

# Thumbnail images
--write-all-thumbnails

# Video format
--format bestvideo+bestaudio/best
--merge-output-format mkv

# Subtitle
--all-subs
--write-auto-sub
--write-sub

# Post-processing
--add-metadata
--embed-subs

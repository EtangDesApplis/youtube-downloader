from flask import Flask, request
from flask_cors import CORS
import time
import os
#import shutil
import glob
from subprocess import Popen, PIPE
from flask import send_from_directory

app = Flask(__name__)
CORS(app)

PRIVATE_FOLDER="/tmp"

def executeShell(cmd):
  #cmd is a list, e.g. ["ls","-lrt"]
  output = Popen(cmd,stdout=PIPE)
  response = output.communicate()
  print(response[0].decode('utf-8'))

@app.route('/<path:filePath>')
def get_file(filePath):
  #serve file from path
  fn=os.path.join(PRIVATE_FOLDER,filePath)
  return send_from_directory(os.path.dirname(fn), os.path.basename(fn), as_attachment=True)

@app.route('/', methods=['POST'])
def post_route():

    #print(request.method)
    try:
      data = request.get_json()
      print(data)

      #create epoch folder
      epoch=str(int(time.time()))
      workdir=os.path.join(PRIVATE_FOLDER,"case-"+epoch)
      print(workdir)
      os.makedirs(workdir)
      homedir=os.getcwd()

      os.chdir(workdir)
      if data["format"]=="mp3":
        executeShell(["youtube-dl","-x","--audio-format","mp3", data["url"]])
        executeShell(["mv",glob.glob('*')[0],"output.mp3"])
        outputfile=os.path.join(workdir,"output.mp3")
      else:
        executeShell(["youtube-dl",data["url"],"--merge-output-format","mkv"])
        executeShell(["mv",glob.glob('*')[0],"output.mkv"])
        outputfile=os.path.join(workdir,"output.mkv")
      #rename file out output.mp3/ output.mkv
      os.chdir(homedir)

      return {"Status":"OK","Output":outputfile.replace(PRIVATE_FOLDER,"")}
    except:
      return {"Status":"KO"}

if __name__=="__main__":
  
  app.run(host='0.0.0.0')


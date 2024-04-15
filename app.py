from flask import Flask, render_template
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
api_url = os.getenv("API_URL")

@app.route('/')
def index():
    return render_template('index.html', api_url=os.getenv("API_URL"))

if __name__ == '__main__':
    app.run(debug=True)

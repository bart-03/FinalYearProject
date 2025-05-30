from flask import Flask, jsonify
from flask_cors import CORS
from SignIn import signin
from PnuemoniaModel2 import PnuemoniaModel2
from PulmoneryEdema import PulmonaryEdema
from Tuberculosis import Tuberculosis
from openAI import OpenAI
from Reports import reports

app = Flask(__name__)
app.app_context().push()
CORS(app, origins=r".*")

if __name__ == '__main__':
    
    app.register_blueprint(signin)
    app.register_blueprint(PnuemoniaModel2)
    app.register_blueprint(PulmonaryEdema)
    app.register_blueprint(Tuberculosis)
    app.register_blueprint(OpenAI)
    app.register_blueprint(reports)
    
    
    app.run(debug=True,  port=8080)
    

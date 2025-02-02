from flask import Flask, jsonify
from flask_cors import CORS
from SignIn import signin
from PnuemoniaModel2 import PnuemoniaModel2
from PulmoneryEdema import PulmonaryEdema

app = Flask(__name__)
app.app_context().push()
CORS(app, origins=r".*")

if __name__ == '__main__':
    
    app.register_blueprint(signin)
    app.register_blueprint(PnuemoniaModel2)
    app.register_blueprint(PulmonaryEdema)
    app.run(debug=True,  port=8080)
    

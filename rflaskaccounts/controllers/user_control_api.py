import json

from flask import Blueprint, request, current_app, url_for

from flask_login import login_user
from flask_principal import identity_changed, Identity

from oauth2client import client

from ..controllers.model import User

user_control_api = Blueprint('user_control_api', __name__)

@user_control_api.route('/tokensignin', methods = ['POST'])
def validate_token():
    """
    Validate token from google
    """
    id_token = request.form['idtoken']
    idinfo = client.verify_id_token(id_token, current_app.config['GOOGLE_APP_ID'])
    user_id = idinfo['sub']
    email = idinfo['email']
    username = email
    validuser = False
    user = User(username)
    print email
    if user.is_anonymous() == True:
        error = 'Unregistered User'
        redirect = url_for('user_control.login')
    else:
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            error = 'Wrong client'
            redirect = url_for('user_control.login')
        else:
            login_user(user)
            identity_changed.send(current_app._get_current_object()
                                , identity=Identity(user.get_userid()))
            redirect = url_for('home.homepage')
            validuser = True 
            error = 'No error'
    print error
    return json.dumps({'redirect_url': redirect, 'validuser': validuser})

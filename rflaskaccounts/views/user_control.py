from flask import Blueprint,render_template,redirect,url_for,current_app,session
from flask_login import login_user,logout_user

from flask_principal import AnonymousIdentity, identity_changed

user_control = Blueprint('user_control',__name__)

@user_control.route('/login')
def login():
    return render_template('user_control/login.html')

@user_control.route('/logout')
def logout():
    logout_user()
    for key in ('identity.name', 'identity.auth_type'):
        session.pop(key, None)
    identity_changed.send(current_app._get_current_object(), identity=AnonymousIdentity())
    return redirect(url_for('.login'))

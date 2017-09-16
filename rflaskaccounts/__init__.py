from flask import Flask, g, current_app
from flask_login import LoginManager, login_required, current_user
from flask_principal import Principal, Permission, RoleNeed, identity_loaded
from flask_bower import Bower

from .views.user_control import user_control
from .views.home import home

from .controllers.user_control_api import user_control_api
from .controllers.model import User

app = Flask(__name__, instance_relative_config = True)
app.config.from_object('config')
app.config.from_pyfile('config.py')

#Register Blueprints
app.register_blueprint(home)
app.register_blueprint(user_control)

app.register_blueprint(user_control_api)

#Flask-login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "user_control.login"

#Flask-Principal
Bower(app)
Principal(app)

@app.context_processor
def inject_globals():
    if current_user.is_authenticated:
        return dict(username = current_user.username
                   , roles = current_user.role
                   , google_app_id = current_app.config['GOOGLE_APP_ID'])
    else:
        return dict(google_app_id=current_app.config['GOOGLE_APP_ID'])

#Special functions to request connection
@app.teardown_appcontext
def teardown_db(exception):
    mdb = getattr(g,'_mysql_database',None)
    if mdb is not None:
        mdb.close()

@login_manager.user_loader
def load_user(userid):
    username = str(userid)
    return User(username)

@identity_loaded.connect
def on_identity_loaded(sender, identity):
    identity.user = current_user
    if hasattr(current_user, 'role'):
        for role in current_user.get_userrole().split(','):
            identity.provides.add(RoleNeed(role))

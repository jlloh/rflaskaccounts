from flask import Blueprint, render_template
from flask_login import login_required

home = Blueprint('home', __name__)

@home.route('/')
@home.route('/home')
@login_required
def homepage():
	return render_template('/home/home.html')

from flask import Blueprint, render_template
from flask_login import login_required

summary = Blueprint('summary', __name__)

@summary.route('/summary')
@login_required
def homepage():
	return render_template('/summary/home.html')

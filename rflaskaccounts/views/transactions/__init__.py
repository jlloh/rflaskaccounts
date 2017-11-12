from flask import Blueprint, render_template
from flask_login import login_required

transactions = Blueprint('transactions', __name__)

@transactions.route('/transactions')
@login_required
def homepage():
	return render_template('/transactions/home.html')

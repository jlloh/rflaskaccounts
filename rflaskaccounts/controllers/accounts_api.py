import json

from flask import Blueprint

from flask_login import login_required

from ..controllers.model import get_db
from ..controllers.utils import get_results_from_cursor

accounts_api = Blueprint('accounts_api', __name__)

@accounts_api.route('/api/summary', methods = ['GET'])
@login_required
def get_accounts_summary():
    """
    Get payload of account summary
    """
    con = get_db()
    cur = con.cursor()
    query = """
    SELECT account as `Account Name`
         , group_concat(currency) as `Currency`
         , sum(total) as `Total`
      FROM (
    SELECT account
         , currency
         , sum(amount) as total
      FROM webapp.transactions
  GROUP BY account, currency
    HAVING sum(amount) != 0
  ORDER BY account asc
    ) raw_accounts
  GROUP BY account
    """
    print query
    results = get_results_from_cursor(cur, query)
    return json.dumps({'data': results})

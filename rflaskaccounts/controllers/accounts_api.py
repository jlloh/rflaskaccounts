import json

from flask import Blueprint, request

from flask_login import login_required

import datetime

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

@accounts_api.route('/api/transactions', methods = ['GET'])
@login_required
def get_account_transactions():
    """
    Get payload of account summary
    """
    con = get_db()
    cur = con.cursor()
    query = """
  select id
       , concat(year, '-', lpad(month, 2, '0'), '-', lpad(day, 2, '0')) as "date"
       , account
       , concat(amount, ' ', currency) as amount
       , description
    from transactions 
order by concat(year, lpad(month, 2, '0'), lpad(day, 2, '0')) desc, id desc 
   """
    print query
    results = get_results_from_cursor(cur, query)
    return json.dumps({'data': results})

@accounts_api.route('/api/addtransaction', methods = ['POST'])
@login_required
def add_account_transaction():
    """
    Get payload of account summary
    """
    con = get_db()
    cur = con.cursor()
    payload = json.loads(request.data)
    print 'payload', payload
    dateobject = datetime.datetime.strptime(payload['date'], '%Y-%m-%d')
    currency = get_currency(payload['account'])
    payload['year'] = dateobject.year
    payload['month'] = dateobject.month
    payload['day'] = dateobject.day
    payload['currency'] = currency
    query = """
    insert into webapp.transactions 
    (year, month, day, account, amount, currency, description)
    values 
    (%(year)s
   , %(month)s
   , %(day)s
   , %(account)s
   , %(amount)s
   , %(currency)s
   , %(description)s)
  """
    full_query = cur.mogrify(query, payload)
    print full_query
    cur.execute(full_query)
    con.commit()
    results = 'success'
    return json.dumps({'data': results})

def get_currency(account):
  if account == 'DBS SG':
    return 'SGD'
  if account == 'PREMIER':
    return 'GBP'
  return 'MYR'

@accounts_api.route('/api/accounts', methods = ['GET'])
@login_required
def get_accounts():
    """
    Get accounts
    """
    con = get_db()
    cur = con.cursor()
    query = """
  select distinct account 
    from webapp.transactions 
order by account asc
  """
    accounts = []
    cur.execute(query)
    for row in cur.fetchall():
      account_name, = row
      accounts.append(account_name)
    return json.dumps({'account_array': accounts})


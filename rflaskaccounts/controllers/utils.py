import datetime
from decimal import Decimal

def format_result(input):
    if type(input) == datetime.datetime:
        return str(input)
    if type(input) == float or type(input) == Decimal:
        return '%.2f'%input
    return input

def get_results_from_cursor(cur, finalquery, retrieve_array = []):
    cur.execute(finalquery)
    results = {}
    results['headers'] = [i[0] for i in cur.description]
    results['full_data'] = []
    extra_data = {}
    for row in cur.fetchall():
        dicta = {}
        for index, value in enumerate(row):
            column_name = results['headers'][index]
            dicta[column_name] = {'value': format_result(value)}
            if column_name in retrieve_array:
                extra_data.setdefault(column_name, []).append(format_result(value))
        results['full_data'].append(dicta)
    if retrieve_array == []:
        return results
    else:
        return results, extra_data
import React from 'react';
import ReactDOM from 'react-dom';

function DataTable(props) {
  //pass json object into function? headers, rows
  var Table = Reactable.Table;
  var Td = Reactable.Td;
  var Tr = Reactable.Tr;
  var PaginationLimit = 100;
  const dataArray = []
  if (props.data === null ) {
    return null
  }
  else {
    if (props.data.full_data.length <= PaginationLimit) {
      PaginationLimit = null;
    }
    for (let row of props.data.full_data) {
      var rowArray = [];
      const tdStyle = {'backgroundColor': 'green'}
      for (let colName of Object.keys(row)) {
        let tdStyle = {};
        tdStyle['backgroundColor'] = row[colName]['backgroundcolor']
        tdStyle['color'] = row[colName]['textcolor']
        let value = row[colName]['value'];
        let Cell = <Td column={colName} style={tdStyle}>{value}</Td>
        rowArray.push(Cell)
      }
      dataArray.push(<Tr>{rowArray}</Tr>)
    }
    let tablestyle = {display: 'none',}
    if (props.displayed === true) {
      tablestyle = {display: '',}
    }
    else {
      tablestyle = {display: 'none',}
    }
    return (
      <Table className="table table-bordered table-sm table-hover"
         columns={props.data.headers}
         sortable={true}
         style={tablestyle}
         itemsPerPage={PaginationLimit}
      >
      {dataArray}
      </Table>
    )
  }
}

export default DataTable;
import React, { Component, useState } from 'react';
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

import { NumberFormatter } from './NumberFormatter';
import { NumericCellEditor } from './NumericEditor';
import { RangeFilter } from './RangeFilter';

import { AddRowModal } from './addRowModal';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {headerName: 'Make', field: 'make'},
                {headerName: 'Model', field: 'model'},
                {
                    headerName: 'Price',
                    field: 'price',
                    editable: true,
                    cellRenderer: 'numberFormatter',
                    cellEditor: 'numericCellEditor',
                    filter: 'rangeFilter'
                }
            ],
            rowData:  [{make: 'Toyota', model:'sedan', price: '100000'},{
                make:'ford', model:'hackback', price: '80000'
            },
            {
                make:'tata', model:'hackback', price: '90000'
            }],
            frameworkComponents: {
                'numberFormatter': NumberFormatter,
                'numericCellEditor': NumericCellEditor,
                'rangeFilter': RangeFilter
            }
        }
    }

    handleStateUpdate =(values) =>{
        const rowData = [...this.state.rowData, ...values];
        this.setState({rowData: rowData});
        console.log(this.state);
    }

    render() {
       
        return (
            <div
                className="ag-theme-balham"
                style={{height: '200px', width: '600px'}}
            >
                <AddRowModal handleStateUpdate={this.handleStateUpdate}></AddRowModal>
                <AgGridReact
                    enableSorting={true}
                    enableFilter={true}
                    pagination={true}
                    columnDefs={this.state.columnDefs}
                    frameworkComponents={this.state.frameworkComponents}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        );
    }
}

export default App;
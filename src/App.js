import React, { Component, useState } from 'react';
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap'; 
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
                {headerName: 'Requester ID', editable: true, field: 'rqstr_id'},
                {headerName: 'DB Description', editable: true, field: 'db_type_desc'},
                {headerName: 'Source Name',field: 'src_sys_nm',editable: true},
                {headerName: 'Catalog',field: 'ctlg_nm',editable: true},
                {headerName: 'Schema',field: 'schma_nm',editable: true},
                {headerName: 'Source Table',field: 'src_tbl_nm',editable: true},
                {headerName: 'Column List Text',field: 'src_clmn_list_file_txt',editable: true},
                {headerName: 'Destination Object',field: 'destn_s3_obj_key',editable: true},
                {headerName: 'Destination S3 Bucket',field: 'destn_s3_bkt_nm',editable: true},
                {headerName: 'Destination Type Desc',field: 'destn_type_desc',editable: true},
            ],
            rowData:  [{
                rqstr_id: 'AG59563', 
                db_type_desc:'Hive', 
                src_sys_nm: 'mbr',
                ctlg_nm: 'AG59563', 
                schma_nm:'Schema3', 
                src_tbl_nm: 'Table 1',
                src_clmn_list_file_txt: 'NA', 
                destn_s3_obj_key:'NA', 
                destn_s3_bkt_nm: 'NA',
                destn_type_desc: 'S3'
            }, {
                rqstr_id: 'AG59563', 
                db_type_desc:'Hive', 
                src_sys_nm: 'prod',
                ctlg_nm: 'TeradataDBC', 
                schma_nm:'Schema2', 
                src_tbl_nm: 'Table 2',
                src_clmn_list_file_txt: 'NA', 
                destn_s3_obj_key:'NA', 
                destn_s3_bkt_nm: 'NA',
                destn_type_desc: 'hdfs'
            }, {
                rqstr_id: 'AG59563', 
                db_type_desc:'Teradata', 
                src_sys_nm: 'clm',
                ctlg_nm: 'Hive', 
                schma_nm:'Schema1', 
                src_tbl_nm: 'Table 3',
                src_clmn_list_file_txt: 'NA', 
                destn_s3_obj_key:'NA', 
                destn_s3_bkt_nm: 'NA',
                destn_type_desc: 'S3'
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
                style={{height: '400px', width: '100%'}}
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
                <div class="modal-footer">
                    <p class="mr-auto">
                        This gris is editable and we can edit here before generating csv. We can add metadata through Add Metada form and also we can add multiple records at once by providing comma seperated Source Table names.
                    </p>
                    {/* <button type="button" class="btn btn-primary mr-auto">Save changes</button> */}
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Generate CSV</button>
                </div>                            
            </div>
        );
    }
}

export default App;
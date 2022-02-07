import { Component, React, ReactDOM } from 'react';
import CityFetcher from '../fetchers/CityFetcher';
import CityModal from './CityModal';
import { DataGrid } from '@mui/x-data-grid';
import DatePicker from "react-datepicker";
import { Button, FormGroup, FormLabel, FormControl, Row, Col, Form } from 'react-bootstrap';

export default class CityList extends Component {
    constructor() {
        super();

        this.state = {
            cityList: [],
            showCityModal: false,
            city: {},
            fromDate: null,
            toDate: null,
            fromDate: null,
            toDate: null,
            rowsCount: 0,
            rowsState: {
                page: 0,
                pageSize: 10,
                rows: [],
                loading: false,
            },
            sortModel: []
        }


        this.onRowDoubleClicked = this.onRowDoubleClicked.bind(this);
        this.handleConfigModalClose = this.handleConfigModalClose.bind(this);
        this.getCityList = this.getCityList.bind(this);

        this.setFromDate = this.setFromDate.bind(this);
        this.setToDate = this.setToDate.bind(this);
        this.setPageSize = this.setPageSize.bind(this);
        this.setPage = this.setPage.bind(this);
        this.handleSortModelChange = this.handleSortModelChange.bind(this);
        this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
    }

    componentDidMount() {
        this.getCityList();
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    handleConfigModalClose() {
        this.getCityList();
    }

    onRowDoubleClicked(event) {
        this.setState({ showCityModal: true, city: event.row });
    }

    renderCityModal() {
        return <CityModal
            isShow={this.state.showCityModal}
            data={this.state.city}
            fnClose={this.handleConfigModalClose}>
        </CityModal>;
    }

    getCityList() {
        const { rowsState, fromDate, toDate, sortModel } = this.state;
        this.setState(prevState => ({
            rowsState: {
                ...prevState.rowsState,
                loading: true
            }
        }));
        let sortBy = null;
        let sortOrder = 'Asc'
        if (sortModel.length > 0) {
            sortBy = this.capitalizeFirstLetter(sortModel[0].field);
            sortOrder = this.capitalizeFirstLetter(sortModel[0].sort);

        }
        CityFetcher.fetchList(rowsState.page, rowsState.pageSize, fromDate, toDate, sortBy, sortOrder).then(respone => {
            this.setState(prevState => ({
                rowsState: {
                    ...prevState.rowsState,
                    rows: respone.data,
                    loading: false
                }
            }));
            this.setState({ showCityModal: false, rowsCount: rowsState.pageSize * respone.totalPage });
        })
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setPage(page) {
        this.setState(prevState => ({
            rowsState: {
                ...prevState.rowsState,
                page: page
            }
        }))
        this.getCityList();
    }

    setPageSize(pageSize) {
        this.setState(prevState => ({
            rowsState: {
                ...prevState.rowsState,
                pageSize: pageSize
            }
        }))
        this.getCityList();
    }

    setFromDate(date) {
        this.setState({ fromDate: date });
    }

    setToDate(date) {
        this.setState({ toDate: date });
    }

    handleSortModelChange(model) {
        this.setState({ sortModel: model });
        const { rowsState, fromDate, toDate, sortModel } = this.state;
        this.setState(prevState => ({
            rowsState: {
                ...prevState.rowsState,
                loading: true
            }
        }));
        let sortBy = null;
        let sortOrder = 'Asc'
        if (model.length > 0) {
            sortBy = this.capitalizeFirstLetter(model[0].field);
            sortOrder = this.capitalizeFirstLetter(model[0].sort);

        }
        CityFetcher.fetchList(rowsState.page, rowsState.pageSize, fromDate, toDate, sortBy, sortOrder).then(respone => {
            this.setState(prevState => ({
                rowsState: {
                    ...prevState.rowsState,
                    rows: respone.data,
                    loading: false
                }
            }));
            this.setState({ showCityModal: false, rowsCount: rowsState.pageSize * respone.totalPage });
        })
    }

    render() {
        const { rowsState, sortModel, rowsCount, fromDate, toDate } = this.state;
        const columns = [
            { field: 'id', headerName: 'ID', type: 'number', width: 130 },
            { field: 'name', headerName: 'Name', width: 200 },
            { field: 'price', headerName: 'Price', type: 'number', width: 130 },
            {
                field: 'startDate',
                headerName: 'Start Date',
                type: 'date',
                width: 200,
            },
            {
                field: 'endDate',
                headerName: 'End Date',
                type: 'date',
                width: 200,
            },
            { field: 'color', headerName: 'Color', width: 130 },
            { field: 'status', headerName: 'Status', width: 130 },
        ];
        return (
            <div>
                <Row>
                    <Col md={2}></Col>
                    <Col md={1}><FormLabel>From Date</FormLabel></Col>
                    <Col md={4}>
                        <DatePicker
                            selected={fromDate}
                            className='form-control'
                            dateFormat="dd-MM-yyyy"
                            placeholder="From Date"
                            onChange={(date) => this.setFromDate(date)}
                        />
                    </Col>
                    <Col md={1}>
                        <Button className='submit' onClick={this.getCityList}>Search</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}></Col>
                    <Col md={1}><FormLabel>To Date</FormLabel></Col>
                    <Col md={4}>
                        <DatePicker
                            selected={toDate}
                            className='form-control'
                            dateFormat="dd-MM-yyyy"
                            placeholder="To Date"
                            onChange={(date) => this.setToDate(date)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                        <div style={{ height: 700, width: '100%' }}>
                            <DataGrid
                                pageSize={rowsState.pageSize}
                                columns={columns}
                                pagination
                                rowCount={rowsCount}
                                {...rowsState}
                                paginationMode="server"
                                sortingMode="server"
                                sortModel={sortModel}
                                onSortModelChange={this.handleSortModelChange}
                                onRowDoubleClick={this.onRowDoubleClicked}
                                onPageChange={(page) => this.setPage(page)}
                                onPageSizeChange={(pageSize) => this.setPageSize(pageSize)
                                }
                            />
                        </div></Col>
                </Row>
                <Row>{this.renderCityModal()}</Row>
            </div>

        )
    }
}
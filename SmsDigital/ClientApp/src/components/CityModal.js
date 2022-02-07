import { Component, React } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import Select from 'react-select'
import DatePicker from "react-datepicker";

export default class CityModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data || null,
            isShow: props.isShow || false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleInputChange(type, event) {
        const { data } = this.state;
        const { value } = event.target;
        switch (type) {
            case 'name':
                data.name = value;
                break;
            case 'price':
                data.price = value;
                break;
            case 'startDate':
                data.startDate = value;
                break;
            case 'endDate':
                data.endDate = value;
                break;
            case 'status':
                data.description = value;
                break;
            case 'color':
                data.dataset = value;
                break;
        }
        this.setState({ data });
    }

    handleClose() {
        this.setState({ isShow: false });
    }

    render() {
        const { data, isShow, fnClose } = this.props;
        const options = [
            { label: "Never", value: "Never" },
            { label: "Once", value: "Once" },
            { label: "Seldom", value: "Seldom" },
            { label: "Often", value: "Often" },
            { label: "Yearly", value: 4 },
            { label: "Monthly", value: 5 },
            { label: "Weekly", value: 6 },
            { label: "Daily", value: 7 },
        ];

        if (isShow) {
        let startDate = new Date(data.startDate);
        let endDate = new Date(data.endDate);

        return (
            <Modal
                size="lg"
                show={isShow}
                onHide={() => fnClose()}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup controlId="datasetName">
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            type="text"
                            value={data.name || ''}
                            onChange={event => this.handleInputChange('name', event)}
                        />
                    </FormGroup>
                    <FormGroup controlId="datasetName">
                        <FormLabel>Price</FormLabel>
                        <FormControl
                            type="text"
                            value={data.price || ''}
                            onChange={event => this.handleInputChange('price', event)}
                        />
                    </FormGroup>
                    <FormGroup controlId="datasetName">
                        <FormLabel>Start Date</FormLabel>
                        <DatePicker
                            className='form-control'
                            selected={startDate || null}
                            dateFormat="dd-MM-yyyy"
                            onChange={event => this.handleInputChange('startDate', event)} //only when value has changed
                        />
                    </FormGroup>
                    <FormGroup controlId="datasetName">
                        <FormLabel>End Date</FormLabel>
                        <DatePicker
                            className='form-control'
                            selected={endDate || null}
                            dateFormat="dd-MM-yyyy"
                            onChange={event => this.handleInputChange('endDate', event)} //only when value has changed
                        />
                    </FormGroup>
                    <FormGroup controlId="datasetName">
                        <FormLabel>Status</FormLabel>
                        <Select
                            options={options}
                            value={data.status || ''}
                            onChange={event => this.handleInputChange('endDate', event)}
                        />
                    </FormGroup>
                    <FormGroup controlId="datasetName">
                        <FormLabel>Color</FormLabel>
                        <FormControl
                            type="text"
                            value={data.color || ''}
                            onChange={event => this.handleInputChange('color', event)}
                        />
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => fnClose()}>Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>);
        }
        return <div></div>;
    }
}
import moment from "moment";

export default class CityFetcher {
    static fetchList(pageNumber, pageSize, fromDate, toDate, orderBy, orderType) {
        let query = `?PageNumber=${pageNumber}&PageSize=${pageSize}`;
        if(fromDate) {
            query += `&FromDate=${moment(fromDate).format('MM-DD-YYYY')}`;
        }

        if(toDate) {
            query += `&ToDate=${moment(toDate).format('MM-DD-YYYY')}`;
        }

        if(orderBy) {
            query += `&OrderBy=${orderBy}`;
        }

        if(orderType) {
            query += `&OrderType=${orderType}`
        } else {
            query += '&OrderType=Asc';
        }       

        let promise = fetch(`/city${query}`, {
            credentials: 'same-origin',
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            return json;
        }).catch((errorMessage) => {
            console.log(errorMessage);
        });

        return promise;
    }

    static fetchById(params) {
        let promise = fetch(`/api/city/${params.id}`, {
            credentials: 'same-origin',
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            return json;
        }).catch((errorMessage) => {
            console.log(errorMessage);
        });

        return promise;
    }

    static create(params) {
        let promise = fetch(`/api/city/${params.id}`, {
            credentials: 'same-origin',
            method: 'POST'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            return json;
        }).catch((errorMessage) => {
            console.log(errorMessage);
        });

        return promise;
    }

    static update(params) {
        let promise = fetch(`/api/city/${params.id}`, {
            credentials: 'same-origin',
            method: 'PUT'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            return json;
        }).catch((errorMessage) => {
            console.log(errorMessage);
        });

        return promise;
    }

    static delete(params) {
        let promise = fetch(`/api/city/${params.id}`, {
            credentials: 'same-origin',
            method: 'DELETE'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            return json;
        }).catch((errorMessage) => {
            console.log(errorMessage);
        });

        return promise;
    }
}
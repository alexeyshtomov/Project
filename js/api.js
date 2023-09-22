const api = ({method = 'POST', url, params, callback}) => {
    fetch(url, {
        method, headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: params
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            for (let key in data) {
                if (data[key].err) {
                    throw new Error(`${data[key].err}: ${data[key].errMessage}`);
                }
            }
            callback(data);
        })
        .catch(error => {
            console.log(error.message)
        });
};

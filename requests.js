let baseUrl = 'http://37.27.12.100'
let token = ''

// post request

function postRequests(route, body, auth = true ) {
    if (auth) {
        return axios.post(`${baseUrl}/${route}`, body, {
            headers: {
                token: token
            }
        })
    } else {
        return axios.post(`${baseUrl}/${route}`, body)
    }
}

// get request

function getRequest(route, auth = true) {
    if (auth) {
        return axios.get(`${baseUrl}/${route}`, {
            headers: {
                token: token
            }
        })
    } else {
        return axios.get(`${baseUrl}/${route}`)
    }
}

// put request

function putRequests(route, body, auth = true) {
    if (auth) {
        return axios.put(`${baseUrl}/${route}`, body, {
            headers: {
                token: token
            }
        })
    } else {
        return axios.put(`${baseUrl}/${route}`, body)
    }
}

// delete request

function deleteRequest(route, body, auth = true) {
    if (auth) {
        return axios.delete(`${baseUrl}/${route}`, body, {
            headers: {
                token: token
            }
        })
    } else {
        return axios.delete(`${baseUrl}/${route}`, body)
    }
}

window.addEventListener('load', () => {
    // getRequest('', false).then(() => {
    //     console.log('index route get ok');

    // })
    
    
    postRequests('user/register', {
        name: "mohamad",
        mobile: "1236566",
        password: "1234",
        email: "test3@gmail.com",
        address: "any test addres",
        // code_meli : 125534
    }, false).then(data => {

        console.log(data)
    })
    
    // axios.get(baseUrl).then((response)=>{
    //     console.log(response)
    // }).catch((err)=>{
    //     console.log(err)
    // })
})





















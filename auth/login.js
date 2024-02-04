const loginBtn = document.querySelector('#login-submit')


loginBtn.addEventListener('click', function (e) {
    e.preventDefault()
    const emailAddress = document.querySelector('#email-address').value
    const password = document.querySelector('#password').value
    const alertBox = document.getElementById('alert-box')
    const loginForm  = document.querySelector('#login-form')

    if (emailAddress == '' || emailAddress == null || password == '' || password == null) {
        alertBox.innerHTML = "لطفا مقادیر را به صورت کامل وارد کنید"
        alertBox.classList.add('alert-danger')
    } else {
        const formData = {
            email: emailAddress,
            password: password
        }

        axios.post("http://192.168.0.2:3000/auth/login", formData)
        .then((response) => {

            console.log(response)
            if (response.status === 200) {
                console.log(response.data)
                alertBox.innerHTML = "شما با موفقیت وارد حساب کاربری خود شدید"
                alertBox.classList.add("alert-success")
                loginForm.reset()
                let token = response.data.token
                function setCookie(cname, cvalue, exdays) {
                    const d = new Date();
                    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                    let expires = "expires=" + d.toUTCString();
                    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                }
                setCookie("igbotTokenCookie", token, 1)
                axios.get("http://192.168.0.2:3000/dashboard")
                // setTimeout(()=>{
                //     window.location.href = "../index.html";
                // }, 3000)
            }

        })
        .catch(error => {

            console.log(error)
            if (error.response) {
                console.error('خطای HTTP:', error.response.status, error.response.data);

                // console.log(error.response.status)
                if(error.response.status == 404){
                    alertBox.innerHTML = "لطفا ابتدا اقدام به ساخت یک حساب کاربری نمایید"
                    alertBox.classList.add("alert-danger")
                    loginForm.reset()
                }else if(error.response.status == 403){
                    alertBox.innerHTML = "رمز عبور یا نام کاربری اشتباه می باشد"
                    alertBox.classList.add("alert-danger")
                    loginForm.reset()
                }

            } else if (error.request) {
                console.error('خطای شبکه:', error.request , error.response , error.response.status);
                alert("ورود با موفقیت انجام نشد لطفا دوباره امتحان کنید")
                // if(error.response.status == 403 || error.response.status){

                // }
            } else {
                console.error('خطا:', error.message);
                alert("ورود با موفقیت انجام نشد لطفا دوباره امتحان کنید")
            }
        });
    }
})


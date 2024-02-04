/////////////////////////////////login form
let loginForm = document.querySelector('#login-form')
// console.log(loginForm)
let alertLogin = document.querySelector('#alert-login')

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let phoneNumber = document.querySelector('#login-phone').value
    let pass = document.querySelector('#password-login').value
    if (phoneNumber == "" || phoneNumber == null || pass == "" || pass == null) {
        alert("لطفا اطلاعات را به صورت کامل وارد نمایدد")
    } else {
        const formData = {
            mobile: phoneNumber,
            password: pass
        }

        axios.post("http://37.27.12.100/api/user/login", formData)
            .then((response) => {

                console.log(response)
                if (response.status === 200) {
                    alertLogin.innerHTML = "شما با موفقیت وارد حساب کاربری خود شدید"
                        alertLogin.classList.add("alert-success")
                        loginForm.reset()
                    let token = response.data.message.token
                    function setCookie(cname, cvalue, exdays) {
                        const d = new Date();
                        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                        let expires = "expires=" + d.toUTCString();
                        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                    }
                    setCookie("igbotTokenCookie", token, 1)

                    setTimeout(()=>{
                        window.location.href = "../index.html";
                    }, 3000)
                }

            })
            .catch(error => {
                if (error.response) {
                    console.error('خطای HTTP:', error.response.status, error.response.data);

                    // console.log(error.response.status)
                    if(error.response.status == 404){
                        alertLogin.innerHTML = "لطفا ابتدا اقدام به ساخت یک حساب کاربری نمایید"
                        alertLogin.classList.add("alert-danger")
                        loginForm.reset()
                    }

                } else if (error.request) {
                    console.error('خطای شبکه:', error.request , error.response);
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
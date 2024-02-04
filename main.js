let registerForm = document.querySelector("#register-form")
let alertBox = document.querySelector("#alert-box")


registerForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let name = document.querySelector('#register-name').value
  let igUsername = document.querySelector('#register_ig_id').value
  let phone = document.querySelector('#register_phone').value
  let password = document.querySelector('#password-register').value

  // console.log(name , igUsername , phone)

  const formData = {
    name: name,
    ig_username: igUsername,
    mobile: phone,
    password : password
  }
  if (name == "" || name == null || igUsername == "" || igUsername == null || phone == null || phone == "" || password == "" || password == null) {
    alert("لطفا اطلاعات خود را به صورت کامل و به درستی وارد کنید")
  } else {
    axios.post("http://37.27.12.100/api/user/register", formData)
      .then((response) => {

        if (response.data.code == 200 || response.data.code == 201 && response.data.message.token != "") {
          console.log(response);
          alertBox.innerHTML = "حساب کاربری شما با موفقیت ایجاد لطفا به حساب کاربری خود وارد شوید"
          alertBox.classList.add("alert-success")
          registerForm.reset()
          let token = response.data.message.token
          function setCookie(cname,cvalue,exdays) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
          }
          setCookie("igbotTokenCookie" , token , 1)
        }


      })
      .catch(error => {
        if (error.response) {
          console.error('خطای HTTP:', error.response.status, error.response.data);

          if (error.response.data.message.name == "SequelizeUniqueConstraintError" && error.response.data.code) {
            alertBox.innerHTML = "شما قبلا ثبت نام کرده اید لطفا به حساب کاربری خود وارد شوید"
            alertBox.classList.add("alert-danger")
          }


        } else if (error.request) {
          console.error('خطای شبکه:', error.request);
          alert("ثبت نام با موفقیت انجام نشد")
        } else {
          console.error('خطا:', error.message);
          alert("ثبت نام با موفقیت انجام نشد")
        }
      });
  }

})



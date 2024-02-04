const registerBtn = document.querySelector('#register-btn')


registerBtn.addEventListener('click', function (e) {
  e.preventDefault()

  const userName = document.querySelector('#name').value
  // const phoneNumber = document.querySelector('#phone-number').value
  const password = document.querySelector('#password').value
  const repeatPassword = document.querySelector('#repeat-password').value
  const email = document.querySelector('#email').value
  const alertBox = document.querySelector('#alert-box')
  const registerForm = document.querySelector('#register-form')


  if (password !== repeatPassword) {
    alertBox.innerHTML = "رمز عبور با تکرار رمز عبور برابر نیست"
    alertBox.classList.add('alert-danger')
  } else if (userName == '' || userName == null || repeatPassword == '' || repeatPassword == null || email == '' || email == null) {
    alertBox.innerHTML = "لطفا مقادیر را به صورت کامل وارد کنید"
    alertBox.classList.add('alert-danger')
  } else {
    const formData = {
      name: userName,
      email: email,
      password: password
    }

    axios.post("http://192.168.0.2:3000/auth/register", formData).then((response) => {
      console.log(response.data);
      if (response.data.code == 200 || response.data.code == 201 ) {
        console.log(response);
        alertBox.innerHTML = "حساب کاربری شما با موفقیت ایجاد شد لطفا به حساب کاربری خود وارد شوید"
        alertBox.classList.add("alert-success")
        registerForm.reset()
        let token = response.data.message.token
        window.location.href = 'index.html'
        function setCookie(cname, cvalue, exdays) {
          const d = new Date();
          d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
          let expires = "expires=" + d.toUTCString();
          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        setCookie("igbotTokenCookie", token, 30)
      }

    }).catch(error => {
      if (error.response) {
        console.error('خطای HTTP:', error.response.status, error.response.data);

        if (error.response.data.message.name == "SequelizeUniqueConstraintError" && error.response.data.code) {
          alertBox.innerHTML = "شما قبلا ثبت نام کرده اید لطفا به حساب کاربری خود وارد شوید"
          alertBox.classList.add("alert-danger")
        }


      } else {
        console.log(error)
      }
    });
  }

})



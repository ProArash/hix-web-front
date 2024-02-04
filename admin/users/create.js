const submitBtn = document.querySelector('#submit-btn')

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const name = document.querySelector('#name').value
    const phoneNumber = document.querySelector('#phone-number').value
    const instagramId = document.querySelector('#instagram-id').value
    const password = document.querySelector('#password').value
    const registerForm = document.querySelector('#create-user-form').value

    if (name == '' || name == null || phoneNumber == '' || phoneNumber == null || instagramId == '' || instagramId == null || password == '' || password == null) {
        alert("لطفا مقادیر را کامل وارد نمایید")
    } else {
        const formData = {
            name: name,
            ig_username: instagramId,
            mobile: phoneNumber,
            password: password
        }

        axios.post("http://192.168.0.2:3000/user/register", formData).then((response) => {

        if (response.data.code == 200 || response.data.code == 201 ) {
          console.log(response);
          alert("کاربر با موفقیت ایجاد شد")
          registerForm.reset()
        }
  
      })
      .catch(error => {
        if (error.response) {
          console.error('خطای HTTP:', error.response.status, error.response.data);
  
          if (error.response.data.message.name == "SequelizeUniqueConstraintError" && error.response.data.code) {
            alert("شخصی با این  شماره تلفن قبلا ثبت نام کرده است")
          }
        } else {
          console.log(error)
        }
      });

    }


})
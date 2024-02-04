let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODMyNDMxMCIsImlhdCI6MTcwNDI2OTQ2OSwiZXhwIjoxNzA1NDc5MDY5fQ.AS6RMFjCXNODW6imGlmauqGMCYpEOsagxxmiG6Kws28"


axios.get("http://37.27.12.100/admin", {
    headers: {
        token: token
    }
}).then((response) => {


    // show all users
    let users = response.data.message

    for (var i = 0; i < users.length; i++) {


        // make users td
        let usr = users[i];
        let tr = document.createElement('tr')
        let tdRowNum = document.createElement('td')
        let tdName = document.createElement('td')
        let tdInstaId = document.createElement('td')
        let tdPhone = document.createElement('td')
        let tdUserType = document.createElement('td')
        let tdUserplan = document.createElement('td')
        let tdUserstatus = document.createElement('td')
        let tdPass = document.createElement('td')


        let tdSetting = document.createElement('td')
        tdSetting.classList.add("width-16-rem", "text-left")

        let editBtn = document.createElement('a')
        editBtn.classList.add("my-btn", "btn", "btn-primary", "btn-sm")
        editBtn.innerHTML = "ویرایش"
        editBtn.setAttribute("data-toggle" , "modal")
        editBtn.setAttribute("data-target" , `#modal-${usr.mobile}`)


        let productBtn = document.createElement('a')
        productBtn.classList.add("my-btn", "btn", "btn-success", "btn-sm")
        productBtn.innerHTML = "محصولات"


        let changeStatus = document.createElement('button')
        changeStatus.classList.add("my-btn", "btn", "btn-danger", "btn-sm", "statusBtn")
        changeStatus.innerHTML = "تغییر وضعیت"
        changeStatus.setAttribute("id", "statusBtn")

        tdSetting.appendChild(editBtn)
        tdSetting.appendChild(productBtn)
        tdSetting.appendChild(changeStatus)


        let nameInput = document.createElement("input")
        nameInput.value = usr.name

        let instagramIdInput = document.createElement("input")
        instagramIdInput.value = usr.ig_username

        let passInput = document.createElement("input")
        passInput.type = "password"

        tdPass.appendChild(passInput)



        // enter user information
        tdRowNum.innerHTML = i + 1;
        tdName.appendChild(nameInput)
        tdInstaId.appendChild(instagramIdInput)
        tdPhone.innerHTML = usr.mobile
        tdUserType.innerHTML = usr.is_admin == 1 ? "ادمین" : "کاربر"
        tdUserstatus.innerHTML = usr.status == 1 ? "فعال" : "غیر فعال"
        tdUserplan.innerHTML = "پلن پایه"

        tr.appendChild(tdRowNum)
        tr.appendChild(tdName)
        tr.appendChild(tdInstaId)
        tr.appendChild(tdPhone)
        tr.appendChild(tdUserType)
        tr.appendChild(tdUserplan)
        tr.appendChild(tdUserstatus)
        tr.appendChild(tdPass)
        tr.appendChild(tdSetting)

        let userTable = document.querySelector('#users-table')

        userTable.appendChild(tr)


        // change status user

        // var changeStatusBtn = document.querySelector("#statusBtn")


        changeStatus.addEventListener("click" , ()=>{
            // alert("hi")

            const formData = {
                mobile : usr.mobile,
                status : usr.status
            }

            axios.post("http://37.27.12.100/admin/change_status" , formData , {
                headers : {
                    token : token
                }
            }).then((response)=>{
                console.log(response)
                location.reload()
            }).catch((err)=>{
                console.log(err)
            })
        })



       



    //    update users info

    editBtn.addEventListener('click' , (e)=>{
        e.preventDefault()

        const formData = {
            name : nameInput.value,
            ig_username :  instagramIdInput.value ,
            mobile : usr.mobile,
            password : passInput.value
        }


        axios.put("http://37.27.12.100/admin" , formData , {
            headers: {
                token : token
            }
        }).then((response)=>{
            alert("کاربر با موفقیت ویرایش شد")
        }).catch((err)=>{
            console.log(err)
        })
    })







    }
}).catch((e)=>{
    console.log(e)
})














let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODMyNDMxMCIsImlhdCI6MTcwNDI2OTQ2OSwiZXhwIjoxNzA1NDc5MDY5fQ.AS6RMFjCXNODW6imGlmauqGMCYpEOsagxxmiG6Kws28"

console.log("hello")
axios.get("http://37.27.12.100/plan", {
    headers: {
        token: token
    }

}).then((response) => {

    for (var i = 0; i < response.data.message.length; i++) {

        let plan = response.data.message[i]


        // make plan td
        let tr = document.createElement('tr')
        let tdRowNum = document.createElement('td')
        let tdTitle = document.createElement('td')
        let tdPrice = document.createElement('td')
        let tdDay = document.createElement('td')
        let tdsales = document.createElement('td')
        let tdUserstatus = document.createElement('td')


        tdRowNum.innerHTML = i + 1

        // title input
        let titleInput = document.createElement('input')
        titleInput.value = plan.title
        tdTitle.appendChild(titleInput)

        // price input
        let priceInput = document.createElement('input')
        priceInput.value = plan.price
        tdPrice.appendChild(priceInput)

        //day input
        let dayInput = document.createElement("input")
        dayInput.value = plan.days
        tdDay.appendChild(dayInput)

        // salses
        tdsales.innerHTML = plan.sold_count

        // status
        tdUserstatus.innerHTML = plan.status == 1 ? "فعال" : "غیر فعال"

        let tdSetting = document.createElement("td")

        // edit button
        let editBtn = document.createElement("button")
        editBtn.innerHTML = "ویرایش"
        editBtn.classList.add("my-btn", "btn", "btn-primary")

        // edit button
        let usersBtn = document.createElement("button")
        usersBtn.innerHTML = "کاربران"
        usersBtn.classList.add("my-btn", "btn", "btn-success")

        // change status button
        let statusBtn = document.createElement("button")
        statusBtn.innerHTML = "تغییر وضعیت"
        statusBtn.classList.add("my-btn", "btn", "btn-danger")

        tdSetting.appendChild(editBtn)
        tdSetting.appendChild(usersBtn)
        tdSetting.appendChild(statusBtn)
        tdSetting.classList.add("width-16-rem", "text-left")


        tr.appendChild(tdRowNum)
        tr.appendChild(tdTitle)
        tr.appendChild(tdPrice)
        tr.appendChild(tdDay)
        tr.appendChild(tdsales)
        tr.appendChild(tdUserstatus)
        tr.appendChild(tdSetting)

        const planTable = document.querySelector("#plan-table")

        planTable.appendChild(tr)



        // change plan status

        statusBtn.addEventListener('click', (e) => {
            e.preventDefault()
            if (plan.status == 1) {
                const formData = {
                    title: plan.title,
                    days: plan.days,
                    price: plan.price,
                    status: 0,
                }

                axios.put("http://37.27.12.100/plan", formData, {
                    headers: {
                        token: token
                    }
                }).then((response) => {
                    // console.log(response)
                    // alert(plan.status)
                    location.reload()
                }).catch((err) => {
                    console.log(err)
                })
                // alert(plan.status)
            } else {
                const formData = {
                    title: plan.title,
                    days: plan.days,
                    price: plan.price,
                    status: 1,
                }

                axios.put("http://37.27.12.100/plan", formData, {
                    headers: {
                        token: token
                    }
                }).then((response) => {
                    // console.log(response)
                    // alert(plan.status)
                    location.reload()
                }).catch((err) => {
                    console.log(err)
                })
            }
        })




        // update plan information


        editBtn.addEventListener("click" , (e)=>{
            e.preventDefault()

            // alert("hello")
            const formData = {
                title : titleInput.value,
                days : dayInput.value,
                price : priceInput.value,
                status : plan.status
            }

            axios.put("http://37.27.12.100/plan", formData, {
                headers: {
                    token: token
                }
            }).then((response)=>{
                alert("پلن با موفقیت ویرایش شد")
                console.log(response)
            }).catch((err)=>{
                console.log(err)
            })

            // console.log(formData)
        })



    }






    console.log(response)
}).catch((err) => {
    console.log(err)
});
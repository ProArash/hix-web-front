const submitBtn = document.querySelector("#submit-btn")

submitBtn.addEventListener("click" , (e)=>{

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODMyNDMxMCIsImlhdCI6MTcwNDI2OTQ2OSwiZXhwIjoxNzA1NDc5MDY5fQ.AS6RMFjCXNODW6imGlmauqGMCYpEOsagxxmiG6Kws28"
    e.preventDefault();

    // get the elements
    let title = document.querySelector("#title").value
    let price = document.querySelector("#price").value
    let days = document.querySelector("#days").value
    let caption = document.querySelector("#caption").value

    let planForm = document.querySelector('#create-form')


    if(title == '' || title == null || price == "" || price == null || days == '' || days == null){
        alert("همه مقادیر را به صورن کامل وارد نمایید")
    }else{
        const formData = {
        title : title,
        price : price,
        days : days,
        caption : caption
    }


    axios.post("http://37.27.12.100/plan/plan" , formData , {
        headers : {
            token : token
        }
    }).then((response) => {
        // console.log(response)
        if(response.data.code == 201){
            alert("پلن جدید ایجاد شد")
            planForm.reset()
        }
    }).catch((err) => {
        console.log(err)
    });
    }

})
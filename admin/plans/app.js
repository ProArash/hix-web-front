const addFeatureBtn = document.querySelector('#add-feature')
const featuresBox = document.querySelector('#features-box')


function addNewFeature(e){
    e.preventDefault()
    let newRow = document.createElement('div')
    newRow.classList.add('row')
    newRow.classList.add('mt-4')

    let col5 = document.createElement('div')
    col5.classList.add('col-lg-5')

    let formGroup = document.createElement('div')
    formGroup.classList.add('form-group')

    let newInput = document.createElement('input')
    newInput.classList.add('form-control')
    newInput.classList.add('form-control-sm')
    newInput.placeholder = "افزودن ویژگی جدید"

    let deleteBtnDiv = document.createElement('div')
    deleteBtnDiv.classList.add('col-lg-1')

    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('btn')
    deleteBtn.classList.add('btn-danger')
    deleteBtn.innerHTML = "حذف"

    featuresBox.appendChild(newRow)
    newRow.appendChild(col5)
    col5.appendChild(formGroup)
    formGroup.appendChild(newInput)
    
    deleteBtnDiv.appendChild(deleteBtn)
    newRow.appendChild(deleteBtnDiv)

    deleteBtn.addEventListener('click' , ()=>{
        newRow.remove()
    })


}


addFeatureBtn.addEventListener('click' , addNewFeature)




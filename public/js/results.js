console.log('Hi!')

var finalParams = JSON.parse($('#finalParams').text())

console.log(finalParams)

for (key in finalParams){
    //don't log school_size1
    if(key === "school_size1"){
        continue
    }
    console.log(key)
    sessionStorage.setItem(key, finalParams[key])

    if(finalParams[key]){
        console.log(`${key}_indicator`)
        $(`#${key}_indicator`).addClass('searched')
    }
}



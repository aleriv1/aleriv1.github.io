let arr = [1, 0, 0, 1, 0, 1, 0, 0, 1, 1]
function f_test() {
  
  const header = document.querySelector(".header")
  header.style.display = "flex"
  header.style.flexWrap = "wrap"
  
  
  for (i = 0; i < arr.length; i++) {
    const test = document.createElement("div")
    test.style.width = "100px"
    test.style.height = "100px"
    
    test.style.background = (arr[i] == 0) ? "red" : "green"
    header.appendChild(test)
    // test.style.display = "inline-block"
  }
  
}

// f_test()
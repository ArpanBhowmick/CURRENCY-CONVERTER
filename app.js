const base_URL = "https://api.frankfurter.dev/v1/latest?"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");




// for (let code in countryList) {
    // console.log(code)        //code is each key in the object.
    //console.log(`${code} => ${countryList[code]}`);
    // console.log(countryList[code])           //countryList[code] means “get the value stored at that key”.
// }



// Fill dropdowns and set default selections

for(let select of dropdowns) {
    for(let curCode in countryList) {
        let option = document.createElement("option");
        option.innerText = curCode;
        option.value = curCode;

        // Set default selections

        if (select.name === "from" && curCode === "USD") {
            option.selected = true;
        }
        if (select.name === "to" && curCode === "INR") {
            option.selected = true;
        }

        select.append(option)
        // console.log(select.textContent)
       
    }

    select.addEventListener("change", () =>{
        updateFlag(select)
    })

}

const updateFlag = (select) => {

    // 1. Get selected currency code (e.g., "USD")
    const selectedcurrency = select.value;

    // 2. Find its country code (e.g., "US")
    const countryCode = countryList[selectedcurrency]

    // 3. Find the <img> tag next to the dropdown
    let img = select.parentElement.querySelector("img");

     // 4. Update flag image using the API
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`
}



// Convert currency when button is clicked


btn.addEventListener("click" , (evt) => {
    evt.preventDefault();

    const Amount = document.querySelector(".Amount input")
    const amountValue = parseFloat(Amount.value); // value in amount
   

    if (!amountValue || amountValue <= 0) {
        alert("Enter a valid amount");
        return;
    }
   
    const from = document.querySelector(".from select").value
    const to = document.querySelector(".to select").value
    // console.log(from, to)


    const URL  = `${base_URL}amount=${amountValue}&from=${from}&to=${to}`


    fetch(URL)
    .then(res => res.json())
    .then(data => {
        // console.log(data.rates[to])
        const converted = data.rates[to];
        msg.innerText = `${amountValue} ${from} = ${converted} ${to}`
    })
});






















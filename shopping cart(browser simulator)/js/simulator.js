simulateShoppingCart()

function simulateShoppingCart() {
    
    let isCheckedOut = false
    const promptMessage = "Enter request"
    let shopCart = new ShoppingCart()
    shopCart.new(pricingRules)

    while (!isCheckedOut) {
        let userRequest = prompt(promptMessage)
        console.log("> " + userRequest)

        if (userRequest.match(/checkout/i)) {
            isCheckedOut = true
            const totalAmount = shopCart.total()
            const checkoutItems = shopCart.items()

            console.log("-------------")
            console.log("Total: $" + totalAmount)
            console.log("Items in cart:")
            checkoutItems.forEach((e) => console.log("\t" + e.quantity + " x " + e.productName))
        } else {
            //Sample: ADD 1GB I<3AMAYSIM
            const input = userRequest.split(" ")
            const requestType = input[0]
            const promoCode = input[2]
            let itemIndex = pricingRules.findIndex(obj => obj.productName == (input[1]))
            if (requestType.match(/add/i) && itemIndex >=0) {
                const item = pricingRules[itemIndex]
                shopCart.add(item, promoCode)
            }

        }
    }
}
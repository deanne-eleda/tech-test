class CartItem {
    constructor(
        productCode,
        productName,
        months,
        quantity,
        regularPrice,
        applyPromo,
        totalSales,
        addParameters,
    ) {
        this.productCode = productCode,
            this.productName = productName,
            this.months = months,
            this.quantity = quantity,
            this.regularPrice = regularPrice,
            this.applyPromo = applyPromo,
            this.totalSales = totalSales,
            this.addParameters = addParameters
    }

    //update quantity and total
    update(isFree = false) {
        this.quantity++
        if (!isFree) {
            if (this.applyPromo != null) {
                this.totalSales = this.applyPromo(this)
            } else {
                this.totalSales += this.regularPrice
            }
        }
    }
}

class ShoppingCart {
    constructor() {
        this.cartItems = []
        this.promoCodes = []
    }

    //create an initial list with 0 items
    new(priceRules) {
        priceRules.forEach(e => {
            let p = new CartItem(
                e.productCode,
                e.productName,
                1,
                0,
                e.regularPrice,
                e.applyPromo,
                0,
                e.addParameters
            )
            this.cartItems.push(p)
        });
    }

    //add item in cart and apply promo code
    add(item, promoCode = "") {
        let itemIdx = this.cartItems.findIndex(obj => obj.productCode == item.productCode)
        const cartItem = this.cartItems[itemIdx]
        if (itemIdx >= 0) {
            cartItem.update()
        }

        if (cartItem.addParameters != null) {
            const freeProductCode = cartItem.addParameters.freeProductCode
            if (freeProductCode != null && freeProductCode.length > 0) {
                let freeItemIdx = this.cartItems.findIndex(obj => obj.productCode == freeProductCode)
                const freeItem = this.cartItems[freeItemIdx]
                if (freeItemIdx >= 0) {
                    freeItem.update(true)
                }
            }
        }

        let promoIdx = this.promoCodes.findIndex(obj => obj == promoCode)
        if (promoIdx < 0 && promoCode != "") {
            this.promoCodes.push(promoCode)
        }
    }

    //get total amount for items added in cart
    total() {
        let total = 0, newTotal = 0
        this.cartItems.forEach(e => total += e.totalSales)

        if (this.promoCodes.length > 0) {
            this.promoCodes.forEach(e => {
                const idx = promoList.findIndex(obj => obj.code == e)
                if (idx >= 0) {
                    const percentDiscount = promoList[idx].parameters.percentDiscount
                    newTotal = promoList[idx].applyPromo(total, percentDiscount)
                    total = newTotal
                }
            })

        }
        return total.toFixed(2)
    }

    //get all the items in cart
    items() {
        const items = this.cartItems.filter(e => e.quantity != 0)
        return items
    }
}
function applyXforYDeal(item) {
    const regularPrice = item.regularPrice
    const promoPrice = item.addParameters.promoPrice
    const minimumOrder = item.addParameters.minXOrder
    const payableOrder = item.addParameters.payYOrder
    let orderCount = item.quantity
    let subTotalPrice = 0

    if (item.months == 1) {
        //get subtotal for promo purchase
        const noOfPromoPurchased = (orderCount / minimumOrder >> 0)
        subTotalPrice = noOfPromoPurchased * (payableOrder * promoPrice)

        //get subtotal for excess order
        const excessOrder = orderCount % minimumOrder
        orderCount = excessOrder
    }

    subTotalPrice += orderCount * regularPrice
    return subTotalPrice
}

function applyBulkOffer(item) {
    const regularPrice = item.regularPrice
    const promoPrice = item.addParameters.promoPrice
    const minimumOrder = item.addParameters.minOrder
    let orderCount = item.quantity
    let subTotalPrice = 0

    if (orderCount > minimumOrder && item.months == 1) {
        subTotalPrice = orderCount * promoPrice
    } else {
        subTotalPrice = orderCount * regularPrice
    }

    return subTotalPrice
}

function getDiscount(total, discount) {
    return total * (100 - discount)/100
 }
const pricingRules = [
    {
        productCode: "ult_small",
        productName: "Unli-1GB",
        regularPrice: 24.90,
        applyPromo: applyXforYDeal,
        addParameters: {
            promoPrice: 24.9,
            minXOrder: 3,
            payYOrder: 2,
        },
    },
    {
        productCode: "ult_medium",
        productName: "Unli-2GB",
        regularPrice: 29.90,
        addParameters: {
            freeProductCode: ["1gb"],
        }
    },
    {
        productCode: "ult_large",
        productName: "Unli-5GB",
        regularPrice: 44.90,
        applyPromo: applyBulkOffer,
        addParameters: {
            promoPrice: 39.9,
            minOrder: 3,
        }
    },
    {
        productCode: "1gb",
        productName: "Data-1GB",
        regularPrice: 9.90,
    },
];

const promoList = [
    {
        code: "I<3AMAYSIM",
        applyPromo : getDiscount,
        parameters: {
            percentDiscount: 10,
        }
    }
];
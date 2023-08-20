const data = require('./data')
const ShoppingCart = require('./interface')

const mockGetInterface = jest.fn();
const mockGetInterfaceAdd = jest.fn();
const mockGetInterfaceTotal = jest.fn();
const mockGetInterfaceItems = jest.fn();

jest.mock('./interface.js', () => {
    return jest.fn().mockImplementation(() => {
        return {
            new: mockGetInterface,
            add: mockGetInterfaceAdd,
            total: mockGetInterfaceTotal,
            items: mockGetInterfaceItems,
        };
    });
});

const mockGetData = jest.fn();
jest.mock('./data.js', () => {
    return jest.fn().mockImplementation(() => {
        return { getPriceRules: mockGetData };
    });
});

afterEach(() => {
    jest.clearAllMocks();
  });

describe('Shop Interface', () => {
    test("Scenario 1 - should get correct total amount and items", () => {
        const returnItems = [
            {
                productName: "Unli-1GB",
                quantity: 3,
    
            },
            {
                productName: "Unli-5GB",
                quantity: 1,
            },];
        mockGetInterfaceTotal.mockReturnValue(94.70)
        mockGetInterfaceItems.mockReturnValue(returnItems)

        let pricingRules = data.pricingRules
        const item1 = mockGetData[0]
        const item2 = mockGetData[2]
        const shopCart = new ShoppingCart()
        shopCart.new(pricingRules)
        shopCart.add(item1)
        shopCart.add(item1)
        shopCart.add(item1)
        shopCart.add(item2)
        const total = shopCart.total()
        const cartItems = shopCart.items()

        expect(shopCart.new).toHaveBeenCalledTimes(1);
        expect(shopCart.add).toHaveBeenCalledTimes(4);
        expect(total).toBe(94.70)
        expect(cartItems).toMatchObject(returnItems)
    });

    test("Scenario 2 - should get correct total amount and items", () => {
        const returnItems = [
            {
                productName: "Unli-1GB",
                quantity: 2,
    
            },
            {
                productName: "Unli-5GB",
                quantity: 4,
            },];
        mockGetInterfaceTotal.mockReturnValue(209.4)
        mockGetInterfaceItems.mockReturnValue(returnItems)

        let pricingRules = data.pricingRules
        const item1 = mockGetData[0]
        const item2 = mockGetData[2]
        const shopCart = new ShoppingCart()
        shopCart.new(pricingRules)
        shopCart.add(item1)
        shopCart.add(item1)
        shopCart.add(item2)
        shopCart.add(item2)
        shopCart.add(item2)
        shopCart.add(item2)
        const total = shopCart.total()
        const cartItems = shopCart.items()

        expect(shopCart.new).toHaveBeenCalledTimes(1);
        expect(shopCart.add).toHaveBeenCalledTimes(6);
        expect(total).toBe(209.4)
        expect(cartItems).toMatchObject(returnItems)
    });


    test("Scenario 3 - should get correct total amount and items", () => {
        const returnItems = [
            {
                productName: "Unli-1GB",
                quantity: 1,
    
            },
            {
                productName: "Unli-2GB",
                quantity: 2,
            },
            {
                productName: "Data-1GB",
                quantity: 2,
            },
        ];
        mockGetInterfaceTotal.mockReturnValue(84.70)
        mockGetInterfaceItems.mockReturnValue(returnItems)

        let pricingRules = data.pricingRules
        const item1 = mockGetData[0]
        const item2 = mockGetData[1]
        const shopCart = new ShoppingCart()
        shopCart.new(pricingRules)
        shopCart.add(item1)
        shopCart.add(item2)
        shopCart.add(item2)
        const total = shopCart.total()
        const cartItems = shopCart.items()

        expect(shopCart.new).toHaveBeenCalledTimes(1);
        expect(shopCart.add).toHaveBeenCalledTimes(3);
        expect(total).toBe(84.7)
        expect(cartItems).toMatchObject(returnItems)
    });

    test("Scenario 4 - should get correct total amount and items", () => {
        const returnItems = [
            {
                productName: "Unli-1GB",
                quantity: 1,
    
            },
            {
                productName: "Data-1GB",
                quantity: 1,
            },
        ];
        mockGetInterfaceTotal.mockReturnValue(31.32)
        mockGetInterfaceItems.mockReturnValue(returnItems)

        let pricingRules = data.pricingRules
        const item1 = mockGetData[0]
        const item2 = mockGetData[3]
        const shopCart = new ShoppingCart()
        shopCart.new(pricingRules)
        shopCart.add(item1)
        shopCart.add(item2, 'I<3AMAYSIM')
        const total = shopCart.total()
        const cartItems = shopCart.items()

        expect(shopCart.new).toHaveBeenCalledTimes(1);
        expect(shopCart.add).toHaveBeenCalledTimes(2);
        expect(total).toBe(31.32)
        expect(cartItems).toMatchObject(returnItems)
    });
})
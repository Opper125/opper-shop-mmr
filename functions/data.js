let data = {
    products: [
        { id: '1', name: 'တီရှပ် (အနက်)', price: 15000, sizes: ['L', 'M', 'XL', '2XL', '3XL', '4XL'], img: 'https://via.placeholder.com/300x200?text=T-Shirt' },
        { id: '2', name: 'ဘောင်းဘီ (အပြာ)', price: 25000, sizes: ['L', 'M', 'XL', '2XL', '3XL', '4XL'], img: 'https://via.placeholder.com/300x200?text=Pants' },
        { id: '3', name: 'အင်္ကျီ (အဖြူ)', price: 20000, sizes: ['L', 'M', 'XL', '2XL'], img: 'https://via.placeholder.com/300x200?text=Shirt' },
        { id: '4', name: 'ဖိနပ် (အနက်)', price: 35000, sizes: ['38', '39', '40', '41', '42'], img: 'https://via.placeholder.com/300x200?text=Shoes' },
        { id: '5', name: 'လက်ကိုင်အိတ်', price: 18000, sizes: ['One Size'], img: 'https://via.placeholder.com/300x200?text=Bag' }
    ],
    orders: []
};

exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } else if (event.httpMethod === 'POST') {
        const request = JSON.parse(event.body);
        
        if (request.type === 'order') {
            data.orders.push(request.data);
        } else if (request.type === 'updateOrder') {
            const order = data.orders.find(o => o.id === request.id);
            if (order) order.status = request.status;
        } else if (request.type === 'deleteOrder') {
            data.orders = data.orders.filter(o => o.id !== request.id);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'ဒေတာ အပ်ဒိတ် ပြီးပါပြီ' })
        };
    }
    return {
        statusCode: 400,
        body: JSON.stringify({ message: 'မမှန်ကန်သော တောင်းဆိုမှု' })
    };
};

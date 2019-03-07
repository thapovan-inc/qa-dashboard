import Api from '@/services/Api';

export default {
    getAllProducts() {
        return Api.get('/ControllerServlet?RequestId=vt.ProductDetails&payload=all');
    },
    searchProducts(filters) {
        const f = JSON.stringify(filters);
        return Api.get(`/ControllerServlet?RequestId=vt.ProductDetails&payload=${f}`);
    },
    getVGiftsCredits() {
        const credits = [
            {
                max_credits: 500,
                min_credits: 25,
                num_of_products: 6,
                display_text: '25-500',
                selected: false,
            },
            {
                max_credits: 1530,
                min_credits: 501,
                num_of_products: 6,
                display_text: '501-1530',
                selected: false,
            },
            {
                max_credits: 3550,
                min_credits: 1531,
                num_of_products: 6,
                display_text: '1531-3550',
                selected: false,
            },
            {
                max_credits: 9080,
                min_credits: 5000,
                num_of_products: 6,
                display_text: '5000-9080',
                selected: false,
            },
            {
                max_credits: 40000,
                min_credits: 15000,
                num_of_products: 6,
                display_text: '15000-40000',
                selected: false,
            },
            {
                max_credits: 500000,
                min_credits: 50000,
                num_of_products: 6,
                display_text: '50000-500000',
                selected: false,
            },
            {
                max_credits: 1000000,
                min_credits: 1000000,
                num_of_products: 1,
                display_text: '1000000',
                selected: false,
            }
        ];

        return credits;
    },
    getUserDetails(nickname) {
        return Api.get(`/ControllerServlet?RequestId=vt.UserDetails&nickOrUid=${nickname}`);
    },
    getSubscriptionHistory(uid) {
        return Api.get(`https://stage443.paltalk.com/adm/ControllerServlet?RequestId=vt.AllSubs&uid=${uid}`);
    },
    getActiveSubscriptionHistory(uid) {
        return Api.get(`https://stage443.paltalk.com/adm/ControllerServlet?RequestId=vt.AllSubs&active=true&uid=${uid}`);
    },
};

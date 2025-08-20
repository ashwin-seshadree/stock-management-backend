const tables = {
    master_user: 'master_user',
    master_products: 'master_products',
    master_user_roles: 'master_user_roles',
    master_weight_chart: 'master_weight_chart',
    master_inventory_list: 'master_inventory_list',
    master_inventory_list_view: 'master_inventory_list_view',
    master_purchase: 'master_purchase',
    master_purchase_details: 'master_purchase_details',
    master_purchase_view: 'master_purchase_view',
};

const payment_types = {
    cash: 'cash',
    credit_card: 'credit_card',
    debit_card: 'debit_card',
    net_banking: 'net_banking',
}

const enums = {
    payment_types: Object.values(payment_types),
}

module.exports = { tables, payment_types, enums }
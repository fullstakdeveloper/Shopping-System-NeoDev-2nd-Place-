import stripe from "./stripe";

export async function getProducts() {
    const products = await stripe.products.list();
    return products;
}

export async function getLog(start: number|undefined, end: number|undefined) {
    const transactions = await stripe.balanceTransactions.list({
        created: {
            gte: start,
            lte: end,
        },
        limit: 100,
    });

    return transactions;
}

export async function scanItem(rfid_tag: string) {
    const product = (await stripe.products.search({ query: `metadata["rfid"]:'${rfid_tag}'` }))
        .data[0];

    await stripe.products.update(product.id, {
        metadata: {
            stock: parseInt(product.metadata.stock) - 1,
        },
    });
}

export async function pay(customer_id: string, rfid_tag: string) {
    const customer = (await stripe.customers.search({ query: `metadata["rfid"]:'${customer_id}'` }))
        .data[0];
    const product = (await stripe.products.search({ query: `metadata["rfid"]:'${rfid_tag}'` }))
        .data[0];

    const invoice = await stripe.invoices.create({
        customer: customer.id,
        collection_method: "charge_automatically",
        auto_advance: true,
    });

    const invoiceItem = await stripe.invoiceItems.create({
        customer: customer.id,
        price: product.default_price as string,
        invoice: invoice.id,
    });

    // await stripe.invoices.sendInvoice(invoice.id);
}

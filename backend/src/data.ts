
import stripe from "./stripe";
import Stripe from "stripe"

export async function getProduct(product_id: string) {
  const product = await stripe.products.retrieve(product_id);
  return product_id
}

// export async function getLog()

export async function scanItem(rfid_tag: string) {
  const product = (await stripe.products.search({query: `metadata["rfid"]:'${rfid_tag}'`})).data[0]

  await stripe.products.update(product.id, {
    metadata: {
      stock: parseInt(product.metadata.stock) - 1
    }
  })
} 

export async function pay(customer_id: string, rfid_tag: string) {
  const customer = (await stripe.customers.search({query: `metadata["rfid"]:'${customer_id}'`})).data[0]
  const product = (await stripe.products.search({query: `metadata["rfid"]:'${rfid_tag}'`})).data[0]

  const invoice = await stripe.invoices.create({
    customer: customer_id,
    collection_method: "charge_automatically"
  })

  const invoiceItem = await stripe.invoiceItems.create({
    customer: customer_id,
    price: product.default_price as string,
    invoice: invoice.id
  })

  await stripe.invoices.sendInvoice(invoice.id)
}
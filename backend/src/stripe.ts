import Stripe from "stripe"

declare var process: {
    env: {
      STRIPE_KEY: string
    }
  }
  
const stripe = new Stripe(process.env.STRIPE_KEY ?? "")
export default stripe  
import dotenv from 'dotenv'
dotenv.config()
import Stripe from "stripe"

declare var process: {
  env: {
    STRIPE_KEY: string
  }
}

console.log(process.env.STRIPE_KEY)

const stripe = new Stripe(process.env.STRIPE_KEY ?? "")

console.log('hello')

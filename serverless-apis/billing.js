import stripePackage from "stripe";
import handler from "../libs/handler-lib";
import { calculateCost } from "../libs/billing-lib";

export const main = handler(async (event, context) => {
    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";
    const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

    await stripe.charges.create({
        source,
        amount,
        description,
        currency: "usd"
    });
    return { status: true };
});
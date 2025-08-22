import { response } from "express";
import stripe from "../models/Booking";
 "stripe";

//API to handle Stripe webhooks

export const stripeWebhooks = async (request, response)=>{
    //Stripe Gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOKS_SECRET)
    } catch (error) {
        response.status(400).send(`webhooks Error: ${error.message}`)
    }

    //Handle the event 
    if(event.type === "paymet_intent.succeeded"){
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        //Getting Session Metadata
        const session = await stripeInstance.checkout.session.list({
            payment_intent: paymentIntent,
        });

        const {bookingId} = session.data[0].metadata;
        //Mark Payment as Paid
        await Booking.findByAndUpdate(bookingId, {isPaid: true, paymentMethod: "Stripe"})
    }else{
        console.log("Unhandled event type : ", event.type)
    }
    response.json({recived: true});
}
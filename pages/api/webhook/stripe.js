import { buffer } from 'micro';
import connectToDatabase from '../../../lib/mongoose'; // Mongoose connection
import User from '../../../models/User'; // User model
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

export const config = {
    api: {
        bodyParser: false,
    },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err) {
            console.error('Error verifying Stripe webhook signature:', err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Connect to the database
        await connectToDatabase();

        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;

                // Extract the email from the session
                const email = session.customer_details.email;

                // Check if the user exists
                let user = await User.findOne({ email });

                if (user) {
                    // Update existing user
                    user.paid = true;
                    user.stripePlan = session.subscription || 'one-time';
                    await user.save();
                } else {
                    // Create a new user
                    user = new User({
                        email,
                        paid: true,
                        stripePlan: session.subscription || 'one-time',
                    });
                    await user.save();
                }

                console.log(`Successfully processed payment for ${email}`);
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.status(200).json({ received: true });
    } else {
        res.status(405).end('Method Not Allowed');
    }
}
// /actions/subscription.ts
type SubscriptionUpdateParams = {
  transactionId: string;
  amount: number;
  transactionRef: string;
  status: 'active' | 'inactive';
  plan: string;
}

export async function updateSubscription(params: SubscriptionUpdateParams) {
  try {
    const response = await fetch('/api/subscription/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    return response;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}
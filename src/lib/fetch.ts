import axios from 'axios'

export const refreshToken = async (token: string) => {
  const refresh_token = await axios.get(
    `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  )

  return refresh_token.data
}

export const sendDM = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log('sending message')
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
    {
      recipient: {
        id: recieverId,
      },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
}

export const sendPrivateMessage = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log('sending message')
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
    {
      recipient: {
        comment_id: recieverId,
      },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
}


export const generateTokens = async (code: string) => {
  const insta_form = new FormData()
  insta_form.append('client_id', process.env.INSTAGRAM_CLIENT_ID as string)

  insta_form.append(
    'client_secret',
    process.env.INSTAGRAM_CLIENT_SECRET as string
  )
  insta_form.append('grant_type', 'authorization_code')
  insta_form.append(
    'redirect_uri',
    `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
  )
  insta_form.append('code', code)

  const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
    method: 'POST',
    body: insta_form,
  })

  const token = await shortTokenRes.json()
  if (token.permissions.length > 0) {
    console.log(token, 'got permissions')
    const long_token = await axios.get(
      `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
    )

    return long_token.data
  }
}



// import axios from 'axios'

// // Instagram Integration Module
// // Provides functions for interacting with Instagram's API for token management and messaging

// /**
//  * Refreshes an existing Instagram access token
//  * @param token - Current access token to be refreshed
//  * @returns Refreshed token data from Instagram
//  */
// export const instagramRefreshToken = async (token: string) => {
//   // Make a GET request to Instagram's token refresh endpoint
//   const refresh_token = await axios.get(
//     `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
//   )

//   return refresh_token.data
// }

// /**
//  * Sends a direct message via Instagram's API
//  * @param userId - The sender's user ID
//  * @param receiverId - The recipient's user ID
//  * @param prompt - Message content to be sent
//  * @param token - Access token for authentication
//  * @returns Response from Instagram's messaging API
//  */
// export const sendInstagramDM = async (
//   userId: string,
//   receiverId: string,
//   prompt: string,
//   token: string
// ) => {
//   console.log('sending Instagram message')
//   // Post a message to Instagram's messaging endpoint
//   return await axios.post(
//     `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
//     {
//       recipient: {
//         id: receiverId,
//       },
//       message: {
//         text: prompt,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }

// /**
//  * Sends a private message (potentially a comment reply) on Instagram
//  * @param userId - The sender's user ID
//  * @param receiverId - The comment ID to reply to
//  * @param prompt - Message content to be sent
//  * @param token - Access token for authentication
//  * @returns Response from Instagram's messaging API
//  */
// export const sendInstagramPrivateMessage = async (
//   userId: string,
//   receiverId: string,
//   prompt: string,
//   token: string
// ) => {
//   console.log('sending Instagram private message')
//   // Post a private message to Instagram's endpoint
//   return await axios.post(
//     `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
//     {
//       recipient: {
//         comment_id: receiverId,
//       },
//       message: {
//         text: prompt,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }

// /**
//  * Generates access tokens for Instagram integration
//  * @param code - Authorization code received from Instagram OAuth
//  * @returns Long-lived access token or undefined if no permissions
//  */
// export const generateInstagramTokens = async (code: string) => {
//   // Prepare form data for token exchange
//   const insta_form = new URLSearchParams()
//   insta_form.append('client_id', process.env.INSTAGRAM_CLIENT_ID as string)
//   insta_form.append(
//     'client_secret',
//     process.env.INSTAGRAM_CLIENT_SECRET as string
//   )
//   insta_form.append('grant_type', 'authorization_code')
//   insta_form.append(
//     'redirect_uri',
//     `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
//   )
//   insta_form.append('code', code)

//   // Exchange authorization code for short-lived token
//   const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
//     method: 'POST',
//     body: insta_form,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   })

//   const token = await shortTokenRes.json()
  
//   // Check if the token has necessary permissions
//   if (token.permissions && token.permissions.length > 0) {
//     console.log(token, 'got Instagram permissions')
    
//     // Exchange short-lived token for long-lived token
//     const long_token = await axios.get(
//       `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
//     )

//     return long_token.data
//   }
// }

// // Facebook Integration Module
// // Similar pattern of functions for Facebook API interactions

// /**
//  * Refreshes a Facebook access token
//  * @param token - Current access token to be refreshed
//  * @returns Refreshed token data from Facebook
//  */
// export const facebookRefreshToken = async (token: string) => {
//   const refresh_token = await axios.get(
//     `${process.env.FACEBOOK_BASE_URL}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&fb_exchange_token=${token}`
//   )

//   return refresh_token.data
// }

// /**
//  * Sends a direct message via Facebook's API
//  * @param userId - The sender's user ID
//  * @param receiverId - The recipient's user ID
//  * @param prompt - Message content to be sent
//  * @param token - Access token for authentication
//  * @returns Response from Facebook's messaging API
//  */
// export const sendFacebookDM = async (
//   userId: string,
//   receiverId: string,
//   prompt: string,
//   token: string
// ) => {
//   console.log('sending Facebook message')
//   return await axios.post(
//     `${process.env.FACEBOOK_BASE_URL}/v21.0/${userId}/messages`,
//     {
//       recipient: {
//         id: receiverId,
//       },
//       message: {
//         text: prompt,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }

// /**
//  * Generates access tokens for Facebook integration
//  * @param code - Authorization code received from Facebook OAuth
//  * @returns Access token or undefined if not successful
//  */
// export const generateFacebookTokens = async (code: string) => {
//   // Prepare form data for token exchange
//   const fb_form = new URLSearchParams()
//   fb_form.append('client_id', process.env.FACEBOOK_CLIENT_ID as string)
//   fb_form.append(
//     'client_secret',
//     process.env.FACEBOOK_CLIENT_SECRET as string
//   )
//   fb_form.append('grant_type', 'authorization_code')
//   fb_form.append(
//     'redirect_uri',
//     `${process.env.NEXT_PUBLIC_HOST_URL}/callback/facebook`
//   )
//   fb_form.append('code', code)

//   // Exchange authorization code for access token
//   const shortTokenRes = await fetch(process.env.FACEBOOK_TOKEN_URL as string, {
//     method: 'POST',
//     body: fb_form,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   })

//   const token = await shortTokenRes.json()
//   if (token.access_token) {
//     console.log(token, 'got Facebook permissions')
//     return token
//   }
// }

// // Twitter Integration Module
// // Similar pattern of functions for Twitter API interactions

// /**
//  * Refreshes a Twitter access token
//  * @param token - Current access token
//  * @param refreshToken - Refresh token for obtaining new access token
//  * @returns Refreshed token data from Twitter
//  */
// export const twitterRefreshToken = async (token: string, refreshToken: string) => {
//   const refresh_token = await axios.post(
//     `${process.env.TWITTER_BASE_URL}/oauth2/token`,
//     new URLSearchParams({
//       grant_type: 'refresh_token',
//       refresh_token: refreshToken,
//       client_id: process.env.TWITTER_CLIENT_ID as string,
//       client_secret: process.env.TWITTER_CLIENT_SECRET as string,
//     }),
//     {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     }
//   )

//   return refresh_token.data
// }

// /**
//  * Sends a direct message via Twitter's API
//  * @param userId - The sender's user ID
//  * @param receiverId - The recipient's user ID
//  * @param prompt - Message content to be sent
//  * @param token - Access token for authentication
//  * @returns Response from Twitter's messaging API
//  */
// export const sendTwitterDM = async (
//   userId: string,
//   receiverId: string,
//   prompt: string,
//   token: string
// ) => {
//   console.log('sending Twitter DM')
//   return await axios.post(
//     `${process.env.TWITTER_BASE_URL}/2/dm/conversations/with/${receiverId}/messages`,
//     {
//       text: prompt,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }

// /**
//  * Generates access tokens for Twitter integration
//  * @param code - Authorization code received from Twitter OAuth
//  * @returns Access token or undefined if not successful
//  */
// export const generateTwitterTokens = async (code: string) => {
//   // Prepare form data for token exchange
//   const twitter_form = new URLSearchParams()
//   twitter_form.append('client_id', process.env.TWITTER_CLIENT_ID as string)
//   twitter_form.append(
//     'client_secret',
//     process.env.TWITTER_CLIENT_SECRET as string
//   )
//   twitter_form.append('grant_type', 'authorization_code')
//   twitter_form.append(
//     'redirect_uri',
//     `${process.env.NEXT_PUBLIC_HOST_URL}/callback/twitter`
//   )
//   twitter_form.append('code', code)

//   // Exchange authorization code for access token
//   const tokenRes = await fetch(process.env.TWITTER_TOKEN_URL as string, {
//     method: 'POST',
//     body: twitter_form,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   })

//   const token = await tokenRes.json()
//   if (token.access_token) {
//     console.log(token, 'got Twitter permissions')
//     return token
//   }
// }

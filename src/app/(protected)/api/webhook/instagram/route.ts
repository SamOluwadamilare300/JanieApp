// Import necessary modules and functions
import { findAutomation } from "@/actions/automations/queries";
import { createChatHistory, getChatHistory, getKeywordAutomation, getKeywordPost, matchKeyword, trackResponses } from "@/actions/webhook/queries";
import { sendDM, sendPrivateMessage } from "@/lib/fetch";
import { openai } from "@/lib/openai";
import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Handler for GET requests
export async function GET(req: NextRequest) {
  // Extract the 'hub.challenge' parameter from the URL
  const hub = req.nextUrl.searchParams.get('hub.challenge');
  // Respond with the 'hub.challenge' value
  return new NextResponse(hub);
}

// Handler for POST requests
export async function POST(req: NextRequest) {
  // Parse the JSON payload from the request
  const webhook_payload = await req.json();
  let matcher;

  try {
    // Check if the payload contains messaging data
    if (webhook_payload.entry[0].messaging) {
      // Match the keyword from the messaging text
      matcher = await matchKeyword(webhook_payload.entry[0].messaging[0].message.text);
    }

    // Check if the payload contains changes data
    if (webhook_payload.entry[0].changes) {
      // Match the keyword from the changes text
      matcher = await matchKeyword(webhook_payload.entry[0].changes[0].value.text);
    }

    // If a keyword matcher is found
    if (matcher && matcher.automationId) {
      console.log('Matched');
      // Handle messaging data
      if (webhook_payload.entry[0].messaging) {
        // Retrieve the automation details
        const automation = await getKeywordAutomation(matcher.automationId, true);

        if (automation && automation.trigger) {
          // Handle MESSAGE listener
          if (automation.listener && automation.listener.listener === 'MESSAGE') {
            // Send a direct message
            const direct_message = await sendDM(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              automation.listener?.prompt,
              automation.User?.integrations[0].token!
            );

            // Track responses if the message is successfully sent
            if (direct_message.status === 200) {
              const tracked = await trackResponses(automation.id, 'DM');
              if (tracked) {
                return NextResponse.json({ message: 'Message sent' }, { status: 200 });
              }
            }
          }

          // Handle SMARTAI listener for PRO users
          if (automation.listener && automation.listener.listener === 'SMARTAI' && automation.User?.subscription?.plan === 'PRO') {
            const smart_ai_message = await openai.chat.completions.create({
              model: 'gpt-4o',
              messages: [
                {
                  role: 'assistant',
                  content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
                },
              ],
            });

            if (smart_ai_message.choices[0].message.content) {
              // Create chat history entries
              const reciever = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                webhook_payload.entry[0].messaging[0].message.text
              );

              const sender = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content
              );

              // Store chat history in a transaction
              await client.$transaction([reciever, sender]);

              // Send the AI-generated response as a direct message
              const direct_message = await sendDM(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content,
                automation.User?.integrations[0].token!
              );

              // Track responses if the message is successfully sent
              if (direct_message.status === 200) {
                const tracked = await trackResponses(automation.id, 'DM');
                if (tracked) {
                  return NextResponse.json({ message: 'Message sent' }, { status: 200 });
                }
              }
            }
          }
        }
      }

      // Handle changes data with 'comments' field
      if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === 'comments') {
        // Retrieve the automation details
        const automation = await getKeywordAutomation(matcher.automationId, false);

        console.log('getting the automations');

        // Retrieve the post associated with the keyword
        const automations_post = await getKeywordPost(
          webhook_payload.entry[0].changes[0].value.media.id,
          automation?.id!
        );

        console.log('found keyword', automations_post);

        if (automation && automations_post && automation.trigger) {
          console.log('first if');
          if (automation.listener) {
            console.log('first if');
            // Handle MESSAGE listener
            if (automation.listener.listener === 'MESSAGE') {
              console.log(
                'SENDING DM, WEB HOOK PAYLOAD',
                webhook_payload,
                'changes',
                webhook_payload.entry[0].changes[0].value.from
              );

              console.log(
                'COMMENT VERSION:',
                webhook_payload.entry[0].changes[0].value.from.id
              );

              // Send a private message in response to a comment
              const direct_message = await sendPrivateMessage(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].changes[0].value.id,
                automation.listener?.prompt,
                automation.User?.integrations[0].token!
              );

              console.log('DM SENT', direct_message.data);
              if (direct_message.status === 200) {
                const tracked = await trackResponses(automation.id, 'COMMENT');

                if (tracked) {
                  return NextResponse.json({ message: 'Message sent' }, { status: 200 });
                }
              }
            }

            // Handle SMARTAI listener for PRO users
            if (automation.listener.listener === 'SMARTAI' && automation.User?.subscription?.plan === 'PRO') {
              const smart_ai_message = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                  {
                    role: 'assistant',
                    content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
                  },
                ],
              });
              if (smart_ai_message.choices[0].message.content) {
                // Create chat history entries
                const reciever = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  webhook_payload.entry[0].changes[0].value.text
                );

                const sender = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  smart_ai_message.choices[0].message.content
                );

                // Store chat history in a transaction
                await client.$transaction([reciever, sender]);

                // Send the AI-generated response as a private message
                const direct_message = await sendPrivateMessage(
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.id,
                  automation.listener?.prompt,
                  automation.User?.integrations[0].token!
                );

                if (direct_message.status === 200) {
                  const tracked = await trackResponses(automation.id, 'COMMENT');

                  if (tracked) {
                    return NextResponse.json({ message: 'Message sent' }, { status: 200 });
                  }
                }
              }
            }
          }
        }
      }
    }

    // If no matcher is found
    if (!matcher) {
      // Retrieve the chat history
      const customer_history = await getChatHistory(
        webhook_payload.entry[0].messaging[0].recipient.id,
        webhook_payload.entry[0].messaging[0].sender.id
      );

      if (customer_history.history.length > 0) {
        // Find the automation associated with the chat history
        const automation = await findAutomation(customer_history.automationId!);

        if (
          automation?.User?.subscription?.plan === 'PRO' &&
          automation.listener?.listener === 'SMARTAI'
        ) {
          const smart_ai_message = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
              {
                role: 'assistant',
                content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
              },
              ...customer_history.history,
              {
                role: 'user',
                content: webhook_payload.entry[0].messaging[0].message.text,
              },
            ],
          });

          if (smart_ai_message.choices[0].message.content) {
            // Create chat history entries
            const reciever = createChatHistory(
              automation.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              webhook_payload.entry[0].messaging[0].message.text
            );

            const sender = createChatHistory(
              automation.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.choices[0].message.content
            );

            // Store chat history in a transaction
            await client.$transaction([reciever, sender]);

            // Send the AI-generated response as a direct message
            const direct_message = await sendDM(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.choices[0].message.content,
              automation.User?.integrations[0].token!
            );

            if (direct_message.status === 200) {
              // If successfully sent, return
              return NextResponse.json({ message: 'Message sent' }, { status: 200 });
            }
          }
        }
      }

      // Return response if no automation is set
      return NextResponse.json({ message: 'No automation set' }, { status: 200 });
    }

    // Return response if no automation is set
    return NextResponse.json({ message: 'No automation set' }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during processing
    return NextResponse.json({ message: 'No automation set' }, { status: 200 });
  }
}
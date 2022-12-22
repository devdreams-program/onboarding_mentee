import { shareDocument, createDocumentFromTemplate, setAutoOnboardingDone, listColumns,getRowInfo } from './documentUtils.js';
import { sendWelcomeEmail } from './sendEmail.js';
import dotenv from 'dotenv';
dotenv.config();

const run = async (fullName, email, rowId) => {
  //Knowlege base sharing step
  await shareDocument(process.env.CODA_KNOWLEDGE_BASE, email);

  // //Personal mentee page creation step
  const {
    data: { id: menteePageId },
  } = await createDocumentFromTemplate(process.env.CODA_PLACEHOLDER_TEMPLATE, fullName);
  await shareDocument(menteePageId, email, 'write');

  //Update mentee row on "Program document" with "Auto-onboarding done" status
  await setAutoOnboardingDone(rowId)

  // //Send email step through SMTP
  await sendWelcomeEmail(email);

};


export const handler = async (event) => {
  
  console.log(JSON.stringify(event, null, 2))
  const {name, email, rowId} = event.queryStringParameters
  
  if(!name || !email || !rowId) return

  await run(name, email,rowId)

  const response = {
      statusCode: 200,
      body: JSON.stringify(event, null, 2),
  };
  return response;
};

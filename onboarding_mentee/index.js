import { shareDocument, createDocumentFromTemplate, listTables, listColumns } from './documentUtils.js';
import { sendWelcomeEmail } from './sendEmail.js';
import dotenv from 'dotenv';
dotenv.config();

const run = async (fullName, email) => {
  //Knowlege base sharing step
  await shareDocument(process.env.CODA_KNOWLEDGE_BASE, email);

  //Personal mentee page creation step
  const {
    data: { id: menteePageId },
  } = await createDocumentFromTemplate(process.env.CODA_PLACEHOLDER_TEMPLATE, fullName);
  await shareDocument(menteePageId, email, 'write');

  //Send email step through SMTP
  await sendWelcomeEmail(email);
};

// run('Goku SuperSayan', 'alfonso.lokk3d@gmail.com');
// listTables('jGprPVotX-').then((res) => console.log(res.data));
listColumns(process.env.CODA_PROGRAM_DOC_ID, process.env.CODA_APPLICATION_TABLE_ID).then((res) =>
  console.log(res.data)
);

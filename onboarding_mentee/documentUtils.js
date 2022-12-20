import axios from 'axios';

export const shareDocument = async (docId, email, accesType = 'readonly') => {
  const url = `https://coda.io/apis/v1/docs/${docId}/acl/permissions`;
  const body = {
    access: accesType,
    principal: {
      type: 'email',
      email: email,
    },
  };

  return axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${process.env.CODA_API_KEY}`,
    },
  });
};

export const createDocumentFromTemplate = async (templateId, name) => {
  const url = `https://coda.io/apis/v1/docs`;
  const body = {
    sourceDoc: templateId,
    title: name,
  };

  return axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${process.env.CODA_API_KEY}`,
    },
  });
};

export const updateRow = async (docId, tableId, rowId, fieldId, newValue) => {
  const url = `https://coda.io/apis/v1/docs/${docId}/tables/${tableId}/rows/${rowId}/cells/${fieldId}`;
  //Update a row from coda.io api

  const body = {
    row: {
      cells: [{ column: fieldId, value: newValue }],
    },
  };

  return axios.put(url, body, {
    headers: {
      Authorization: `Bearer ${process.env.CODA_API_KEY}`,
    },
  });
};

export const setAutoOnboardingDone = async (rowId) => {
  const ONBOARDING_DONE = 'Auto-onboarding done';
  return updateRow(
    process.env.CODA_PROGRAM_DOC_ID,
    process.env.CODA_APPLICATION_TABLE_ID,
    rowId,
    process.env.CODA_AUTO_ONBOARDING_DONE_FIELD_ID,
    ONBOARDING_DONE
  );
};

export const listDocuments = async () => {
  //List all documents from coda.io api
  const url = 'https://coda.io/apis/v1/docs';
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.CODA_API_KEY}`,
    },
  });
};

export const listTables = async (docId) => {
  const url = `https://coda.io/apis/v1/docs/${docId}/tables`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.CODA_API_KEY}`,
    },
  });
};

export const listColumns = async (docId, tableId) => {
  const url = `https://coda.io/apis/v1/docs/${docId}/tables/${tableId}/columns`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.CODA_API_KEY}`,
    },
  });
};

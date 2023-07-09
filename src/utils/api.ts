export interface docInfo {
  content?: string;
  title?: string;
  id?: string;
  v?: number;
}

export const FetchDocuments = (setDocs: React.Dispatch<React.SetStateAction<[]>>) => {
  const apiUrl = '//localhost:3000/documents/';
  fetch(apiUrl, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data?.length > 0) {
      setDocs(data);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

export const FetchSingleDocContent = async (docId: string): Promise<docInfo> => {

  const apiUrl = '//localhost:3000/documents/' + docId;

  const result =  await fetch(apiUrl, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  })
  .then(response => response.json())
  .then(data => {
      if (data?.content || data?._id) {
          return({content: data.content, id: data._id, title: data.title, v: data.__v});
      }
  })
  .catch(error => {
      console.error('Error:', error);
      return({});
  });

  return result ?? {};
};

export const updateSingleDocContent = (docData: docInfo) => {  // PUT update document data
    
    const apiUrl = docData.id ? '//localhost:3000/documents/' + docData.id : undefined;

    if (!apiUrl) return;
    
    // Data to be sent
    const data = {
        "_id": docData.id,
        "__v": docData.content ? (docData.v ?? 0) + 1 : docData.v ?? 0,
        "content": docData.content,
        "title": docData.title
    };
    
    // Fetch options
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'PUT',
        'Access-Control-Request-Headers': 'origin, x-requested-with',
      },
      body: JSON.stringify(data)
    };
    
    // // Send the PUT request
    fetch(apiUrl, options)
      .then(response => {
        if (response.ok) {
          // Request was successful
          console.log('Data successfully written via PUT.');
        } else {
          // Request was not successful
          console.error('Error writing data via PUT:', response.status, response.statusText);
        }
      })
      .catch(error => {
        console.error('Error writing data via PUT:', error);
      });
};

export const deleteSingleDocContent = (docId: string) => {  // DELETE document data
  const apiUrl = '//localhost:3000/documents/' + docId;

  return fetch(apiUrl, {
      method: 'DELETE',
      headers: {
          'Access-Control-Request-Method': 'DELETE'
      },
  })
  .then(response => response)
  .then(data => data)
  .catch(error => {
    console.error('Error:', error);
  });
};

export const createNewDoc = () => {  // POST create new document
  const apiUrl = '//localhost:3000/documents/';
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => data)
  .catch(error => {
    console.error('Error:', error);
  });
};

export const DuplicateSingleDoc = (docId: string) => {  // POST create new document

  const apiUrl = '//localhost:3000/documents/' + docId + '/duplicate';

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => data)
  .catch(error => {
    console.error('Error:', error);
  });
  }

export const deleteDoc = async (id: string) => {
  const response = await deleteSingleDocContent(id);
  if (response && response.status === 200) {
      window.location.reload(); // TODO: replace with a state update to avoid a full page reload. Update document list by removing successfully deleted doc from state.
  }
};

export const createDoc = async () => {
  const response = await createNewDoc();
  if (response._id) {
      window.location.reload(); // TODO: replace with a state update to avoid a full page reload. Update document list by adding successfully created doc to state.
  }
};

export const duplicateDoc = async (id: string) => {
  const response = await DuplicateSingleDoc(id);
  if (response._id) {
    window.location.reload(); // TODO: replace with a state update to avoid a full page reload. Update document list by adding successfully created doc to state.
}
};
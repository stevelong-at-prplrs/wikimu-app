export interface docInfo {
  content?: string;
  title?: string;
  id?: string;
  v?: number;
}

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
    // console.log({data})
      if (data?.content || data?._id) {
          // console.log("data.content:\t", data.content);
          return({content: data.content, id: data._id, title: data.title});
      }
  })
  .catch(error => {
      console.error('Error:', error);
      return({});
  });

  return result ?? {};
};

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

export const updateSingleDocContent = (docData) => {  // PUT update document data
    
    const apiUrl = docData.id ? '//localhost:3000/documents/' + docData.id : undefined;

    if (!apiUrl) return;
    
    // Data to be sent
    const data = {
        "_id": docData.id,
        "__v": 1,
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

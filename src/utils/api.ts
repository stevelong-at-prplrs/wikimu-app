export const FetchSingleDocContent = (setMarkdown: { (value: React.SetStateAction<string>): void; (arg0: any): void; }) => {
        
    const apiUrl = '//localhost:3000/documents/6498a352835cd46dc03dbf76';

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data?.content) {
            setMarkdown(data.content);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

export const updateSingleDocContent = (markdownStr: string) => {  // PUT update document data
    
    const apiUrl = '//localhost:3000/documents/6498a352835cd46dc03dbf76';
    
    // Data to be sent
    const data = {
        "_id": "6498a352835cd46dc03dbf76",
        "__v": 1,
        "content": markdownStr,
        "title": "example-1"
    };
    
    // // Fetch options
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
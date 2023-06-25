import * as React from "react";

export const useMarkdownContent = (): [string, React.Dispatch<React.SetStateAction<string>>] => {

    const [content, setContent] = React.useState('');

    const FetchSingleDocContent = async () => {
        
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
                setContent(data.content);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    React.useEffect(() => {
        if (!content) {
            FetchSingleDocContent();
        }
    }, []);

    return [content, setContent];
}

        // PUT update document data
        // // Data to be sent
        // const data = {
        //     "_id": "6498a352835cd46dc03dbf76",
        //     "__v": 1,
        //     "content": "# h1 Heading 8-)",
        //     "title": "example-1"
        // };
        
        // // Fetch options
        // const options = {
        //   method: 'PUT',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(data)
        // };
        
        // // Send the PUT request
        // fetch(apiUrl, options)
        //   .then(response => {
        //     if (response.ok) {
        //       // Request was successful
        //       console.log('Data successfully written via PUT.');
        //     } else {
        //       // Request was not successful
        //       console.error('Error writing data via PUT:', response.status, response.statusText);
        //     }
        //   })
        //   .catch(error => {
        //     console.error('Error writing data via PUT:', error);
        //   });
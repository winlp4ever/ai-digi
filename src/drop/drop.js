import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

import './_drop.scss';

const Drop = (props) => {
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = async () => {
                // upload to server
                const binaryStr = reader.result;
                const response = await fetch('/post-file', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({file: binaryStr, fn:file.name})
                })
                const data = await response.json();
                if (data.err) console.log(data.err);
                if (data.link) {
                    console.log(data.link);
                    if (props.linkHdler) props.linkHdler(data.link);
                }
            }
            reader.readAsDataURL(file);
        })
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} className='drop'>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>{props.msg}</p>
            }
        </div>
    )
}

export default Drop;
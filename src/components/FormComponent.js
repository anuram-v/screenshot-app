import React, { useState } from 'react';

export default function FormComponent() {
    const [downloading, setDownloading]= useState(false)
    const handleSubmit = event => {
        event.preventDefault()
        setDownloading(true)
        const path= event.target.path.value
        fetch(`api/download/${path}`, {
            method: 'GET'
        })
        .then((response) => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            console.log(url)
            link.setAttribute('download', "screenshot.png");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setDownloading(false)
        })
    }
    return(
        <div className="form-class">
            
            <form onSubmit={handleSubmit}>
                <input 
                    id="path" 
                    name="path" 
                    type="text"
                    placeholder="Enter a url" required />
                {downloading ? <button className="disabled" disabled type="submit">Downloading</button> 
                : <button className="enabled" type="submit">Submit</button>}
                
            </form>
            <p className="sample">Valid url samples : "en.wikipedia.org", "surveysparrow.com"</p>
            <style jsx>{`
                .form-class{
                    width: 100%;
                    padding: 105px 0;
                    font-size: 16px;
                    font-family: 'Segoe UI',Arial,sans-serif;
                    display: block;
                    margin : 0 auto;
                }
               
                input{
                    width: 30%;
                    padding: 8px 10px;
                    margin: 30px 30px 10px;
                }
                button{
                    margin: 0 0 0 20px;
                    border: none;
                    margin: 0 0 0 20px;
                    padding: 8px 32px;
                    text-align: center;
                    font-size: 16px;
                    width: 180px;
                }
                button.enabled{
                    background-color: #275929;
                    color: white;
                }
                button.disabled{
                    background-color: #71c174;
                    color: white;
                }
                .sample{
                    font-size: 16px;
                    color: black;
                    font-style: italic;
                    margin-left:30px
                }
            `}</style>
        </div>
    )
}
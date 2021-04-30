import React, {useEffect ,useState} from 'react'
import axios from "axios";



function UnspashAPI() {

    const [url, setUrl] = useState([])

    useEffect(()=> {
        
        const fetchUrl = async()=> {
            const response = await axios.get("https://source.unsplash.com/random")
            const url = response.config.url
            setUrl(url)
        }
        fetchUrl()
    }, [])

    return (
        <div>
            <img src={url}/>
        </div>
    )
}

export default UnspashAPI

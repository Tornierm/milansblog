import axios from 'axios'

const url = "https://graph.instagram.com/";

const token = "IGQVJYdWJ0R0NEWEEzX1czaFJ0Q0lNZAi1aVW42a01WUVctcFVzZAHNrN1ZA1T2JOZAVVzcmpRWHpTdmR0NWxSdTNDXy0wMWlJR1diREU0N0RRN1RUdjFhYms0V2J0UDlvZAlBpX1diTXUtWmdXRVRfS3VVOQZDZD"

export async function retrieveIG(){
    const res = await axios.get(url+`me/media?fields=id,media_url,username&access_token=${token}`)
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    console.log(res.data.data)
    return res.data.data.slice(0, 9)
}
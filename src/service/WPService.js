import axios from 'axios'

const url = "https://live-milantornier.pantheonsite.io";

export async function retrievePosts(){
    const res = await axios.get(url+'/wp-json/wp/v2/posts')
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    return res.data
}

export async function retrieveComments(id, parent){
    const res = await axios({
        method: 'get',
        url: url+`/wp-json/wp/v2/comments/?post=${id}&per_page=10&parent=${parent}`,
        headers: {'Content-Type': 'application/json'}
    })    
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    console.log(res.data)
    return res.data
}

export async function postComment(data){
    console.log(data)
    console.log(url+`/wp-json/wp/v2/comments`)
    const res = await axios({
        method: 'post',
            url: url+`/wp-json/wp/v2/comments`,
            headers: {'Content-Type': 'application/json'}, 
            data: data
    })    
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    console.log(res.data)
    return res.data
}

export async function retrievePost(id){
    const res = await axios(url+`/wp-json/wp/v2/posts/${id}`)    
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    return res.data
}

export async function retrieveFeaturedMedia(featured_media){
    const res = await axios(url+`/wp-json/wp/v2/media/${featured_media}` )
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    return res.data
}

export async function retrieveAuthor(author){
    const res = await axios(url+`/wp-json/wp/v2/users/${author}` )
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    return res.data
}

export async function retrieveNavbar(){
    const res = await axios(url+'/wp-json/menus/v1/menus/main')
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    return res.data
}

export async function retrievePage(id){
    const res = await axios(url+`/wp-json/wp/v2/pages/${id}`)    
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    return res.data
}

export async function retrievePages(){
    const res = await axios.get(url+'/wp-json/wp/v2/pages')
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    return res.data
}

export async function retrieveAboutPage(){

    const pages = await retrievePages()
    for(const page of pages){
        if(page.title.rendered==="Welcome"){
            return retrievePage(page.id);
        }
    }
    console.log('return null')
    return null;
}
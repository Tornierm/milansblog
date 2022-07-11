import axios from 'axios'

const url = "https://live-milantornier.pantheonsite.io/";

export async function retrievePosts(){
    const res = await axios.get(url+`/wp-json/wp/v2/posts`)
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    console.log(res);
    return res.data
}

export async function retrievePostsByCategoryId(categoryId){
    const res = await axios.get(url+`/wp-json/wp/v2/posts/?categories=${categoryId}`)
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    return res.data
}

export async function retrievePostsByCategory(category){
    const caregoryId = await retrieveCategoryIdByName(category);
    const posts = await retrievePostsByCategoryId(caregoryId);
    return posts
}

export async function retrievePost(id){
    const res = await axios(url+`/wp-json/wp/v2/posts/${id}`)    
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    return res.data
}

export async function retrieveCategories(){
    const res = await axios(url+`/wp-json/wp/v2/categories`)    
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    return res.data
}

export async function retrieveCategoryIdByName(category){
    const res = await axios(url+`/wp-json/wp/v2/categories/?slug=${category}`)    
    .catch(err => console.error(err))
    if (!res) {
        return null;
    }
    return res.data[0].id
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
    return res.data
}

export async function postComment(data){
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

export async function retrievePageById(id){
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

export async function retrievePageByName(name){
    const pages = await retrievePages()
    for(const page of pages){
        if(page.title.rendered===name){
            return retrievePageById(page.id);
        }
    }
    return null;
}

export async function contactFormSubmission(data){
    console.log(data)
    const res = await axios({
        method: 'post',
            url: url+`/wp-json/contact-form-7/v1/contact-forms/148/feedback`,
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
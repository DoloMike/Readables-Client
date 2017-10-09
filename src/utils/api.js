const API_AUTH_HEADER = process.env.REACT_APP_API_AUTH_HEADER
const API_ROOT = process.env.REACT_APP_API_ROOT
const POST_JSON_HEADERS = {
  'Authorization': API_AUTH_HEADER,
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
}

export function fetchCatgories() {
  const url = `${API_ROOT}/categories`
  const hdr = {headers: { 'Authorization': API_AUTH_HEADER }}

  return fetch(url, hdr)
  .then(res => res.json())
  .then(res => res.categories)
}

export function fetchPosts(categoryName) {
  //default to all posts of categoryName isn't specified
  const url = categoryName ? `${API_ROOT}/${categoryName}/posts` : `${API_ROOT}/posts`
  const hdr = {headers: { 'Authorization': API_AUTH_HEADER }}

  return fetch(url, hdr)
  .then(res => res.json())
}

export function fetchComments(postId) {
  const url = `${API_ROOT}/posts/${postId}/comments`
  const hdr = {headers: { 'Authorization': API_AUTH_HEADER }}

  return fetch(url, hdr)
  .then(res => res.json())
}

//POST /posts
export function postPost(post) {
  const url = `${API_ROOT}/posts`
  const opts = {
    headers: POST_JSON_HEADERS,
    method: 'post',
    body: JSON.stringify(post)
  }

  return fetch(url, opts)
  .then(res => res.json())
}

import get_posts from './_posts.js'

let json

export function get (req, res) {
  if (!json || process.env.NODE_ENV !== 'production') {
    json = JSON.stringify(get_posts())
  }

  res.setHeader('Content-Type', 'application/json')
  res.end(json)
}

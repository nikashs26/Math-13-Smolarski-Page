import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use('/*', serveStatic({ 
  root: './static/HTML'
}));

app.use('/*', serveStatic({ 
  root: './static/assets'
}));

app.use('/*', serveStatic({ 
  root: './static/css'
}));

app.use('/*', serveStatic({ 
  root: './static/borders'
}));

app.use('/*', serveStatic({ 
  root: './static/icons'
}));

app.use('/*', serveStatic({ 
  root: './static/dates'
}));

app.use('/*', serveStatic({ 
  root: './static/scripts'
}));




const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})



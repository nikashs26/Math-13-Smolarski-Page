import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import fs from 'fs';
import path from 'path';

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
  root: './static/icons'
}));

app.use('/*', serveStatic({ 
  root: './static/screenshots'
}));

app.use('/*', serveStatic({ 
  root: './static/screenshots copy'
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



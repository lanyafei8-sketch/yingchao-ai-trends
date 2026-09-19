const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};

http.createServer((req,res)=>{
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file = pathname === '/' ? 'index.html' : pathname.slice(1);
  if (!['index.html','styles.css','app.js'].includes(file)) {
    res.writeHead(404); res.end('Not found'); return;
  }
  const filename = path.join(root,file);
  fs.readFile(filename,(err,data)=>{
    if(err){res.writeHead(500);res.end('Server error');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(file)],'Cache-Control':'no-store'});
    res.end(data);
  });
}).listen(port,()=>console.log(`映潮 AI 已启动：http://localhost:${port}`));

/* eslint-disable import/extensions */
import moment from 'moment';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-body-parser';
import http from 'http';
import cors from 'koa-cors';
import UnreadMessages from './unreadMessages.js';

const app = new Koa();
const router = new Router();

const unreadMessages = new UnreadMessages();

router.get('/messages/unread', async (ctx) => {
  const messages = unreadMessages.getMessages();

  const data = {
    status: 'ok',
    timestamp: moment().unix(),
    messages,
  };

  ctx.response.body = data;
});

app
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

const port = process.env.PORT || 7070;
http.createServer(app.callback()).listen(port);

const {Router} = require('express');
const {
  getMessages,
  insertMessage,
} = require('./message.controller');

const router = Router();

router.get('/', getMessages);
router.post('/', insertMessage);

module.exports = router;

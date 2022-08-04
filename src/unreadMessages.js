import { faker } from '@faker-js/faker';
import moment from 'moment';

const createMessage = (received) => ({
  id: faker.datatype.uuid(),
  from: faker.internet.email(),
  subject: faker.random.words(3),
  body: faker.random.words(Math.ceil(Math.random() * 10)),
  received,
});

export default class UnreadMessages {
  constructor(limitMessages = 10) {
    this.currentDate = moment('2000-01-01', 'YYYY-MM-DD');
    this.limitMessages = limitMessages;
    this.messages = [];
  }

  getMessages() {
    if (this.messages.length >= this.limitMessages) {
      this.messages.splice(0, this.messages.length);
    }

    const received = this.currentDate.add(1, 'minutes').unix();

    this.messages.push(createMessage(received));

    return this.messages;
  }
}

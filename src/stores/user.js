import { observable } from 'mobx';

class User {
  @observable name = 'twomoonbird';
}


export default new User();

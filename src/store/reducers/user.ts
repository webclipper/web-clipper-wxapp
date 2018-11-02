import { UserDetailSerializer } from '../../interface/interface';

export interface UserStateInterface {
  userInfo?: UserDetailSerializer;
}

const defaultState: UserStateInterface = {};

export default function user(state = defaultState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

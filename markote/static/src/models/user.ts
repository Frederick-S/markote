import BaseModel from './base-model'

export default class User extends BaseModel<string> {
    public displayName: string = ''
}

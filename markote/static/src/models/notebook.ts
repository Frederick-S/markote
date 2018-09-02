import BaseModel from './base-model'

export default class Notebook extends BaseModel<string> {
    public displayName: string = ''
}

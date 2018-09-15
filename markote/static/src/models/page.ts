import BaseModel from './base-model'

export default class Page extends BaseModel<string> {
    public title: string = ''

    public content: string = ''

    public markdown: string = ''

    public isReadOnly: boolean = false
}

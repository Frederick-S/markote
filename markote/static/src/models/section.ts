import BaseModel from './base-model'

export default class Section extends BaseModel<string> {
    public displayName: string = ''

    constructor(displayName: string = '') {
        super()

        this.displayName = displayName
    }
}

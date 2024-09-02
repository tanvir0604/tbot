import Model from "./Model";

export default class User extends Model{
    constructor(){
        super();
        this.table = 'user';
    }
}
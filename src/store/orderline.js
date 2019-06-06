import { observable, computed } from "mobx";

class OrderLine {
    @observable price = 5;
    @observable amount = 1;

    @computed get total() {
        return this.price * this.amount;
    }
}

export default OrderLine

import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";

contract Manager with Deployable, Ownable {
    owner: Address;
    init(owner: Address){
        self.owner = owner;
    }
}
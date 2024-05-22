import "@stdlib/deploy";
import "@stdlib/ownable";
import "./jetton";
import "./messages";

contract Token with Jetton, Deployable, Ownable {
    total_supply: Int as coins;
    owner: Address;
    content: Cell;
    mintable: Bool;
    max_supply: Int as coins;
    init(owner: Address, content: Cell, max_supply: Int){
        self.total_supply = 0;
        self.owner = owner;
        self.mintable = true;
        self.content = content;
        self.max_supply = max_supply;
    }

    receive(msg: Mint){
        // 0xfc708bd2
        self.requireOwner();
        //require(ctx.sender == self.owner, "Not owner");
        require(self.mintable, "Not mintable");
        require((self.total_supply + msg.amount) <= self.max_supply, "Max supply exceeded");
        self.mintable = false;
        self.owner = address("0:0000000000000000000000000000000000000000000000000000000000000000"); // set the owner as the zero address
        self.mint(msg.receiver, msg.amount, self.owner); // (to, amount, response_destination)
    }
}
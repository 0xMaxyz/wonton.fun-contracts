import "@stdlib/deploy";
import "@stdlib/ownable";
import "./jetton";
import "./messages";

contract Token with Jetton, Deployable, Ownable {
    tokenLauncher: Address;
    total_supply: Int as coins;
    owner: Address;
    content: Cell;
    mintable: Bool;
    max_supply: Int as coins;
    init(owner: Address, content: Cell, max_supply: Int, tokenLauncher: Address){
        self.tokenLauncher = tokenLauncher;
        self.total_supply = 0;
        self.owner = owner;
        self.mintable = true;
        self.content = content;
        self.max_supply = max_supply;
    }

    receive(msg: MintAll){
        self.requireOwner();
        require(self.mintable, "Not mintable");
        self.mint(msg.receiver, self.max_supply, self.tokenLauncher); // (to, amount, response_destination)
        self.mintable = false;
        self.owner = address("0:0000000000000000000000000000000000000000000000000000000000000000"); // set the owner as the zero address
    }
}
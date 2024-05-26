import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./token";

contract Manager with Deployable, Ownable {
    const minValueForTokenLaunch: Int = ton("0.3");
    tokenLaunchFee: Int as coins;
    owner: Address;
    init(owner: Address, tokenLaunchFee: Int){
        self.owner = owner;
        self.tokenLaunchFee = tokenLaunchFee;
    }

    receive(msg: ChangeOwnerMsg){
        self.requireOwner();
        self.owner = msg.new_owner;
        self.reply(NewOwnerEvent{new_owner: msg.new_owner}.toCell());
    }

    receive(msg: NewToken){
        let ctx: Context = context();
        //dump(ctx.value);
        require((context().value - self.tokenLaunchFee) >= self.minValueForTokenLaunch, "Not enough TON sent.");
        // Deploy the token
        let token: StateInit = initOf Token(myAddress(), msg.content, msg.max_supply, msg.tokenLauncher);
        //dump(contractAddress(token));
        send(SendParameters{
                to: contractAddress(token),
                body: MintAll{receiver: self.owner}.toCell(),
                value: (self.minValueForTokenLaunch - ton("0.05")), // sending minValueForTokenLaunch to the owner requires gas, so we're deducing 0.05 TON to consider this effect
                mode: SendIgnoreErrors,
                code: token.code,
                data: token.data
            }
        );
        send(SendParameters{
                to: self.owner,
                value: self.tokenLaunchFee,
                mode: SendIgnoreErrors,
                body: NewTokenLaunched{
                    tokenAddress: contractAddress(token),
                    launchedBy: sender(),
                    content: msg.content
                }.toCell()
            }
        );
        // dump(ctx.value);
        // return the remaining ton to sender
        send(SendParameters{
                to: ctx.sender,
                body: "Token Launched".asComment(),
                value: 0,
                mode: (SendRemainingValue + SendIgnoreErrors)
            }
        );
    }

    get fun balance(): Int {
        return myBalance();
    }

    get fun launchFee(): Int {
        return self.tokenLaunchFee;
    }

    receive("Withdraw"){
        self.requireOwner();
        if (myBalance() > ton("0.2")) {}
        send(SendParameters{to: self.owner, value: (myBalance() - ton("0.2"))});
    }
}
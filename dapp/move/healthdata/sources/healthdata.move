module healthdata::healthdata {
    
    /// Represents an illness block with an associated user ID, doctor ID, and encrypted data.
    public struct IllnessBlock has key, store {
        id: UID,
        user_id: address,
        encrypted_data: vector<u8>
    }

    /// Add an illness block to a user's IllnessBlockCollection.
    public fun add_illness_block(
        data: vector<u8>,
        ctx: &mut TxContext
    ) {
        
        let new_block = IllnessBlock {
            id: object::new(ctx),
            user_id: ctx.sender(),
            encrypted_data: data
        };

        transfer::public_transfer(new_block,ctx.sender());
    }
}
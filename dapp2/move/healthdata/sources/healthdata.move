module healthdata::healthdata {
    
    /// Represents an illness block with an associated user ID, doctor ID, and encrypted data.
    public struct IllnessBlock has key, store {
        id: UID,
        user_id: address,
        doctor_id: address,
        encrypted_data: vector<u8>
    }

    /// Represents a collection of illness blocks for a user.
    public struct IllnessBlockCollection has key {
        id: UID,
        illness_blocks: vector<IllnessBlock>
    }

    /// Create a new empty IllnessBlockCollection for the caller.
    public fun create_collection(ctx: &mut TxContext) {
        let collection = IllnessBlockCollection {
            id: object::new(ctx),
            illness_blocks: vector::empty<IllnessBlock>()
        };
        transfer::share_object(collection);
    }

    /// Add an illness block to a user's IllnessBlockCollection.
    public fun add_illness_block(
        collection: &mut IllnessBlockCollection,
        user_id: address,
        encrypted_data: vector<u8>,
        ctx: &mut TxContext
    ) {
        // assert!(collection.owner == ctx.sender(), 0); // Only the owner can add illness blocks.
        
        let new_block = IllnessBlock {
            id: object::new(ctx),
            user_id: user_id,
            doctor_id: ctx.sender(),
            encrypted_data: encrypted_data
        };
        
        vector::push_back(&mut collection.illness_blocks, new_block);
    }
}

import React, { useState } from 'react'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
function CreateTransaction() {
    const [address, setAddress] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
        setAddress(event.target.value);
    }
    
    function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
        setAmount(Number(event.target.value));
    }

    function createTransaction() {
        // implementation here
    }
    
  return (
    <div>
         <label>
        Destination Address
        </label>
        <input
              className="form-control mb-3"
              value={address}
              onChange={handleAddressChange}
            />

         <label>
        Destination Amount
        </label>
        <input
              type="number"
              className="form-control mb-3"
              value={amount}
              onChange={handleAmountChange}
            />
            <button className="btn btn-primary my-2" onClick={createTransaction}>
              Create Transaction
            </button>
            
    </div>
  )
}

export default CreateTransaction
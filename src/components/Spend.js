import React, { useState } from 'react';


const Spend = ({ instance }) => {
  
  const [spendTo, setSpendTo] = useState('');
  const [spendAmount, setSpendAmount] = useState('');
  const [spendPayload, setSpendPayload] = useState('');
  const [spendPromise, setSpendPromise] = useState(null);

  const handleSpendClick = async () => {
    console.log(instance);

    try {
        console.log(spendAmount,spendTo)
      const result = await instance.spend(spendAmount, spendTo);
      console.log(result);
    //   setSpendPromise(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="group">
      <div>
        <div>Recipient address</div>
        <div>
          <input
            value={spendTo}
            onChange={(e) => setSpendTo(e.target.value)}
            placeholder="ak_..."
          />
        </div>
      </div>
      <div>
        <div>Coins amount</div>
        <div>
          <input
            value={spendAmount}
            onChange={(e) => setSpendAmount(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div>Payload</div>
        <div>
          <input
            value={spendPayload}
            onChange={(e) => setSpendPayload(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleSpendClick}>
        Spend
      </button>
      {spendPromise && (
        <div>
          <div>Spend result</div>
          <p>{spendPromise}</p>
          {/* Assuming Value component displays the result properly */}
          {/* <Value value={spendPromise} /> */}
        </div>
      )}
    </div>
  );
};

export default Spend;

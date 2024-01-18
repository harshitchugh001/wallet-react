import React, { useState, useEffect } from 'react';
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';
import useAeternitySDK from '../hooks/useAeternitySDK';
import Spends from './Spend';

const Connect = () => {
    const { aeSdk, connectToWallet, address, networkId, getBalance } = useAeternitySDK();
    const [isLoading, setIsLoading] = useState(false);
    const [balance, setBalance] = useState(null);
    

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const balance = await aeSdk.getBalance(address, { format: AE_AMOUNT_FORMATS.AE });
                setBalance(balance);
            } catch (error) {
                console.error(error.message);
            }
        };

        if (address) {
            fetchBalance();
        }
    }, [address, getBalance]);

    const handleConnectClick = async () => {
        setIsLoading(true);
        try {
            await connectToWallet();
            console.log(aeSdk);
        } catch (error) {
            if (!(error instanceof Error)) throw error;
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    

    return (
        <div style={{ textAlign: 'center' }}>
            {address ? (
                <React.Fragment>
                    <p>Connected to wallet on network "{networkId}". Address: {address}</p>
                    <p>Balance: {balance}</p>
                    

                    <Spends instance={aeSdk}></Spends>
                 
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <button onClick={handleConnectClick} disabled={isLoading}>
                        {isLoading ? 'Connecting...' : 'Connect to Wallet'}
                    </button>
                    {isLoading && <p>Connecting...</p>}
                </React.Fragment>
            )}
        </div>
    );
};

export default Connect;

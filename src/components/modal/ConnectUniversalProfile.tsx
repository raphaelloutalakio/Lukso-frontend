import { useEffect, useState } from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'
import type { TokenSymbol } from '@web3-onboard/common'
import { GradientButton } from 'components/buttons'

interface Account {
    address: string,
    balance: Record<TokenSymbol, string> | null,
    ens: { name: string | undefined, avatar: string | undefined }
}

interface ConnectWalletProps {
    wallet: string;
    onCloseClick: () => void;
}

const ConnectWallet = () => {
    const [{ wallet: onboardWallet, connecting }, connect, disconnect] = useConnectWallet()
    const [_ethersProvider, setProvider] = useState<ethers.BrowserProvider | null>()
    const [account, setAccount] = useState<Account | null>(null)

    useEffect(() => {
        if (onboardWallet?.provider) {
            const { name, avatar } = onboardWallet?.accounts[0].ens ?? {}
            setAccount({
                address: onboardWallet.accounts[0].address,
                balance: onboardWallet.accounts[0].balance,
                ens: { name, avatar: avatar?.url }
            })
        }
    }, [onboardWallet])

    useEffect(() => {
        if (onboardWallet?.provider) {
            setProvider(new ethers.BrowserProvider(onboardWallet.provider, 'any'))
        }
    }, [onboardWallet])

    if (onboardWallet?.provider && account) {
        return (
            <div>
                {/* <button className="btn" onClick={() => { disconnect({ label: wallet }) }}>
                    Disconnect
                </button> */}

                <GradientButton
                    title="Disconnect Profile"
                    width={270}
                    height={63}
                    icon="Wallet"
                    onClick={() => { disconnect({ label: wallet }) }}
                />
            </div>
        )
    }

    return (
        <div>
            <GradientButton
                title="CONNECT PROFILE"
                width={270}
                height={63}
                icon="Wallet"
                onClick={() => connect()}
            />
            {/* <button
                disabled={connecting}
                onClick={() => connect()}>
                Connect Profile
            </button> */}
        </div>
    )
};

export default ConnectWallet;

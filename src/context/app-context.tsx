// 'use client';

// import {
//   useState,
//   useEffect,
//   useContext,
//   createContext,
//   useCallback,
// } from 'react';
// import Web3Modal from 'web3modal';
// import { ethers } from 'ethers';
// // import  from "next/navigation"
// import { create as ifpsHttpClient } from 'ipfs-http-client';

// // INTERNAL IMPORT
// import { NFTMarketplaceABI, NFTMarketplaceAddress } from './constants';
// import { AccountResType } from '@/schemaValidations/account.schema';
// import { clientSessionToken } from '@/lib/http';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import routes from '@/routes';
// ('');

// //--- FETCHING SMART CONTRACT
// const fetchContract = (
//   signerOrProvider: ethers.Signer | ethers.providers.Provider | undefined
// ) =>
//   new ethers.Contract(
//     NFTMarketplaceAddress,
//     NFTMarketplaceABI,
//     signerOrProvider
//   );

// //-- CONNECTING WITH SMART CONTRACT
// const connectingWithSmartContract = async () => {
//   try {
//     const web3Modal = new Web3Modal();
//     const connection = await web3Modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);
//     const signer = provider.getSigner();
//     const contract = fetchContract(signer);
//     return contract;
//   } catch (error) {
//     console.log('Something went wrong while connecting with smart contract');
//   }
// };

// type User = AccountResType['data'];

// export const AppContext = createContext<{
//   isConnected: Boolean;
//   isAuthenticated: boolean;
//   user: User | null;
//   walletAddress: any;
//   checkContect: () => void;
//   setUser: (user: User | null) => void;
//   connectWallet: () => void;
//   uploadToPinata: (file: File) => void;
//   createNft: (
//     name: string,
//     price: number,
//     image: any,
//     description: string
//   ) => void;
//   fetchNFTs: () => void;
//   fetchMyNFTsOrListedNFTs: (type: string) => void;
//   buyNFT: (nft: any) => void;
// }>({
//   isConnected: false,
//   isAuthenticated: false,
//   user: null,
//   walletAddress: '',
//   checkContect: () => {},
//   setUser: () => {},
//   connectWallet: () => {},
//   uploadToPinata: () => {},
//   createNft: () => {},
//   fetchNFTs: () => {},
//   fetchMyNFTsOrListedNFTs: () => {},
//   buyNFT: () => {},
// });
// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   return context;
// };
// export default function AppProvider({
//   children,
//   inititalSessionToken = '',
//   user: userProp,
// }: {
//   children: React.ReactNode;
//   inititalSessionToken?: string;
//   user: User | null;
// }) {
//   const router = useRouter();
//   //-- USESTATE
//   const [user, setUserState] = useState<User | null>(() => {
//     // if (isClient()) {
//     //   const _user = localStorage.getItem('user')
//     //   return _user ? JSON.parse(_user) : null
//     // }
//     return null;
//   });
//   const [isConnected, setIsConnected] = useState<Boolean>(false);
//   const [walletAddress, setWalletAddress] = useState<string | null>('');

//   const isAuthenticated = Boolean(user);
//   const setUser = useCallback(
//     (user: User | null) => {
//       setUserState(user);
//       localStorage.setItem('user', JSON.stringify(user));
//     },
//     [setUserState]
//   );

//   useEffect(() => {
//     const _user = localStorage.getItem('user');
//     setUserState(_user ? JSON.parse(_user) : null);
//   }, [setUserState]);

//   //-- CHECK IF WALLET IS CONNECTD
//   const checkContect = async () => {
//     try {
//       if (!window.ethereum) return console.log('Install Metamask');
//       const provider = new ethers.providers.Web3Provider(window.ethereum);

//       const { provider: ethereum } = provider;
//       const accounts = await provider.listAccounts();

//       if (accounts?.length > 0) {
//         setIsConnected(true);
//         setWalletAddress(accounts[0]);
//       } else {
//         setIsConnected(false);
//         setWalletAddress(null);
//       }
//       //@ts-ignore
//       ethereum.on('accountsChanged', async (accounts: string[]) => {
//         console.log('accounts', accounts[0]);
//         if (accounts?.length > 0) {
//           setIsConnected(true);
//           setWalletAddress(accounts[0]);
//         } else {
//           setIsConnected(false);
//           setWalletAddress(null);
//         }
//       });
//     } catch (error) {
//       console.log('Something wrong while connecting to wallet');
//     }
//   };

//   useEffect(() => {
//     checkContect();
//   }, []);

//   //-- CONNECT WALLET
//   const connectWallet = async () => {
//     try {
//       if (!window.ethereum) return console.log('Install Metamask');
//       const accounts = await window.ethereum.request({
//         method: 'eth_requestAccounts',
//       });
//       console.log('accout', accounts);

//       setWalletAddress(accounts[0]);
//       setIsConnected(true);
//       // window.location.reload();
//     } catch (error) {
//       console.log('Error while connecting to wallet');
//     }
//   };

//   //-- UPLOAD TO IPFS
//   const uploadToPinata = async (file: File) => {
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append('file', file as Blob);
//         const response = await axios({
//           method: 'post',
//           url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
//           data: formData,
//           headers: {
//             pinata_api_key: `23898613fcca0fe2cea4`,
//             pinata_secret_api_key: `10514616330b599c40ebc5babece86b62bc5058c1f543a43f04758dd215e5ca4`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
//         return ImgHash;
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   //-- CREATE NFT
//   const createNft = async (
//     name: string,
//     price: number,
//     image: any,
//     description: string
//   ) => {
//     if (!name || !description || !price || !image) {
//       return console.log('Data is missing');
//     }

//     const data = JSON.stringify({ name, description, image });
//     try {
//       const response = await axios({
//         method: 'post',
//         url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
//         data: data,
//         headers: {
//           pinata_api_key: `23898613fcca0fe2cea4`,
//           pinata_secret_api_key: `10514616330b599c40ebc5babece86b62bc5058c1f543a43f04758dd215e5ca4`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
//       await createSale(url, price.toString());
//       router.push(routes.home);
//     } catch (error) {
//       console.log('Error while creating NFT');
//     }
//   };

//   //-- CREATE SALE
//   const createSale = async (
//     url: string,
//     formInputPrice: string,
//     isReselling?: boolean,
//     id?: string
//   ) => {
//     try {
//       const price = ethers.utils.parseUnits(formInputPrice, 'ether');
//       const contract = await connectingWithSmartContract();

//       const listingPrice = await contract?.getListingPrice();
//       const transaction = !isReselling
//         ? await contract?.createToken(url, price, {
//             value: listingPrice.toString(),
//           })
//         : contract?.reSellToken(id, price, {
//             value: listingPrice.toString(),
//           });

//       await transaction.wait();
//       console.log(transaction);
//     } catch (error) {
//       console.log('Error while create sale');
//     }
//   };

//   //-- FETCH NFTS
//   const fetchNFTs = async () => {
//     try {
//       const web3Modal = new Web3Modal();
//       const connection = await web3Modal.connect();
//       const provider = new ethers.providers.Web3Provider(connection);
//       const contract = fetchContract(provider);

//       const data = await contract.fetchMarketItems();
//       const items = await Promise.all(
//         data.map(
//           //@ts-ignore
//           async ({ tokenId, seller, owner, price: unformattedPrice }) => {
//             const tokenURI = await contract.tokenURI(tokenId);
//             const {
//               data: { name, description, image },
//             } = await axios.get(tokenURI);

//             const price = ethers.utils.formatUnits(
//               unformattedPrice.toString(),
//               'ether'
//             );

//             return {
//               price,
//               tokenId: tokenId.toNumber(),
//               seller,
//               owner,
//               image,
//               name,
//               description,
//               tokenURI,
//             };
//           }
//         )
//       );
//       return items;
//     } catch (error) {
//       console.log('Error while fetching NFTS');
//     }
//   };

//   useEffect(() => {
//     fetchNFTs();
//   }),
//     [];

//   //-- FETCHING MY NFT OR LISTED NFTs
//   const fetchMyNFTsOrListedNFTs = async (type: string) => {
//     try {
//       const contract = await connectingWithSmartContract();

//       const data =
//         type === 'fetchItemsListed'
//           ? await contract?.fetchItemsListed()
//           : await contract?.fetchMyNFTs();

//       const items = await Promise.all(
//         data.map(
//           //@ts-ignore
//           async ({ tokenId, seller, owner, price: unformattedPrice }) => {
//             const tokenURI = await contract?.tokenURI(tokenId);
//             const {
//               data: { image, name, description },
//             } = await axios.get(tokenURI);
//             console.log('tokenURI', tokenURI);

//             const price = ethers.utils.formatUnits(
//               unformattedPrice.toString(),
//               'ether'
//             );

//             return {
//               price,
//               tokenId: tokenId.toNumber(),
//               seller,
//               owner,
//               image,
//               name,
//               description,
//               tokenURI,
//             };
//           }
//         )
//       );
//       return items;
//     } catch (error) {
//       console.log('Error while fetching listed NFTs');
//     }
//   };

//   //-- BUY NFTs
//   const buyNFT = async (nft: nft) => {
//     try {
//       const contract = await connectingWithSmartContract();
//       let price;
//       if (nft.price) {
//         price = ethers.utils.parseUnits(nft.price.toString() || '', 'ether');
//       }

//       const transaction = await contract?.createMarketSale(nft.tokenId, {
//         value: price,
//       });
//       await transaction.wait();
//     } catch (error) {
//       console.log('Error while buying NFT');
//     }
//   };

//   useState(() => {
//     if (typeof window !== 'undefined') {
//       clientSessionToken.value = inititalSessionToken;
//     }
//   });

//   return (
//     <AppContext.Provider
//       value={{
//         isAuthenticated,
//         isConnected,
//         walletAddress,
//         user,
//         checkContect,
//         setUser,
//         buyNFT,
//         connectWallet,
//         createNft,
//         fetchMyNFTsOrListedNFTs,
//         fetchNFTs,
//         uploadToPinata,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// }

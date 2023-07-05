import { TextUtils } from "../utils/TextUtils";

export interface ProductCollection {
    title: string,
    slug: string,
    image: string,
    description: string,
    products?: Product[]
}

export interface Product {
    title: string,
    image: string,
    description: string,
}

export const SAMPLE_EVENTS : ProductCollection[] = [
    {
      title: 'Afropolitan Citizen 0',
      image: 'https://i.seadn.io/gcs/files/c4c0b155360e7fd91a67dea1cfebeaf9.png?auto=format&dpr=1&w=1000',
      description: 'Afropolitan NFT Citizen 0: https://opensea.io/assets/ethereum/0xe652f7ef26d4ed34de2d83d4eebf291bd60ed2af/1',
      address: '0x01431e11c0dea3a643a5ad73a605aa54ca4c085e',
      chainId: '5',
      tokenId: '1'
    },
  ].map(value => ({...value, slug: TextUtils.slugify(value.title)}));
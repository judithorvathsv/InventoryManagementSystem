import { ReactElement, createContext, useEffect, useState } from "react";
import { PurchaseProps } from "../types";
import { fetchPurchases } from "../utils/fetchPurchases";

interface IPurchaseContex{
    purchases:PurchaseProps[];
    setPurchases: React.Dispatch<React.SetStateAction<PurchaseProps[]>>;  
    errorMessage:string;
    setShouldFetchData: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IPurchaseContextProvider{
    children:ReactElement;
}

export const PurchaseContext = createContext({} as IPurchaseContex);

export function PurchaseContextProvider({children}: IPurchaseContextProvider):ReactElement{
    
    const [purchases, setPurchases] = useState<PurchaseProps[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [shouldFetchData, setShouldFetchData] = useState(false);

    const loadPurchases = async () => {
        const { result, errorMessage } = await fetchPurchases();
        if (errorMessage) {
            setErrorMessage(errorMessage);
        } else {
            setErrorMessage("");
            setPurchases(result || []);
        }
    };

    useEffect(() => {
        loadPurchases();
    }, [shouldFetchData]);
 
console.log('purchases from the context ', purchases);

    const values: IPurchaseContex = {
        purchases,
        setPurchases,
        errorMessage,
        setShouldFetchData
    };

    return <PurchaseContext.Provider value = {values}>{children}</PurchaseContext.Provider>
}
import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";

export const CatoriesContext = createContext({
    categoriesMap: {},
    setCategoriesMap: () => null,
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap, setCategoriesMap };

    useEffect(() => {
        const getData = async () => {
            setCategoriesMap(await getCategoriesAndDocuments() || {})
        }
        getData();
    },[])
    return <CatoriesContext.Provider value={value}>{children}</CatoriesContext.Provider>
}
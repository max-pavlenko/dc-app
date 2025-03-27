import {useEffect} from "react";
import {useActions} from "@/store/store";

export function useLoginWithToken() {
    const {login} = useActions();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token) return;

    }, [])
}

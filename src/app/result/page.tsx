"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, removeToken } from "../GlobalRedux/userReducer";
import { Result } from "../_ui/components/Result";
import { getScore } from "../../../services/apiHandler";
import { RootState } from "../GlobalRedux/store";

export default function ResultComponent() {

    const router = useRouter();
    const dispatch = useDispatch();
    const userToken = useSelector((state: RootState) => state.user.token);
    const [result, setResult] = useState({});

    useEffect(() => {
        getScoreData();
    }, []);

    const getScoreData = async () => {
        if(!userToken) {
            router.push('/');
            return null;
        } else {
            const result: any = await getScore(userToken);
            setResult(result.data);
        }
    }

    const navigate = async () => {
        dispatch(removeToken());
        router.push('/');
    }

    return (
        <main className="h-viewport flex flex-col w-full overflow-hidden">
            <Result navigate={navigate} result={result} />
        </main>
    )
}
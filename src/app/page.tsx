"use client"

import { useRouter } from "next/navigation";
import { Intro } from "./_ui/components/Intro";
import { useEffect, useState } from "react";
import { RootState } from "./GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import { setToken, removeToken } from "./GlobalRedux/userReducer";
import { getClient } from "../../services/apiHandler";

export default function HomeComponent() {

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(removeToken());
    }, []);

    const navigate = async () => {
        router.push('/quiz');
    }

    return (
        <main className="h-viewport flex flex-col w-full overflow-hidden">
            <Intro
              onGetStartedClick={navigate}
            />
        </main>
    )
}
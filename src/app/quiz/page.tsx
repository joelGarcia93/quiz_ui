'use client';

import { useDispatch, useSelector } from "react-redux";
import { Quiz } from "../_ui/components/Quiz";
import { RootState } from "../GlobalRedux/store";
import { useEffect, useState } from "react";
import { getClient, getQuestions } from "../../../services/apiHandler";
import { setToken } from "../GlobalRedux/userReducer";

export default function QuizComponent() {

    const dispatch = useDispatch();
    const userToken = useSelector((state: RootState) => state.user.token);
    const [isLoading, setIsLoading] = useState(false);
    const [questionId, setQuestionId] = useState(0);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        initializeQuiz()
    }, []);

    const initializeQuiz = async () => {
        setIsLoading(true);
        const result: any = await getClient(userToken);
        const response: any = await getQuestions();
        if(response.success) {
            setQuestions(response.data);
        }
        if(result.success && result.current_question) {
            setQuestionId(result.current_question);
        } 
        if(!userToken) {
            dispatch(setToken(result.id));
        }
        setIsLoading(false);
    }

    return (
        <main className="h-viewport flex flex-col w-full overflow-hidden">
            {
                isLoading ? (
                    <div
                        className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                    </div>
                ) : <>
                    <Quiz questionId={questionId} questions={questions} setQuestionId={setQuestionId} userToken={userToken} />
                </>
            }
        </main>
    )
}
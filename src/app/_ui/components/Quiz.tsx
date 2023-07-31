"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { quizQuestions } from "@/ui/content/content";
import { Button } from "@/ui/components/Button";
import { OptionList } from "./OptionList";
import { Result } from "./Result";
import { updateAnswers } from "../../../../services/apiHandler";
import { useRouter } from "next/navigation";

const TIME_LIMIT = 60; // 1 minute per question

export const Quiz = ({questionId, questions, setQuestionId, userToken}: any) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();
  
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (quizFinished) return;
  }, [quizFinished]);

  const handleNextQuestion = async () => {
    // Reset selected answer
    setSelectedAnswer(0);

    // Check if quiz finished
    
    // Set next question
    setIsLoading(true);
    await updateAnswers({client_id: userToken, answer_id: selectedAnswer ? selectedAnswer : null});
    setIsLoading(false);
    
    if (questionId + 1 >= questions.length) {
      setQuizFinished(true);
      return;
    }
    
    setQuestionId((prev: any) => prev + 1);
  };

  const handleSelectAnswer = (data: any) => {
    setSelectedAnswer(data);
  };

  const { name, answers, id } = questions.length ? questions[questionId] : {name: "", answers: [], id: 0};
  const numberOfQuestions = questions.length;

  if (quizFinished) {
    router.push('/result');
  }

  return (
    <motion.div
      key={"countdown"}
      variants={{
        initial: {
          background: "#406E8E",
          clipPath: "circle(0% at 50% 50%)",
        },
        animate: {
          background: "#ffffff",
          clipPath: "circle(100% at 50% 50%)",
        },
      }}
      className="w-full h-full flex justify-center p-5"
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col text-black font-bold text-[32px] text-center w-full">
        <h1 className="font-bold text-base text-brand-cerulean-blue w-full">
          <span>QuizApp</span>
        </h1>
        <div className="mt-6 rounded-2xl border border-brand-light-gray px-7 py-4 w-full mb-1">
          <h3 className="text-black font-medium text-sm">
            Question {questionId + 1} / {numberOfQuestions}
          </h3>

          <h4 className="text-brand-midnight question font-medium text-base mt-[34px]">
            {name}
          </h4>
        </div>

        <OptionList
          activeQuestion={questions[questionId]}
          options={answers}
          questionId={id}
          selectedAnswerIndex={selectedAnswer}
          onAnswerSelected={handleSelectAnswer}
        />

        <div className="mt-auto w-full z-10">
          <Button
            className="next"
            block
            size="small"
            disabled={isLoading}
            onClick={handleNextQuestion}
          >
            {
              isLoading ? (
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div>
              ) : <>Next</>
            }
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

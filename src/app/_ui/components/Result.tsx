"use client";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { Button } from "@/app/_ui/components/Button";

import confettiAnimation from "@/ui/assets/animations/confetti.json";


export const Result = ({navigate, result}: any) => {
  // const { correctAnswers } = results;

  return (
    <motion.div
      key={"result"}
      variants={{
        initial: {
          background: "#406E8E",
          clipPath: "circle(0% at 50% 50%)",
        },
        animate: {
          background: "#406E8E",
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
        <h1 className="font-bold text-base text-white">QuizApp</h1>

        {/* Result Box */}
        <div className="mt-6 flex-1 bg-white border border-brand-light-gray rounded-2xl flex flex-col items-center py-7 px-2 ">
          <Lottie
            animationData={confettiAnimation}
            loop={false}
            autoplay={true}
            style={{ width: "170px", height: "170px" }}
          />
          <h3 className="text-brand-midnight text-[32px] font-medium leading-9 mt-4">
            Congratulations!
          </h3>
          <p className="text-brand-midnight text-xl font-normal mt-2">
            You scored
          </p>
          <span className="text-brand-midnight score font-medium text-[40px]">
            {`${result?.result ?? 0}/${result?.questions_count ?? 0}`}
          </span>
          <p className="text-brand-midnight text-sm font-normal mt-1">
            correct answers
          </p>

          
        </div>

        {/* Retry Button */}
        <div className="mt-auto">
          <Button
            intent={"secondary"}
            size="small"
            block
            className="mt-6 restart"
            onClick={navigate}
          >
            Restart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

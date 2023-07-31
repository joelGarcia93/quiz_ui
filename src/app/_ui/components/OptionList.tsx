import { Tick, Close } from "@/ui/icons/index";
import { useEffect } from "react";
interface OptionListProps {
  options: object[];
  selectedAnswerIndex: number;
  onAnswerSelected: (answerIndex: number) => void;
  activeQuestion: any;
  questionId: number;
}

const correctAnswerBadge = (
  <div className="bg-brand-paris-green text-white px-3 py-2 flex items-center justify-center space-x-2 rounded-[53px]">
    <Tick />
    <p className="text-xs font-jakarta font-medium">Correct answer</p>
  </div>
);

const wrongAnswerBadge = (
  <div className="bg-brand-bittersweet text-white px-3 py-2 flex items-center justify-center space-x-2 rounded-[53px]">
    <Close />
    <p className="text-xs font-jakarta font-medium">Your answer</p>
  </div>
);

export const OptionList = ({
  options,
  selectedAnswerIndex,
  onAnswerSelected,
}: OptionListProps) => {

  return (
    <div className="flex flex-col items-start space-y-1 options">
      {options.map((option: any, idx) => (
        <div
          key={idx}
          className={`relative font-jakarta flex items-center space-x-2 rounded-xl border px-6 py-4 w-full cursor-pointer select-none ${
            option.id === selectedAnswerIndex
              ? "border-brand-cerulean-blue"
              : "border-brand-light-gray"
          }`}
          onClick={() => {
            onAnswerSelected(option.id);
          }}
        >
          <div
            className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center ${
              option.id === selectedAnswerIndex
                ? "bg-brand-cerulean-blue"
                : "bg-brand-white-smoke-100"
            }`}
          >
            <div
              className={`w-[14px] h-[14px] rounded-full bg-white ${
                option.id === selectedAnswerIndex
                  ? "bg-white"
                  : "bg-brand-white-smoke-100"
              }
          `}
            />
          </div>
          <p className="text-brand-midnight font-normal text-base">{option?.name}</p>
          {/* {renderSelectedOptionBadge(idx)} */}
          {/* {renderCorrectBadge(idx)} */}
        </div>
      ))}
    </div>
  );
};

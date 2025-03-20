import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CanvasContainerSizeType,
  FilesType,
  StepsType,
  StepType,
} from "../Context";
import { useAppDispatch } from "@/store/hooks";
import { toggle_WannaCloseCreateModal_Modal } from "@/store/slices/modals";

export const useStep = (
  setBaseCanvasContainerWidth: Dispatch<SetStateAction<number>>,
  canvasContainerSize: CanvasContainerSizeType,
  files: FilesType
) => {
  const [step, setStep] = useState<StepType>({ action: "next", step: "new" });
  const steps: StepsType[] = ["new", "crop", "edit", "post"];
  const dispatch = useAppDispatch();

  const goPrevStep = () => {
    const prevStepIndex = steps.indexOf(step.step) - 1;

    if (prevStepIndex < 1) {
      dispatch(toggle_WannaCloseCreateModal_Modal());
      return;
    }

    setStep({ action: "previous", step: steps[prevStepIndex] });
  };

  const goNextStep = () => {
    const nextStepIndex = steps.indexOf(step.step) + 1;

    if (nextStepIndex === steps.length) {
      return;
    }

    if (step.step === "crop") {
      setBaseCanvasContainerWidth(canvasContainerSize.width);
    }

    setStep({ action: "next", step: steps[nextStepIndex] });
  };

  useEffect(() => {
    if (files.files && files.files.length > 0) {
      setStep({ action: "previous", step: "crop" });
    }
  }, [files]);

  return { step, setStep, goPrevStep, goNextStep };
};

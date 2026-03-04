import React from "react";
import Quiz from "./Quiz";
import useTracker from "./useTracker";

const QuizWrapper = ({ chapterData, onFinish, onBackToLesson }) => {
  const metrics = useTracker(chapterData.id);

  return <Quiz questions={chapterData.test} onFinish={onFinish} onBackToLesson={onBackToLesson} trackingMetrics={metrics} />;
};

export default QuizWrapper;
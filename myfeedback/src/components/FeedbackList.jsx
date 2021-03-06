import React, { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import FeedbackItem from "./FeedbackItem";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "./shared/Spinner";

const FeedbackList = () => {
  const { feedback, isLoading } = useContext(FeedbackContext);
  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback Available</p>;
  }
  /* return (
    <div className="feedback-list">
      {feedback.map((item) => {
        item.id = uuidv4();
        return (
          <FeedbackItem
            rating={item.rating}
            text={item.text}
            id={item.id}
            key={item.id}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  ); */

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem
              rating={item.rating}
              text={item.text}
              id={item.id}
              key={item.id}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
export default FeedbackList;

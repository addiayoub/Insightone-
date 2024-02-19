import React, { memo } from "react";

const Commentaires = ({ data }) => {
  return (
    <div
      className="my-3 p-4 rounded-md"
      style={{ border: "1px solid var(--primary-color)" }}
    >
      <h2 className="mb-3 underline decoration-primary underline-offset-4">
        Commentaires
      </h2>
      {Object.keys(data).map((commentTitle, index) => {
        return (
          <div key={index} className="my-2">
            <span className="my-2 font-bold">{commentTitle}</span>
            {data[commentTitle].map((commentObj, index) => {
              return (
                <p key={`${index}-${commentObj.num}`} className="leading-6">
                  {commentObj.comment}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default memo(Commentaires);

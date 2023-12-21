import React from "react";

function Commentaire({ data }) {
  console.log("commentaire", data);
  return (
    <div className="">
      <h3>Commentaire du marché</h3>
      <div
        className={`w-full leading-6 max-h-[345px] overflow-auto border border-solid border-[var(--primary-color)] p-4 rounded-lg my-2.5`}
      >
        {data.map((item, index) => (
          <React.Fragment key={item.num_comment}>
            {index > 0 && (
              <>
                <br />
                <br />
              </>
            )}{" "}
            {item.commentaire}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Commentaire;

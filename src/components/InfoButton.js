// @flow
import "../style/InfoButton.css";
import React from "react";

type InfoButtonProps = {
  handler: (any) => void,
};

export default function InfoButton({
  handler,
}: InfoButtonProps): React$MixedElement {
  return (
    <div className="InfoButton" onClick={handler}>
      ?
    </div>
  );
}

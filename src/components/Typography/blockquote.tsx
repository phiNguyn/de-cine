import { ReactNode } from "react";

export function Blockquote({children} : {children? : ReactNode}) {
    return (
      <blockquote className="mt-6  italic">
      {children}
      </blockquote>
    )
  }
  
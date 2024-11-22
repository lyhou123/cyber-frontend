'use client'
import { title } from "@/components/primitives";
import { useEffect } from "react";

export default function DocsPage() {


  useEffect(() => {
    fetch('http://localhost:8080/api/v1/project/overview?projectName=nextjs')
      .then(response => response.json())
      .then(data => console.log(data[0].component.measures.
        find((measure: { metric: string; }) => measure.metric === 'maintainability_issues')?.value)
      );
  }, []);


  return (
    <div>
      <h1 className={title()}>Docs</h1>
    </div>
  );
}

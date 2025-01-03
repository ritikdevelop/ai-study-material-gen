import React, { useEffect, useState } from "react";
import MaterialCardItem from "./MaterialCardItem";
import axios from "axios";

function StudyMaterialSection({ courseId }) {
  const [studyTypeContent, setStudyTypeContent] = useState();

  const MaterialList = [
    {
      name: "Notes/Chapters",
      desc: "Read notes for each chapter",
      icon: "/assets/notes.png",
      path: "/notes",
      type: "notes",
    },
    {
      name: "Flashcard",
      desc: "Flashcard help to remember the content",
      icon: "/assets/flashcard.png",
      path: "/flashcards",
      type: "flashcard",
    },
    {
      name: "Quiz",
      desc: "Quiz help to test your knowledge",
      icon: "/assets/quiz.png",
      path: "/quiz",
      type: "quiz",
    },
    {
      name: "Question/Answer",
      desc: "Question/Answer help to clarify your doubts",
      icon: "/assets/qa.png",
      path: "/qa",
      type: "qa",
    },
  ];

  useEffect(() => {
    GetStudyMaterial();
  }, []);

  const GetStudyMaterial = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "ALL",
    });
    console.log(result?.data);
    setStudyTypeContent(result.data);
  };

  return (
    <div className="mt-5">
      <h2 className="font-medium text-xl">Study Material</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-3 w-full">
        {MaterialList.map((item, index) => (
          <MaterialCardItem item={item} key={index}
           studyTypeContent={studyTypeContent}/>
        ))}
      </div>
    </div>
  );
}

export default StudyMaterialSection;

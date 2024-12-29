import React, { useState } from "react";
import Image from "next/image";

function SelectChoice() {
  const Options = [
    {
      name: "Exam",
      icon: "/assets/exam_1.png",
    },
    {
      name: "Job Interview",
      icon: "/assets/job.png",
    },
    {
      name: "Practice",
      icon: "/assets/practice.png",
    },
    {
      name: "Coding Preparation",
      icon: "/assets/code.png",
    },
    {
      name: "Other",
      icon: "/assets/knowledge.png",
    },
  ];

  const [selectedOption, setSelectedOption] = useState();
  return (
    <div>
      <h2 className="text-center mb-2 text-lg">
        For Which You want to create your personal study material?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
        {Options.map((option, index) => (
          <div
            key={index}
            className={`p-4 flex flex-col items-center justify-center border rounded-xl hover:border-primary cursor-pointer ${option?.name == selectedOption && "border-primary"}`}
            onClick={() => setSelectedOption(option.name)}
          >
            <Image src={option.icon} alt={option.name} width={50} height={50} />
            <h2 className="text-sm mt-2">{Options.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectChoice;

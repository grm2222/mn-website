"use client";

import { Render } from "@measured/puck";
import { config } from "../puck.config";
import { useEffect, useState } from "react";

const initialData = {
  content: [
    {
      type: "Hero",
      props: {
        id: "hero-1",
        title: "Welcome to My Website",
        subtitle: "Built with Puck, Next.js, and Tailwind CSS"
      }
    },
    {
      type: "Features",
      props: {
        id: "features-1",
        features: [
          {
            title: "Modern Stack",
            description: "Built with the latest web technologies",
            icon: "⚡"
          },
          {
            title: "Visual Editor",
            description: "Edit your site with an intuitive interface",
            icon: "🎨"
          },
          {
            title: "Responsive Design",
            description: "Looks great on all devices",
            icon: "📱"
          }
        ]
      }
    }
  ],
  root: { props: { title: "My Website" } }
};

export default function Home() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Load data from localStorage if available
    const savedData = localStorage.getItem("puck-data");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div>
      <Render config={config} data={data} />
    </div>
  );
} 
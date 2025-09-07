import React, { useRef, useState, useEffect } from "react";

interface Section {
  id: string;
  content: React.ReactNode[];
}

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `;

const sections: Section[] = [
  {
    id: "career",
    content: [
      <h2 key="h2" className="text-xl font-bold mb-2">
        Career Objective
      </h2>,
      ...Array.from({ length: 5 }, (_, i) => <p key={i}>{lorem}</p>),
      // <img key="img" height="200px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmDpXglAt0d12uwI8kvWsKKYHhLsImPb5vgg&s" alt="Sample" />,
    ],
  },
  {
    id: "work",
    content: [
      <h2 key="h2" className="text-xl font-bold mb-2">
        Work Experience
      </h2>,
      ...Array.from({ length: 20 }, (_, i) => <p key={i}>{lorem}</p>),
    ],
  },
  {
    id: "skills",
    content: [
      <h2 key="h2" className="text-xl font-bold mb-2">
        Skills
      </h2>,
      <ul key="ul" className="list-disc pl-6">
        {Array.from({ length: 50 }).map((_, i) => (
          <li key={i}>Skill #{i + 1}</li>
        ))}
      </ul>,
    ],
  },
];

const PAGE_HEIGHT = 1123;
const PAGE_WIDTH = 794;

export const CVPreview: React.FC = () => {
  const [pages, setPages] = useState<React.ReactNode[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!measureRef.current) return;

    // Flatten all elements for measurement
    const allElements: React.ReactNode[] = [];
    sections.forEach((sec) => allElements.push(...sec.content));

    // Wait for images to load
    const images = measureRef.current.querySelectorAll("img");
    let loaded = 0;

    const checkLoad = () => {
      loaded++;
      if (loaded === images.length) measurePages();
    };

    if (images.length === 0) {
      measurePages();
    } else {
      images.forEach((img) => {
        if ((img as HTMLImageElement).complete) {
          checkLoad();
        } else {
          img.addEventListener("load", checkLoad);
          img.addEventListener("error", checkLoad);
        }
      });
    }

    function measurePages() {
      const children = Array.from(
        measureRef.current!.children
      ) as HTMLDivElement[];
      const finalPages: React.ReactNode[][] = [];
      let currentPageEls: React.ReactNode[] = [];
      let currentHeight = 0;

      children.forEach((child, idx) => {
        const h = child.getBoundingClientRect().height;
        const el = allElements[idx];

        if (currentHeight + h > PAGE_HEIGHT) {
          finalPages.push(currentPageEls);
          currentPageEls = [el];
          currentHeight = h;
        } else {
          currentPageEls.push(el);
          currentHeight += h;
        }
      });

      if (currentPageEls.length) finalPages.push(currentPageEls);
      setPages(finalPages);
      setCurrentPage(0);
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {/* Hidden container for measurement */}
      <div
        ref={measureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          width: PAGE_WIDTH - 24,
        }}
      >
        {sections.map((s) =>
          s.content.map((c, i) => <div key={s.id + "-" + i}>{c}</div>)
        )}
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className="px-2 py-1 border rounded"
        >
          ⬅
        </button>

        <div
          className="relative border shadow-lg bg-white overflow-hidden"
          style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${pages.length * PAGE_WIDTH}px`,
              transform: `translateX(-${currentPage * PAGE_WIDTH}px)`,
            }}
          >
            {pages.map((page, i) => (
              <div
                key={i}
                className="p-6 flex-shrink-0"
                style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
              >
                {page}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() =>
            setCurrentPage((p) => Math.min(pages.length - 1, p + 1))
          }
          disabled={currentPage === pages.length - 1}
          className="px-2 py-1 border rounded"
        >
          ➡
        </button>
      </div>

      <div className="text-gray-600">
        Page {currentPage + 1} / {pages.length || 1}
      </div>
    </div>
  );
};

export default CVPreview;

export const highlightHeading = (text: string) => {
  const replacements = [
    { keyword: "Global Markets", className: "text-globalmarket" },
      { keyword: "Future Economies", className: "text-futureEconomies" },
    { keyword: "NexGen", className: "text-nextGen" },
  ];

  let updatedText = text;

  replacements.forEach(({ keyword, className }) => {
    const regex = new RegExp(`(${keyword})`, "gi");
    updatedText = updatedText.replace(
      regex,
      `<span class="${className}">$1</span>`
    );
  });

  return <span dangerouslySetInnerHTML={{ __html: updatedText }} />;
};
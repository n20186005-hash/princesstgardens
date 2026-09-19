type FaqItem = { question: string; answer: string };

export default function FaqSection({
  title,
  items,
}: {
  title: string;
  items: FaqItem[];
}) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
          >
            <summary className="cursor-pointer list-none font-medium text-gray-900 dark:text-gray-100">
              <span className="mr-2 inline-block transition-transform group-open:rotate-45">
                +
              </span>
              {item.question}
            </summary>
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

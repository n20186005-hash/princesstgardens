type Json = Record<string, unknown> | Record<string, unknown>[];

export default function JsonLd({ data }: { data: Json }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be injected as a raw string; content is built from trusted, static data only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

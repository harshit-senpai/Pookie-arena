import { Card } from "@/components/ui/card";

export default function JournalPage() {
  return (
    <section className="h-[calc(100vh-9rem)]">
      <h1 className="xl:text-5xl text-3xl text-center">Journal</h1>
      <main className="max-w-xl mx-auto w-full mt-20">
        <h2 className="text-center mb-5 text-xl font-semibold text-muted-foreground">
          Sample Journal Tamplates
        </h2>
        <div className="flex items-center justify-between">
          <div className="w-44 h-12 bg-blue-500 rounded-full truncate flex items-center justify-center">
            I am grateful for...
          </div>
          <div className="w-44 h-12 bg-green-500 rounded-full truncate flex items-center justify-center">
            I want to do...
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
          <div className="w-44 h-12 justify-center bg-fuchsia-500 rounded-full truncate flex items-center">
            I love doing...
          </div>
        </div>
        <h2 className="text-center mb-5 text-xl font-semibold text-muted-foreground mt-10">
          My Journals
        </h2>
        <div className="max-w-5xl mx-auto flex items-center gap-4 justify-center">
          <Card className="size-36 bg-blue-400"></Card>
          <Card className="size-36 bg-blue-400"></Card>
          <Card className="size-36 bg-blue-400"></Card>
        </div>
      </main>
    </section>
  );
}

import { Card } from "@/components/ui/card";

export default function meditationPage() {
  return (
    <section className="h-[calc(100vh-9rem)]">
      <h1 className="md:text-5xl text-3xl text-center">Meditation Zone</h1>
      <p className="text-muted-foreground text-lg text-center mt-3">
        Choose your meditation type
      </p>
      <div className="mt-20 max-w-5xl mx-auto flex items-center justify-center">
        <div className="grid lg:grid-cols-3 place-content-center gap-10">
          <div>
            <Card
              className="size-36 cursor-pointer"
              style={{
                backgroundImage: "url('/assets/meditation-1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Card>
            <p className="text-sm text-center mt-2 text-muted-foreground">
              Instrumental
            </p>
          </div>
          <div>
            <Card
              className="size-36 cursor-pointer"
              style={{
                backgroundImage: "url('/assets/meditation-2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Card>
            <p className="text-sm text-center mt-2 text-muted-foreground">
              Nature
            </p>
          </div>
          <div>
            <Card
              className="size-36 cursor-pointer p-0"
              style={{
                backgroundImage: "url('/assets/meditation-3.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Card>
            <p className="text-sm text-center mt-2 text-muted-foreground">
              Guided
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

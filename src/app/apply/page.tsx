
import { ApplicationForm } from "@/components/application-form";

export default function ApplyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 lg:p-8 page-background-shapes">
      <div className="w-full max-w-4xl">
        <ApplicationForm />
      </div>
    </main>
  );
}

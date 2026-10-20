import { BrandMark } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1A0B0B] text-[#F7EFE7] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="flex justify-center">
          <BrandMark variant="gold" size="lg" />
        </div>

        <div className="space-y-3">
          <p className="font-mono text-xs tracking-[0.25em] text-[#C49A5A] uppercase">
            Error 404 • Scene Not Found
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#F7EFE7]">
            The Frame Is Missing
          </h1>
          <p className="text-[#A89587] text-sm leading-relaxed">
            The page or reel you requested could not be located in our production reel.
            Please verify the URL or return to the main stage.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="primary">
            Return to Homepage
          </Button>
          <Button href="/admin" variant="outline">
            Admin Portal
          </Button>
        </div>
      </div>
    </div>
  );
}

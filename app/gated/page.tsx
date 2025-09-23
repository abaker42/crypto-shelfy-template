//Gated Content Page
// app/gated/page.tsx
import TokenGate from "@/components/TokenGate";

export default function GatedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <TokenGate>
        <div className="p-8 bg-gray-100 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">🎉 Welcome to the gated content!</h2>
          <p>This section is only visible if your ETH or SOL wallet is connected.</p>
        </div>
      </TokenGate>
    </main>
  );
}

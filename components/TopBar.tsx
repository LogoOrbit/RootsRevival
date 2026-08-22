const messages = [
  "Launch offer: save up to Rs 2,500 on bundle packs",
  "Free delivery on every order above Rs 3,000",
  "Cash on delivery available all over Pakistan",
  "Use code REVIVE10 for 10 percent off your first order",
  "Handmade in small batches with 16 natural herbs and oils",
];

export default function TopBar() {
  const strip = [...messages, ...messages];
  return (
    <div className="overflow-hidden bg-forest py-2.5 text-cream">
      <div className="marquee-track">
        {strip.map((message, index) => (
          <span
            key={`${message}-${index}`}
            className="flex items-center whitespace-nowrap px-6 text-[0.7rem] uppercase tracking-[0.22em]"
          >
            <span className="mr-6 text-gold-light">✦</span>
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}

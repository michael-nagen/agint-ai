export default function Concept() {
  return (
    <section id="concept" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-300">
            The idea
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            A chavruta is more than a tutor
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            In the traditional <span className="italic">chavruta</span> method,
            two partners learn together - challenging each other, asking "why",
            and explaining ideas back and forth until they genuinely click.
            Learning isn't a one-way download; it's a conversation.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Chavruta brings that experience to you. Instead of just transferring
            information, it helps you <span className="font-semibold text-white">process the knowledge you already have</span> -
            turning passive review into active understanding. It's designed to
            sit alongside your learning with the Maestro, so what you study
            actually sticks.
          </p>
        </div>

        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="space-y-4">
            <ChatBubble from="you">
              I think I understand recursion now.
            </ChatBubble>
            <ChatBubble from="chavruta">
              Great - so explain it to me. What happens if a recursive function
              never reaches its base case?
            </ChatBubble>
            <ChatBubble from="you">
              Oh... it would keep calling itself forever.
            </ChatBubble>
            <ChatBubble from="chavruta">
              Exactly. And what does that do to the call stack? Let's trace it
              together.
            </ChatBubble>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({ from, children }) {
  const isUser = from === "you";
  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isUser
            ? "max-w-[80%] rounded-2xl rounded-br-sm bg-brand-600 px-4 py-3 text-sm text-white"
            : "max-w-[80%] rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3 text-sm text-slate-100"
        }
      >
        {!isUser && (
          <span className="mb-1 block text-xs font-semibold text-brand-300">
            Chavruta
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

const ConsentModal = ({ onAccept }) => {
  const [agree, setAgree] = React.useState(false);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
      <div className="bg-white max-w-lg w-full rounded-2xl p-6 border-4 border-red-600">
        <h2 className="text-2xl font-extrabold text-red-600 text-center mb-4">
          ⚠️ STRICT WARNING
        </h2>

        <p className="text-sm text-gray-800 font-semibold mb-3 text-center">
          This live class content is confidential and protected.
        </p>

        <ul className="text-sm text-gray-700 space-y-2 mb-4">
          <li>🚫 Screen recording is strictly prohibited</li>
          <li>🚫 Screenshots are not allowed</li>
          <li>🚫 Any recording device usage is forbidden</li>
          <li>🚫 Content misuse may lead to legal action</li>
        </ul>

        <div className="bg-red-100 border border-red-400 text-red-700 text-xs p-3 rounded mb-4">
          By joining this class, you agree that violations may result in
          permanent suspension without refund.
        </div>

        <label className="flex items-start gap-2 mb-4">
          <input
            type="checkbox"
            className="mt-1"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span className="text-sm font-medium">
            I understand and agree to all the above rules and consequences
          </span>
        </label>

        <button
          disabled={!agree}
          onClick={onAccept}
          className={`w-full py-3 rounded-xl font-bold text-white ${
            agree ? "bg-red-600 hover:bg-red-700" : "bg-gray-400"
          }`}
        >
          Enter Live Class (Full Screen)
        </button>
      </div>
    </div>
  );
};
export default ConsentModal;
